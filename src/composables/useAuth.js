import { ref, readonly, computed } from 'vue';

const defaultUserFields = {
  permissions: [],
  roles: [],
};

const token = computed(() => localStorage.getItem('token'));
const user = ref(defaultUserFields);
const isUserLogged = computed(() => !!user.value.id);

const setToken = ((payload) => {
  if (!payload) return localStorage.removeItem('token');
  return localStorage.setItem('token', payload) || true;
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

export default function useAuth() {
  return {
    token,
    setUser,
    setToken,
    resetUser,
    isUserLogged,
    user: readonly(user),
  };
}
