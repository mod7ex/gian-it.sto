import { effectScope, onScopeDispose, ref } from 'vue';
import $ from '~/helpers/fetch';

// use store of pipines and stages and orders

let stages;

const setKanBanStages = async () => {
  const pipelines = await $.pipelines({ type: 'order' });

  // We suppose that there is only one funnel for orders
  const pipeline_id = pipelines[0]?.id;

  if (!pipeline_id) return;

  stages.value = await $.stages({ pipeline_id });
};

const atMounted = async () => {
  await setKanBanStages();
};

export default () => effectScope().run(() => {
  if (!stages) {
    stages = ref([]);
  }

  onScopeDispose(() => {
    stages = undefined;
  });

  return {
    atMounted,
    stages,
  };
});
