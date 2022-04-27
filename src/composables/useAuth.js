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
  localStorage.setItem('token', payload);
});

const setUser = (userData) => {
  user.value = userData;
  if (!userData.avatar) user.value.avatar = 'src/assets/noAvatar.svg';
};

const resetUser = async () => {
  setUser(defaultUserFields);
  setToken(null);
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
