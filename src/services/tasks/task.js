import { reactive, effectScope, onScopeDispose } from 'vue';
import useAppRouter from '~/composables/useAppRouter.js';
import $ from '~/helpers/fetch.js';
// import useToast from '~/composables/useToast.js';

// const toaster = useToast();

let task;

export default () => effectScope().run(() => {
  const { route, back } = useAppRouter();

  if (!task) task = reactive({});

  const atMounted = async () => {
    const { id } = route.params;

    task = await $.task(id);

    if (!task.id) {
      // throw Error(`Couldn't find task with id ${id}`);
      // back();
    }
  };

  onScopeDispose(() => {
    task = undefined;
  });

  return {
    atMounted,
    task,
  };
});
