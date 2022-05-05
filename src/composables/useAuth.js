import { ref, readonly, computed } from 'vue';
import axios from 'axios';

const defaultUserFields = {
  permissions: [],
  roles: [],
};

const token = computed({
  get: () => localStorage.getItem('token'), // for this we have to refresh the page on login
  set: (v) => localStorage.setItem('token', v),
});

const user = ref(defaultUserFields);
const isUserLogged = computed(() => !!user.value.id);

const setToken = ((payload) => {
  if (!payload) return localStorage.removeItem('token');
  token.value = payload;
  return true;
});

const setUser = (userData) => {
  user.value = userData;
  if (!userData?.avatar) user.value.avatar = 'src/assets/noAvatar.svg';
  return !!userData;
};

const resetUser = async () => {
  setToken(null);
  return setUser(defaultUserFields);
};

const logOut = async (router) => {
  axios.post(`${import.meta.env.STO_API_BASE_URI}/auth/logout`, {}, {
    headers: { Authorization: `Bearer ${token.value}` },
    timeout: import.meta.env.STO_API_TIMEOUT,
  }).catch((error) => {
    // Just out to console, because system need to be stable
    // and not stop when logout method returns something wrong
    console.error(error);
  });

  await resetUser();
  await router.go('/');
};

export default function useAuth() {
  return {
    token,
    setUser,
    setToken,
    resetUser,
    isUserLogged,
    user: readonly(user),
    logOut,
  };
}
