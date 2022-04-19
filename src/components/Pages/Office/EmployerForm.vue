<script setup>
import { CheckIcon, ArrowLeftIcon } from "@heroicons/vue/outline";
import { onMounted, ref, computed, reactive } from "vue";
import OfficeLayout from "@/Layout/Office.vue";
import Button from "@/UI/Button.vue";
import Input from "@/UI/Input.vue";
import TextArea from "@/UI/TextArea.vue";
import UploadImage from "@/UI/UploadImage.vue";
import Toggle from "@/UI/Toggle.vue";
import List from "@/UI/List.vue";
import Select from "@/UI/Select.vue";
import useApi from "~/composables/useApi.js";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
const { axiosInstance } = useApi();

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
    label: department.title,
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

/* ************ User form ************ */
let avatarFile = ref(null);

let user = reactive({
  name: null,
  surname: null,
  middle_name: null,
  email: null,
  phone: null,
  password: null,
  password_confirmation: null,
  born_at: null,
  office_position: null,
  role_id: null,
  department_id: null,
  about: null,
  is_about_visible: false,
  is_born_at_visible: false,
  is_active: false,
});

let rules = computed(() => ({
  name: { required, $lazy: true },
  email: { required, email, $lazy: true },
  password: { required, minLength: minLength(8), $lazy: true },
  password_confirmation: { sameAs: sameAs(user.password), $lazy: true },
  role_id: { required, $lazy: true },
  department_id: { required, $lazy: true },
}));

let v$ = useVuelidate(rules, user);

let saveUser = async () => {
  // validate data

  let isValideForm = await v$.value.$validate();

  if (!isValideForm) return;

  console.log(isValideForm, v$.value.$errors);
  return;

  // create form data
  let form = new FormData();

  // add data to form
  Object.keys(user).forEach((key) => {
    form.append(key, user[key] + "");
  });

  // if (avatarFile.value) {
  //   form.append("file", avatarFile.value, "avatar");
  // }

  // send data to server
  try {
    let res = await axiosInstance.post("/users", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (e) {
    console.error("Error request", e);
  }
};

const toggles = ref([false, false]);

const avatar = ref(
  "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=SjPZjUxoVh&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80"
);

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
      <UploadImage @selected="log" :image="avatar" label="Фото" class="mb-3" />

      <div class="flex-grow space-y-6">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 sm:col-span-4">
            <Input label="Фамилия" v-model="user.middle_name" />
          </div>

          <div class="col-span-12 sm:col-span-4">
            <Input label="Имя" v-model="user.name" :required="true" />
          </div>

          <div class="col-span-12 sm:col-span-4">
            <Input label="Отчество" v-model="user.surname" />
          </div>

          <div class="col-span-12 sm:col-span-6">
            <Input
              label="Почта"
              type="email"
              v-model="user.email"
              :required="true"
            />
          </div>

          <div class="col-span-12 sm:col-span-6">
            <Input
              label="Телефон"
              mask="+7 ### ###-##-##"
              v-model="user.phone"
            />
          </div>

          <div class="col-span-12 sm:col-span-6">
            <Input
              label="Новый пароль"
              type="password"
              v-model="user.password"
              :required="true"
            />
          </div>

          <div class="col-span-12 sm:col-span-6">
            <Input
              label="Подтвердите новый пароль"
              type="password"
              v-model="user.password_confirmation"
              :required="true"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="col-span-12 sm:col-span-4">
        <Input label="Дата рождения" type="date" v-model="user.born_at" />
      </div>

      <div class="col-span-12 sm:col-span-4">
        <Input label="Должность" v-model="user.office_position" />
      </div>

      <div class="col-span-12 sm:col-span-4">
        <Select
          label="Роль"
          :options="roleOptions"
          v-model.number="user.role_id"
          :required="true"
        />
      </div>

      <div class="col-span-12 sm:col-span-4">
        <Select
          label="Отделение"
          :options="departmentOptions"
          v-model.number="user.department_id"
          :required="true"
        />
      </div>

      <div class="col-span-12">
        <TextArea label="О сотруднике" rows="3" v-model="user.about" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="col-span-12 sm:col-span-4">
        <Toggle label="Is about visible" v-model="user.is_about_visible" />
      </div>

      <div class="col-span-12 sm:col-span-4">
        <Toggle
          label="Видна ли дата рождения"
          v-model="user.is_born_at_visible"
        />
      </div>

      <div class="col-span-12 sm:col-span-4">
        <Toggle label="Виден активный статус" v-model="user.is_active" />
      </div>
    </div>
  </OfficeLayout>
</template>

<style scoped></style>
