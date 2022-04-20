<script setup>
import { CheckIcon, ArrowLeftIcon } from "@heroicons/vue/outline";
import { onMounted, ref, computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import OfficeLayout from "@/Layout/Office.vue";
import Button from "@/UI/Button.vue";
import Input from "@/UI/Input.vue";
import TextArea from "@/UI/TextArea.vue";
import UploadImage from "@/UI/UploadImage.vue";
import Toggle from "@/UI/Toggle.vue";
import Select from "@/UI/Select.vue";
import Toast from "@/UI/Toast.vue";
import List from "@/UI/List.vue";
import useApi from "~/composables/useApi.js";
import employerFormValidationsRules from "~/validationsRules/employerForm.js";
import useVuelidate from "@vuelidate/core";

const toggles = ref([false, false, false]);

const { axiosInstance } = useApi();

let route = useRoute();
let router = useRouter();

// page is used for edit and create users
let isEditEmployerPage = computed(() => route.name === "EditEmployer");

/* ************ Roles ************ */
let roles = ref([]);

let roleOptions = computed(() =>
  roles.value.map((role) => ({
    value: role.id,
    label: role.title,
  }))
);

/* ************ Departments ************ */
let departments = ref([]);

let departmentOptions = computed(() =>
  departments.value.map((department) => ({
    value: department.id,
    label: department.name,
  }))
);

/* ************ Fetch Departments & Roles ************ */
onMounted(async () => {
  try {
    let department_res = await axiosInstance.get("/departments");
    departments.value = department_res.data?.department || [];
  } catch (e) {
    console.error("Error request", e);
  }

  try {
    let roles_res = await axiosInstance.get("/roles");
    roles.value = roles_res.data?.roles || [];
  } catch (e) {
    console.error("Error request", e);
  }
});

/* ************ Handling the toast ************ */

const isUpdatingDataProfile = ref(false);
const isProfileUpdated = ref(true);
const responseMessage = ref("");

function setIsShowToast(value) {
  isOpenToast.value = value;
}

function showToast() {
  setIsShowToast(true);
  setTimeout(setIsShowToast, 5000, false);
}

/* ************ User form ************ */
let avatarFile = ref(null);
const isOpenToast = ref(false);

let isValideAvatarFileSize = computed(() => {
  if (!avatarFile.value) return true;
  return avatarFile.value.size < 10000000;
});

let userFields = reactive({
  // password fields will be automatically set if we're creating a user
  name: null,
  surname: null,
  middle_name: null,
  email: null,
  phone: null,
  about: null,
  born_at: null,
  office_position: null,
  role_id: null,
  department_id: null,
});

let { rules } = employerFormValidationsRules(userFields, isEditEmployerPage);

let v$ = useVuelidate(rules, userFields, { $lazy: true });

let saveUser = async () => {
  let isValideForm = await v$.value.$validate();

  isValideForm = isValideAvatarFileSize.value;

  if (!isValideForm) return;

  isUpdatingDataProfile.value = true;

  v$.value.$reset();

  let form = new FormData();

  Object.keys(userFields).forEach((key) => {
    // password is here included
    form.append(key, userFields[key] + "");
  });

  form.append("is_about_visible", toggles.value[0]);
  form.append("is_born_at_visible", toggles.value[1]);
  form.append("is_active", toggles.value[2]);

  // send data to server
  try {
    let { data } = await axiosInstance[
      isEditEmployerPage.value ? "put" : "post"
    ](
      `/users/${isEditEmployerPage.value ? route.params.id : ""}`,
      // userFields
      form
    );

    if (!data.success) throw new Error("профиль успешно обновлен");

    // update profile if user uploaded a photo
    if (avatarFile.value) {
      let avatarForm = new FormData();
      avatarForm.append("avatar", avatarFile.value);

      let avatarRes = await axiosInstance.post(
        `/users/${data.user.id}/avatar`,
        avatarForm,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (!avatarRes.data.success)
        throw new Error("Не удалось обновить аватар");
    }

    // update password if entered
    if (isEditEmployerPage.value && userFields.password) {
      let passwordForm = new FormData();

      passwordForm.append("password", userFields.password);

      let passwordRes = await axiosInstance.put(
        `/users/${data.user.id}/password`,
        passwordForm
      );

      if (!passwordRes.data.success)
        throw new Error("Не удалось обновить пароль");
    }

    // everything was updated with success
    responseMessage.value = "профиль успешно обновлен";
  } catch (e) {
    console.error("Error request", e);

    responseMessage.value = e.response
      ? e.response.data.message
      : "Не удалось обновить профиль";

    isProfileUpdated.value = false;
  } finally {
    isUpdatingDataProfile.value = false;
  }
};

const avatar = ref(
  "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
);

/* ************ Case: updating user ************ */
onMounted(async () => {
  if (!isEditEmployerPage.value) return;
  if (!route.params.id) return router.back();

  try {
    let { data } = await axiosInstance.get(`/users/${route.params.id}`);
    if (!data.success) throw Error();

    Object.keys(userFields).forEach((key) => {
      userFields[key] = data.user[key];
    });

    if (userFields.born_at) {
      let [d, m, y] = userFields.born_at.split(".");
      userFields.born_at = `${y}-${m}-${d}`;
    }

    toggles.value[0] = data.user.is_about_visible || false;
    toggles.value[1] = data.user.is_born_at_visible || false;
    toggles.value[2] = data.user.is_active || false;

    if (data.user.avatar) avatar.value = data.user.avatar;
  } catch (e) {
    console.error("Error request", e);
    router.back();
  }
});

/* ************ ********* ************ */
const log = (event) => {
  avatarFile.value = event.target.files[0];
  avatar.value = window.URL.createObjectURL(avatarFile.value);
};
</script>

<template>
  <OfficeLayout title="Создание нового сотрудника">
    <template #actions>
      <Button type="secondary" link="/employers">
        <ArrowLeftIcon class="w-5 h-5 mr-1" />
        Вернуться
      </Button>

      <Button color="green" @click="saveUser">
        <CheckIcon class="w-5 h-5 mr-1" />
        Сохранить
      </Button>
    </template>

    <div class="flex flex-col lg:flex-row">
      <UploadImage
        @selected="log"
        :image="avatar"
        label="Фото"
        class="mb-3"
        :error="
          !isValideAvatarFileSize
            ? 'Размер фото не должен превышать 10000 Кб'
            : ''
        "
      />

      <div class="flex-grow space-y-6">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 sm:col-span-4">
            <Input label="Фамилия" v-model="userFields.middle_name" />
          </div>

          <div class="col-span-12 sm:col-span-4">
            <Input
              label="Имя"
              v-model="userFields.name"
              :required="true"
              :error="v$.name.$errors[0]?.$message"
              @blured="v$.name.$touch"
            />
          </div>

          <div class="col-span-12 sm:col-span-4">
            <Input label="Отчество" v-model="userFields.surname" />
          </div>

          <div class="col-span-12 sm:col-span-6">
            <Input
              label="Почта"
              type="email"
              v-model="userFields.email"
              :required="true"
              :error="v$.email.$errors[0]?.$message"
              @blured="v$.email.$touch"
            />
          </div>

          <div class="col-span-12 sm:col-span-6">
            <Input
              label="Телефон"
              mask="+7 ### ###-##-##"
              v-model="userFields.phone"
            />
          </div>

          <div class="col-span-12 sm:col-span-6">
            <Input
              label="Новый пароль"
              type="password"
              v-model="userFields.password"
              :required="true"
              :error="v$.password.$errors[0]?.$message"
              @blured="v$.password.$touch"
            />
          </div>

          <div class="col-span-12 sm:col-span-6">
            <Input
              label="Подтвердите новый пароль"
              type="password"
              v-model="userFields.password_confirmation"
              :required="true"
              :error="v$.password_confirmation.$errors[0]?.$message"
              @blured="v$.password_confirmation.$touch"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="col-span-12 sm:col-span-6 lg:col-span-4">
        <Input label="Дата рождения" type="date" v-model="userFields.born_at" />
      </div>

      <div class="col-span-12 sm:col-span-6 lg:col-span-4">
        <Input label="Должность" v-model="userFields.office_position" />
      </div>

      <div class="col-span-12 sm:col-span-6 lg:col-span-4">
        <Select
          label="Роль"
          :options="roleOptions"
          v-model.number="userFields.role_id"
          :required="true"
          :error="v$.role_id.$errors[0]?.$message"
          @blured="v$.role_id.$touch"
        />
      </div>

      <div class="col-span-12 sm:col-span-6 lg:col-span-4">
        <Select
          label="Отделение"
          :options="departmentOptions"
          v-model.number="userFields.department_id"
          :required="true"
          :error="v$.department_id.$errors[0]?.$message"
          @blured="v$.department_id.$touch"
        />
      </div>

      <div class="col-span-12">
        <TextArea label="О сотруднике" rows="3" v-model="userFields.about" />
      </div>
    </div>

    <div class="pt-6 divide-y divide-gray-200">
      <div>
        <List
          class="mt-2"
          :items="[
            {
              title: 'О себе',
              subtitle: 'Скрыть информацию о себе для других сотрудников',
            },
            {
              title: 'День рождения',
              subtitle: 'Скрыть день рождения для других сотрудников',
            },
            {
              title: 'Виден активный статус',
              subtitle: 'скрыть активный статус от других сотрудников',
            },
          ]"
          title="Приватность"
          subtitle="Здесь вы можете настроить поведение приложения - то что хотели бы не показывать"
        >
          <template v-slot:right="{ item, index }">
            <Toggle v-model="toggles[index]" />
          </template>
        </List>
      </div>
    </div>

    <Toast :open="isOpenToast">
      <template #title> title </template>
      <template #text> Lorem ipsum dolor sit amet consectetur. </template>
    </Toast>
  </OfficeLayout>
</template>

<style scoped></style>
