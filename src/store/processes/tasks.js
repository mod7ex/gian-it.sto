import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

const { drop: dropWrapper } = useConfirmDialog();

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async (process_category_id) => {
  state.raw = await $.process_tasks({ process_category_id });
};

const drop = (id) => dropWrapper(async () => _$.process_task(id, (v) => {
  state.raw.deleteById(v);
}));

export default {
  state: readonly(state),
  reset,
  load,
  drop,
  options: computed(() => state.raw.map(({ id, name }) => ({
    value: id,
    label: name,
  }))),
};
