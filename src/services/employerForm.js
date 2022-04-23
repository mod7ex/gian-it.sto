import { ref, computed, reactive } from "vue";
import employerFormValidationsRules from "~/validationsRules/employerForm.js";
import useVuelidate from "@vuelidate/core";
import useApi from "~/composables/useApi.js";
import { useRoute, useRouter } from "vue-router";
import useToast from "~/composables/useToast.js";
import { CheckIcon, ExclamationIcon } from "@heroicons/vue/outline";

const defaultEmployerAvatar =
  "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";

const defaultUserFields = {
  // password fields will be automatically set if we're creating a user
  name: "",
  surname: "",
  middle_name: "",
  email: "",
  phone: "",
  about: "",
  born_at: "",
  office_position: "",
  role_id: "",
  department_id: "",
};

const defaultTogglesState = [false, false, false];

let roles = ref([]);
let departments = ref([]);

let userFields = reactive(defaultUserFields);
let avatar = ref(defaultEmployerAvatar);
let toggles = ref(defaultTogglesState);
let avatarFile = ref(null);

export default function employerForm() {
  let { showToast } = useToast();
  let { axiosInstance } = useApi();
  let route = useRoute();
  let router = useRouter();

  // page is used for edit and create users
  let isEditEmployerPage = computed(() => route.name === "EditEmployer");

  /* ************ Avatar ************ */
  let isValideAvatarFileSize = computed(() => {
    if (!avatarFile.value) return true;
    return avatarFile.value.size < 10000000;
  });

  const log = (event) => {
    avatarFile.value = event.target.files[0];
    avatar.value = window.URL.createObjectURL(avatarFile.value);
  };

  /* ************ Fetch Departments & Roles ************ */
  let departmentOptions = computed(() =>
    departments.value.map((department) => ({
      value: department.id,
      label: department.name,
    }))
  );

  let roleOptions = computed(() =>
    roles.value.map((role) => ({
      value: role.id,
      label: role.title,
    }))
  );

  let fetchDepartments = async () => {
    try {
      let department_res = await axiosInstance.get("/departments");
      departments.value = department_res.data.departments || [];
    } catch (e) {
      console.error("Error request", e);
      showToast("Не удалось получить роли", "red", ExclamationIcon);
    }
  };

  let fetchRoles = async () => {
    try {
      let roles_res = await axiosInstance.get("/roles");
      roles.value = roles_res.data.roles || [];
    } catch (e) {
      console.error("Error request", e);
      showToast("Не удалось получить отделы", "red", ExclamationIcon);
    }
  };

  /* ************ User form ************ */

  let { rules } = employerFormValidationsRules(
    userFields,
    isEditEmployerPage.value
  );

  let v$ = useVuelidate(rules, userFields, { $lazy: true });

  let saveUser = async () => {
    let isValideForm = await v$.value.$validate();

    isValideForm = isValideAvatarFileSize.value && isValideForm;

    if (!isValideForm) return;

    v$.value.$reset();

    let wasProfileUpdated = true;
    let responseMessage = null;

    let form = new FormData();

    for (let key in userFields) {
      // won't count password in case we're editing the user, password is updated siparatly (down)
      if (isEditEmployerPage.value && key.substr(0, 8) === "password") continue;
      form.append(key, userFields + "");
    }

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

      // update avatar if user uploaded a photo
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
      }

      // update password if filled (in case of update page)
      if (isEditEmployerPage.value && userFields.password) {
        let passwordForm = new FormData();

        passwordForm.append("password", userFields.password);

        let passwordRes = await axiosInstance.put(
          `/users/${data.user.id}/password`,
          passwordForm
        );
      }

      // everything was updated with success
      wasProfileUpdated = true;
      responseMessage = "профиль успешно обновлен";
    } catch (e) {
      if (e.response) {
        console.error("Error responce", e, e.response.data);

        responseMessage = e.response.data.message; // during dev
      } else if (e.request) {
        console.log("Error request", e.request);

        responseMessage = "Не удалось обновить профиль"; // 'Undefined (network?) error'
      } else {
        console.log("Error local", e.message);

        responseMessage = e.message;
      }

      wasProfileUpdated = false;
    } finally {
      let color = wasProfileUpdated ? "green" : "red";
      let icon = wasProfileUpdated ? CheckIcon : ExclamationIcon;
      showToast(responseMessage, color, icon);
    }
  };

  let fetchSubjectUser = async () => {
    try {
      let { data } = await axiosInstance.get(`/users/${route.params.id}`);
      if (!data.success) throw Error();

      for (let key in userFields) {
        if (key === "department_id") {
          userFields.department_id = data.user["department"].id;
          continue;
        }

        if (key === "role_id") {
          console.log(data.user["roles"]);
          // ===========> should be fixed later
          continue;
        }

        userFields[key] = data.user[key];
      }

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
      showToast("Не удалось получить пользователя", "red", ExclamationIcon);
    }
  };

  let resetEmployerForm = () => {
    userFields = defaultUserFields;
    avatar.value = defaultEmployerAvatar;
    toggles.value = defaultTogglesState;
    avatarFile.value = null;
  };

  let atMounted = async () => {
    /* ************ Reset ************ */
    //   userFields = defaultUserFields;
    //   avatar.value = defaultEmployerAvatar;
    //   toggles.value = defaultTogglesState;
    //   avatarFile.value = null;

    /* ************ Fetch Departments & Roles ************ */
    await fetchDepartments();
    await fetchRoles();

    /* ************ Bind user data in case of role edit page ************ */
    if (!isEditEmployerPage.value) return;
    if (!route.params.id) return router.back();

    await fetchSubjectUser();
  };

  return {
    roles,
    fetchSubjectUser,
    departments,
    departmentOptions,
    roleOptions,
    fetchDepartments,
    fetchRoles,
    isValideAvatarFileSize,
    log,
    avatarFile,
    avatar,
    userFields,
    isEditEmployerPage,
    v$,
    saveUser,
    toggles,
    atMounted,
    resetEmployerForm,
  };
}
