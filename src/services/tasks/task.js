import { reactive } from 'vue';
import useAppRouter from '~/composables/useAppRouter.js';
import $ from '~/helpers/fetch.js';
// import useToast from '~/composables/useToast.js';

// const toaster = useToast();

export default function () {
  const { route, back } = useAppRouter();

  let task = reactive({});

  const atMounted = async () => {
    const { id } = route.params;

    task = await $.task(id);

    if (!task.id) {
      // throw Error(`Couldn't find task with id ${id}`);
      // back();
    }
  };

  return {
    atMounted,
    task,
  };
}
