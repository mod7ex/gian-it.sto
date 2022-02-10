<script>
import {
  useRouter
} from "vue-router";
import Button from "@/UI/Button.vue";
import Input from "@/UI/Input.vue";
import Link from "@/UI/Link.vue";
import LoginLayout from "@/Layout/Login.vue";
import {
  ref
} from "@vue/reactivity";
import useAuth from "../../../composables/useAuth";
import useApi from "../../../composables/useApi"
import {
  onMounted
} from '@vue/runtime-core';

const {
  setUser,
  setToken
} = useAuth();
const {
  axiosInstance
} = useApi();

export default {
  name: "Login",
  components: {
    LoginLayout,
    Link,
    Input,
    Button,
  },
  setup() {
    const router = useRouter();
    const email = ref("admin@admin.ru");
    const password = ref("password");
    const error = ref(false);
    const errorMessage = ref("");
    const loading = ref(false);

    const login = async () => {
      error.value = false;
      loading.value = true;

      try {
        const res = await axiosInstance.post("auth/login", {
          email: email.value,
          password: password.value,
        });

        setToken(res.data.api_token);
        setUser(res.data.user);
        router.push("/dashboard");

      } catch (e) {
        error.value = true;
        errorMessage.value = e.response.data.message;
      } finally {
        loading.value = false;
      }
    };

    const checkLogin = async () => {
      const savedToken = localStorage.getItem('token')
      if (savedToken) {
        try {
          const res = await axiosInstance.get("auth/user", {
            headers: {
              "Authorization": `Bearer ${savedToken}`
            }
          });
          setToken(savedToken);
          setUser(res.data.user);

          router.push("/dashboard");
        } catch (e) {
          console.error('Error request', e.response.data)

        }

      }
    }



    onMounted(() => {
      checkLogin()
    })

    return {
      email,
      password,
      loading,
      error,
      login,
      errorMessage,
      checkLogin

    };
  },
};
</script>

<template>
  <LoginLayout title="Войдите в ваш аккаунт">
    <div class="mt-8">
      <div class="mt-6">

        <form class="space-y-6">
          <Input label="E-mail" type="email" v-model="email" />

          <div class="space-y-1">
            <Input label="Пароль" type="password" v-model="password" />
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <Link href="/forgot-password">
              Забыли пароль?
              </Link>
            </div>
          </div>

          <Button color="blue" class="w-full justify-center" @click.prevent="login">
            Войти
          </Button>
        </form>
         <div class="flex items-center justify-center">
          <div
            v-if="loading"
            class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          ></div>
        </div>
        <p v-if="error" class="text-red-500 text-xs italic text-center">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </LoginLayout>
</template>

<style scoped>

</style>
