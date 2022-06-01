import useAppRouter from '~/composables/useAppRouter.js';
import store from '~/store/roles';

const { drop } = store;

let redirect;
let isEditRolePage;

/* ************ Delete role ************ */
const dropRole = async (id) => {
  const { message, success } = await drop(id);

  success && isEditRolePage.value && await redirect({ name: 'Roles' });

  return { message, success };
};

/* ************ ==> To Update role page ************ */
const movetoEditRolePage = async (id) => {
  await redirect({ name: 'EditRole', params: { id } });
};

export default function () {
  const { redirectTo, isThePage } = useAppRouter('EditRole');

  [redirect, isEditRolePage] = [redirectTo, isThePage];

  return {
    movetoEditRolePage,
    dropRole,
  };
}
