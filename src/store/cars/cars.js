import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import { userHasAtLeastOnePermission } from '~/lib/permissions.js';

const hasPermission = userHasAtLeastOnePermission(['crud cars', 'crud car marks', 'crud fuels', 'crud engine volumes', 'crud car models']);

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async (payload = {}) => {
  if (!hasPermission) return;
  state.raw = await $.cars(payload);
};

const drop = async (id) => _$.car(id, (v) => {
  state.raw.deleteById(v);
});

const extractor = ({ id, car_model, vin, number, client }) => ({ id, car_model: car_model?.name, vin, number, client: { name: `${client?.name} ${client?.surname}`, id: client?.id } });

export default {
  state: readonly(state),
  reset,
  load,
  drop,
  cars: computed(() => state.raw.map(extractor)),
  options: computed(() => state.raw.map(({ id, vin }) => ({ label: vin, value: id }))),
};
