import { computed, ref, watch } from 'vue';
import useApi from '~/composables/useApi.js';
import useOrder from '~/composables/useOrder.js';
import { $clients } from '~/helpers/fetch.js';
import departments from '~/services/departments/departments';

const { currentDepartment } = departments();

const { apiRequest } = useApi();

const DEFAULT_ORDER_CRITERIA = 'surname';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  surname: { label: 'По фамилии', sort: (a, b) => (a.surname > b.surname ? 1 : (a.surname < b.surname ? -1 : 0)) },
  department: { label: 'По отделам', sort: (a, b) => (a.department?.id - b.department?.id) },
};

const clients = ref([]);
const clientsCount = computed(() => clients.value.length);

const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { clients.value.sort(v); });

const directory = computed(
  () => [...new Set(clients.value.map(({ surname }) => (surname ? surname[0].toUpperCase() : '_')))]
    .sort()
    .reduce((clientGroups, key) => {
      // eslint-disable-next-line no-param-reassign
      clientGroups[key] = clients.value.filter(({ surname }) => (surname ? surname[0].toUpperCase() : '_') === key)
        .map(({ id, name, surname, office_position: op, avatar }) => ({
          id,
          title: `${name} ${surname ?? ''}`,
          subtitle: `${op || ''}`,
          image: `${avatar || ''}`,
        }));
      return clientGroups;
    }, {}),
);

const selectedClientId = ref();
const setSelectedClient = (id) => {
  // eslint-disable-next-line no-param-reassign
  id = Number(id);
  selectedClientId.value = Number.isNaN(id) ? undefined : id;
};

const selectedClient = computed(() => (selectedClientId.value ? clients.value.find(({ id }) => id === selectedClientId.value) ?? {} : {}));
const selected = computed(() => !!selectedClient.value.id);

/* ************ Delete client ************ */
const deleteClient = (clientId) => !!clients.value.splice(
  clients.value.findIndex(({ id }) => id === clientId),
  1,
).length;

const dropClient = async (id) => {
  const { call, errorMsg, success } = apiRequest(`clients/${id}`, { method: 'delete' });

  await call();

  success.value && deleteClient(id) && setSelectedClient();

  const deletionMsg = success.value ? 'Сотрудник успешно удален' : (errorMsg.value ?? 'Не удалось удалить пользователя');

  return { message: deletionMsg, success: success.value };
};

/* ************ Fetch client ************ */
const loading = ref(false);

const fetchClients = async (searchPayload) => {
  if (loading.value) return;

  loading.value = true;

  order.active.value = false;

  clients.value = await $clients({
    order: order.criteria.value,
    name: searchPayload ?? '',
    department_id: currentDepartment.value,
  });

  order.reset();

  loading.value = false;
};

export default function clientsService() {
  watch(currentDepartment, async () => {
    await fetchClients();
  });

  return {
    order,
    clients,
    deleteClient,
    directory,
    clientsCount,
    selected,
    selectedClient,
    dropClient,
    setSelectedClient,
    fetchClients,
    selectedClientId,
    loading,
  };
}
