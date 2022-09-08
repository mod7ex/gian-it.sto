<script setup>
import Card from '@/UI/Card.vue';
import Avatar from '@/UI/Avatar.vue';
import Button from '@/UI/Button.vue';
import useAuth from '~/composables/useAuth.js';
import useAppRouter from '~/composables/useAppRouter';
import store from '~/store/employees'; 
import save from '~/helpers/save'
import useApi from '~/composables/useApi.js';
import Spinner from '@/UI/Spinner.vue';
import { ArrowLeftIcon } from '@heroicons/vue/solid';
import { computed } from '@vue/reactivity';

const { apiRequest } = useApi();
const { logOut, userDepartment, setToken, setUser, user } = useAuth();
const { router, back } = useAppRouter();

const { load, state } = store;

await load({ department_id: userDepartment.value });

const { call, data, loading, errorMsg, success, reset } = apiRequest('auth/user-auth', {  });

const logWorker = async (email) => {
  if(loading.value) return
  if(email === user.value.email) return back()

  await call('auth/user-auth', { method: 'post', data: { email } });

  if(success.value) {
    setUser(data.value.user)
    setToken(data.value.api_token)
    setTimeout(() => {
      router.push({ name: 'WorkerTasks' }) // better to use go then push, in order to pull up the token from local storage
    });
  }
}

const workers = computed(() => state.employees.filter(({roles}) => !((roles[0].name === 'admin') || roles[0].name === 'director')));

</script>

<template>
  <Card class="mx-auto lg:w-1/2 w-full" main-classes="">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="flex justify-start items-center">
          <span @click="() => back()" class="rounded-full hover:bg-gray-200 border text-gray-700 border-gray-200 mr-3 cursor-pointer z-50 transition-colors duration-200 ease-in">
            <ArrowLeftIcon class="w-6 h-6 p-1" />
          </span>
          Выберите нового работника
        </span>
        <Spinner h="4" w="4" v-if="loading" >loading</Spinner>
        <span v-else>
          <small class="text-red-600" v-if="!success" >{{ errorMsg ?? 'Что-то пошло не так' }}</small>
        </span>
      </div>
    </template>

    <div class="max-h-96 overflow-y-scroll z-50 relative">
      <div v-for="(worker, i) in workers" :key="i" :class="[user.id == worker.id ? 'bg-gray-200 border-gray-300' : '', 'py-4 px-4 border block']"> 
        <Avatar
          @click="() => logWorker(worker.email)"
          :title="`${worker.name ?? ''} ${worker.surname ?? ''} ${worker.middlename ?? ''}`"
          :image="worker.avatar"
          action
        ><template #subtitle >{{ worker.email }}</template>
        </Avatar>
      </div>
    </div>

    <template #footer>
      <div>
        <Button color="blue" @click="() => logOut(router)" >
          Выйти из системы
        </Button>
      </div>
    </template>
  </Card>
</template>
