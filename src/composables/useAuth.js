import { ref, readonly, computed } from 'vue';
import axios from 'axios';

const TOKEN_STORE_NAME = 'token';

const defaultUserFields = {
  permissions: [],
  roles: [],
};

const rawToken = ref();

const token = computed({
  get: () => {
    if (rawToken.value) return rawToken.value;
    return localStorage.getItem(TOKEN_STORE_NAME); // for this we have to refresh the page on login
  },
  set: (v) => {
    rawToken.value = v;
    localStorage.setItem(TOKEN_STORE_NAME, v);
  },
});

const user = ref(defaultUserFields);
const isUserLogged = computed(() => !!user.value.id);
const isAdmin = computed(() => user.value.roles[0].name === 'admin');
const userDepartment = computed(() => user.value?.department?.id);

const setToken = ((payload) => {
  if (!payload) return localStorage.removeItem(TOKEN_STORE_NAME);
  token.value = payload;
  return true;
});

const setUser = (userData) => {
  user.value = userData;
  if (!localStorage.getItem('department')) {
    localStorage.setItem('department', `${userData?.department?.id}`);
  }
  if (!userData?.avatar) user.value.avatar = '/src/assets/noAvatar.svg';
  return !!userData;
};

const resetUser = async () => {
  setToken(null);
  return setUser(defaultUserFields);
};

export const logOut = async (router) => {
  try {
    await axios.post(`${import.meta.env.STO_API_BASE_URI}/auth/logout`, {}, {
      headers: { Authorization: `Bearer ${token.value}` },
      timeout: import.meta.env.STO_API_TIMEOUT,
    });
  } catch (error) {
    // Just out to console, because system need to be stable
    // and not stop when logout method returns something wrong
    console.error(error);
  } finally {
    await resetUser();
    if (router) await router.go('/');
    else window.location.reload();
  }
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
    userDepartment,
    isAdmin,
  };
}
