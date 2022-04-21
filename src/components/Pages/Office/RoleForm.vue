<script setup>
import {
  CheckIcon,
  ClockIcon,
  PencilIcon,
  ArrowLeftIcon,
  ExclamationIcon,
  XIcon,
} from "@heroicons/vue/outline";
import { computed, onMounted, ref } from "vue";
import OfficeLayout from "@/Layout/Office.vue";
import Button from "@/UI/Button.vue";
import Wysiwyg from "@/UI/Wysiwyg.vue";
import Upload from "@/UI/Upload.vue";
import Card from "@/UI/Card.vue";
import Avatar from "@/UI/Avatar.vue";
import Checkbox from "@/UI/Checkbox.vue";
import Badge from "@/UI/Badge.vue";
import Link from "@/UI/Link.vue";
import Input from "@/UI/Input.vue";
import TextArea from "@/UI/TextArea.vue";
import UploadImage from "@/UI/UploadImage.vue";
import Toggle from "@/UI/Toggle.vue";
import List from "@/UI/List.vue";
import Select from "@/UI/Select.vue";
import Toast from "@/UI/Toast.vue";
import Spinner from "@/UI/Spinner.vue";
import useApi from "~/composables/useApi.js";

import { useRouter, useRoute } from "vue-router";

import useVuelidate from "@vuelidate/core";
import { minLength, required, helpers } from "@vuelidate/validators";

const { axiosInstance } = useApi();

const editor = "Текст задачи";

let route = useRoute();
let router = useRouter();

// page is used for edit and create users
let isEditRolePage = computed(() => route.name === "EditRole");

/* ************ Raw permissions ************ */

let rawPermissions = ref([]);
let isFetchingPermissions = ref(true);

onMounted(async () => {
  isFetchingPermissions.value = true;
  try {
    let { data } = await axiosInstance.get("/permissions");

    if (!data.success) throw new Error();

    rawPermissions.value = data.permissions;
    rawPermissions.value.sort(
      (a, b) => b.permissions?.length - a.permissions?.length
    );
  } catch (e) {
    if (e.response) {
      console.error("Error responce", e, e.response.data);
    } else if (e.request) {
      console.log("Error request", e.request);
    } else {
      console.log("Error local", e.message);
    }
  } finally {
    isFetchingPermissions.value = false;
  }
});

/* ************ Toast ************ */
import useToast from "~/composables/useToast.js";
const { isOpenToast, showToast, render } = useToast();
let wasRoleCreated = ref(false);
let responseMessage = ref("");

/* ************ Role[Title + Permissions] (create & update) ************ */
let roleTitle = ref("");
const permissions = ref({});

let rules = computed(() => ({
  roleTitle: {
    required: helpers.withMessage("Укажите Название", required),
    minLength: helpers.withMessage("не менее 5 символов", minLength(5)),
  },
}));

let v$ = useVuelidate(rules, { roleTitle }, { $lazy: true });

let saveRole = async () => {
  let isValideRoleName = await v$.value.$validate();

  if (!isValideRoleName) return;

  v$.value.$reset();

  // send data to server
  try {
    let { data } = await axiosInstance[isEditRolePage.value ? "put" : "post"](
      `/roles/${route.params.id}`,
      {
        title: roleTitle.value,
        permissions: Object.keys(permissions.value).filter(
          (key) => permissions.value[key]
        ),
      }
    );

    if (!data.success) throw new Error();

    responseMessage.value = "Роль успешно создана";
    wasRoleCreated.value = true;
  } catch (e) {
    if (e.response) {
      console.error("Error responce", e, e.response.data);
      responseMessage.value = e.response.data.message;
    } else if (e.request) {
      console.log("Error request", e.request);
      responseMessage.value = "Не удалось создать роль!";
    } else {
      console.log("Error local", e.message);
      responseMessage.value = e.message;
    }

    wasRoleCreated.value = false;
  } finally {
    showToast();
  }
};

/* ************ Bind role data in case of role edit page ************ */
onMounted(async () => {
  if (!isEditRolePage.value) return;
  if (!route.params.id) return router.back();

  try {
    let { data } = await axiosInstance.get(`/roles/${route.params.id}`);
    if (!data.success) throw Error();

    roleTitle.value = data.role.title;

    data.role.permissions.forEach((perm) => {
      permissions.value[perm.name] = true;
    });
  } catch (e) {
    console.error("Error request", e);
    router.back();
  }
});
</script>

<template>
  <OfficeLayout title="Создание новой роли">
    <template #actions>
      <Button type="secondary" link="/roles">
        <ArrowLeftIcon class="w-5 h-5 mr-1" />
        Вернуться
      </Button>

      <Button color="green" @click="saveRole">
        <CheckIcon class="w-5 h-5 mr-1" />
        Сохранить
      </Button>

      <Button color="red">
        <XIcon class="w-5 h-5 mr-1" />
        Удалить
      </Button>
    </template>

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 sm:col-span-4">
        <Input
          label="Название"
          v-model="roleTitle"
          :required="true"
          :error="v$.roleTitle.$errors[0]?.$message"
          @input="v$.roleTitle.$touch"
        />
      </div>

      <div
        v-if="isFetchingPermissions"
        class="col-span-12 sm:col-span-12 flex justify-center"
      >
        <Spinner h="4" w="4">
          <span class="text-sm text-gray-600">fetching permissions...</span>
        </Spinner>
      </div>

      <div class="col-span-12 sm:col-span-12 divide-y" v-else>
        <div v-for="(field, i) in rawPermissions" :key="i" class="my-6">
          <div class="mb-3">{{ field.title }}</div>
          <div class="grid auto-rows-max grid-cols-3 gap-2 pl-16">
            <Toggle
              v-for="(perm, i) in field.permissions"
              :key="perm.id"
              :label="perm.title"
              v-model="permissions[perm.id]"
            />
          </div>
        </div>
      </div>
    </div>

    <!--
        we could move the toast to the root and tweak
        the showToast function so we can control the toeast globally
    -->
    <Toast
      :open="isOpenToast"
      :color="wasRoleCreated ? 'green' : 'red'"
      :icon="wasRoleCreated ? CheckIcon : ExclamationIcon"
    >
      <template #text>{{ responseMessage }}</template>
      <!-- <template #title>title</template> -->
    </Toast>
  </OfficeLayout>
</template>

<style scoped></style>
