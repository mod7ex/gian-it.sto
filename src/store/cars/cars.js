import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import { userHasAtLeastOnePermission } from '~/lib/permissions.js';

// const hasPermission = userHasAtLeastOnePermission(['crud cars', 'crud car marks', 'crud fuels', 'crud engine volumes', 'crud car models']);
const hasPermission = userHasAtLeastOnePermission(['crud cars']);

const state = reactive({
  raw: [],
  pages: 100,
  page: 1,
  pending: false,
});

const reset = () => {
  state.raw = [];
  state.pages = 100;
  state.page = 1;
};

const load = async (payload = {}) => {
  if (!hasPermission) return;
  state.raw = await $.cars(payload);
};

const fill = async (payload) => {
  if (state.pending) return;
  if (!hasPermission) return;
  if (state.page > state.pages) return;
  state.pending = true;
  const data = await $({ key: 'cars', params: { ...payload, page: state.page } });
  state.raw = state.raw.concat(data?.cars ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
  state.pending = false;
};

const drop = async (id) => _$.car(id, (v) => {
  state.raw.deleteById(v);
});

const extractor = ({ id, car_model, vin, number, client }) => ({ id, car_model: car_model?.name, vin, number, client: { name: `${client?.name} ${client?.surname}`, id: client?.id } });

export default {
  state: readonly(state),
  reset,
  load,
  fill,
  drop,
  cars: computed(() => state.raw.map(extractor)),
  options: computed(() => state.raw.map(({ id, vin }) => ({ label: vin, value: id }))),
};
