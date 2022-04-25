import { ref, readonly, computed } from 'vue';

const defaultUserFields = {
  id: 0,
  permissions: [],
};

const token = ref('');

const user = ref(defaultUserFields);

export default function useAuth() {
  const setToken = ((inputToken) => {
    localStorage.setItem('token', inputToken);
    token.value = inputToken;
  });

  const setUser = (userData) => {
    user.value = userData;
    if (userData.avatar === '') {
      user.value.avatar = 'src/assets/noAvatar.svg';
    }
  };

  const resetUser = async () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(defaultUserFields);
  };

  const isUserLogged = computed(() => user.value.id !== 0);

  return {
    user: readonly(user),
    token: readonly(token),
    setUser,
    setToken,
    resetUser,
    isUserLogged,
  };
}
