<script setup>
import { ref, watch, computed } from 'vue';
import { PlusCircleIcon, CogIcon } from '@heroicons/vue/outline';
import { debounce } from '~/helpers';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import StackedListWithHeadings from '@/UI/StackedListWithHeadings.vue';
import ClientPreview from '@/Partials/clients/Preview.vue';
import UClients from '@/Layout/users/Users.vue';
import service from '~/services/clients/clients';
import store from '~/store/clients';

const { directory, count, selected, select, state } = store;

const { order, fetchClients } = service();

const ClientsFilter = order.comp();

const headingMessage = computed(() => {
  if (count.value > 1) return `Искать среди ${count.value} клиентов`;
  if (count.value === 1) return 'Один клиент!';
  return 'Нет клиентов!';
});

const search = ref('');

watch(search, debounce(fetchClients, 1500));

</script>

<template>
    <OfficeLayout title="Клиенты" main-classes="flex flex-col min-w-0 flex-1 md:overflow-hidden overflow-auto">
      <template #actions>
        <v-can :ability="['crud cars', 'crud car marks', 'crud fuels', 'crud engine volumes', 'crud car models']">
          <Button type="secondary" :link="{name: 'Cars'}">
            <CogIcon class="w-5 h-5 mr-1" />Автомобили
          </Button>
        </v-can>

        <v-can ability="crud clients">
          <Button color="blue" :link="{name: 'ClientForm'}">
            <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
          </Button>
        </v-can>
      </template>

      <template #content>
        <u-clients
          @toggle-filter="order.active.value = count > 1 && !order.active.value"
          selectText="Выберите клиента"
          :loading="state.loading"
          :message="headingMessage"
          :selected="selected"
          v-model="search"
        >

          <template #filter>
            <clients-filter />
          </template>

          <template #list>
            <StackedListWithHeadings
              class="flex-1 min-h-0 overflow-y-auto"
              :key="order.key.value"
              :selected="state.selectedId"
              :items="directory"
              @select="select"
              @bottom-touched="() => fetchClients()"
            />
          </template>

          <template #preview>
            <client-preview />
          </template>

        </u-clients>
      </template>
    </OfficeLayout>
</template>
