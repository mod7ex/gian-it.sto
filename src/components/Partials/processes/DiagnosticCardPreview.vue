<script setup>
import { computed, onMounted, reactive, watch, ref } from 'vue';
import { generateShapedIdfromId, debounce } from '~/helpers';
import save from '~/helpers/save';
import DiagnosticCardPrint from './DiagnosticCardPrint.vue';

const props = defineProps({
  id: String,
  fields: Array,
  dc_template: Object,
  task: Object,

  map_answer: [Object, undefined, null],

  task_id: [Number, String, undefined, null],

  noHead: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  for_worker: {
    type: Boolean,
    default: false,
  },
});

const ready = ref(false);

const blocked = computed(() => props.disabled || ((props.task_id == null) && (props.map_answer == null)));

/**
 *
 * @param {{type: string, data: object | string | string[]}[]} paylaod
 */
const simulateAnswer = (paylaod) => {
  const answr = [];

  paylaod.forEach(({ type, data, token }) => {
    const item = { token, type };
    if (type === 'check_list') {
      // data.items ==> string[]
      item.data = [...data.items].fill(false);
    } else if (type === 'text') {
      item.data = '';
    } else if (type === 'indication') {
      // data ==> [string, string]
      item.data = [...data].fill('');
    }

    answr.push(item);
  });

  return answr;
};

const answers = reactive({
  id: undefined,
  task_id: undefined,
  data: [],
});

const findFieldInexIn = (arr, tk, tp) => arr.findIndex(({ type, token }) => token === tk && type === tp);

// const findFieldIndex = (tk, tp) => answers.data.findIndex(({ type, token }) => token === tk && type === tp);
const findFieldIndex = (tk, tp) => findFieldInexIn(answers.data, tk, tp);

const shapeAnswers = (payload) => {
  if (!payload) return undefined;

  const shappedAnswer = [];

  props.fields.forEach(({ type, data, token }) => {
    const item = { token, type };
    const i = findFieldInexIn(payload, token, type);

    if (type === 'check_list') {
      // Fix: might be an issue of Template edited index might change
      if (i < 0) { item.data = [...data.items].fill(false); } else { item.data = data.items.map((v, j) => !!payload[i].data[j]); }
    } else if (type === 'text') {
      if (i < 0) { item.data = ''; } else { item.data = payload[i].data; }
    } else if (type === 'indication') {
      if (i < 0) { item.data = [...data].fill(''); } else { item.data = [payload[i].data[0], payload[i].data[1]]; }
    }

    shappedAnswer.push(item);
  });

  return shappedAnswer;
};

onMounted(() => {
  const { task_id: ts_id } = props;

  if (props.map_answer) {
    const { id, data, task_id } = props.map_answer;
    answers.data = data ? shapeAnswers(data) : simulateAnswer(props.fields); // already formatted
    answers.id = id;
    answers.task_id = task_id;
  } else {
    answers.data = simulateAnswer(props.fields);
    answers.task_id = ts_id;
  }

  setTimeout(() => {
    ready.value = true;
  });

  if (!answers.task_id && answers.task_id != 0) return;

  watch(() => answers.data, debounce(async () => {
    const { data: { map_answer } } = await save.map_answer(answers);
    if (map_answer?.id && !answers.id) answers.id = map_answer?.id;
  }), { deep: true });
});

</script>

<template>
  <div v-if="ready" :id="props.id" class="relative text-center border-gray-300 border rounded shadow p-6 px-9 mx-auto max-w-6xl select-none">
    <header v-if="!noHead" class="mb-6 py-3 mx-auto">
      <h2 class="text-center font-bold text-xl mb-6">Диагностическая карта <span>&#8470;</span> <span>{{ task_id ?  generateShapedIdfromId(task_id) : '&#95;&#95;&#95;&#95;&#95;' }}</span></h2>

      <div class="grid grid-cols-12 border-black border">
        <span class="text-left px-9 col-span-4"><b class="mr-6">Дата:</b>{{ task?.end_at }}</span>
        <span class="text-left px-9 col-span-4 border-l border-black"><b class="mr-6">Авто:</b>
          {{ `${task?.order.car?.car_model?.car_mark?.name ?? ''} ${task?.order.car?.car_model?.name ?? '_'}` }}
        </span>
        <span class="text-left px-9 col-span-4 border-l border-black"><b class="mr-6">&#8470;:</b>{{ ' ' }}</span>
      </div>
    </header>

    <!-- Fields -->
    <!-- <div class="mx-auto" >
      <div v-for="({ data, type, token }, i) in fields" :key="i" class="mb-9" >

        <div v-if="type === 'check_list'" class="flex justify-center flex-col" >
          <h3 class="font-bold text-xl mb-3">{{ data?.title }}</h3>
          <div :class="['mx-auto gap-3', for_worker ? 'flex flex-col' : 'grid grid-cols-12']">
            <div
              v-for="(item, j) in data.items"
              :key="`${j}-item`"
              :class="[
                'checklist-item relative col-span-12 flex items-start justify-center content-center',
                data.items.length < 3 ? 'sm:col-span-6' : '',
                data.items.length === 3 ? 'sm:col-span-6 md:col-span-4' : '',
                data.items.length >= 4 ? 'sm:col-span-6 md:col-span-4 xl:col-span-3' : '',
                for_worker ? 'for_worker' : ''
              ]"
            >
              <input type="checkbox" class="rounded mr-2 sto-mt-7 bg-gray-50 p-2" v-model="answers.data[findFieldIndex(token, type)].data[j]" :disabled="blocked" >
              <span class="text-left w-full -mb-2">{{ item }}</span>
            </div>
          </div>
        </div>

        <div v-if="type === 'text'" class="flex flex-col" >
          <h3 class="font-bold text-xl text-left mb-3">{{ data }}</h3>
          <textarea
            rows="5"
            :disabled="blocked"
            class="w-full rounded-md bg-gray-50 select-none"
            v-model="answers.data[findFieldIndex(token, type)].data"
          ></textarea>
        </div>

        <div v-if="type === 'indication'" class="border border-black flex mt-6">
          <span class="px-4 p-1 flex items-center justify-start">Показания</span>
          <ul :class="['flex-grow', for_worker ? 'flex-col' : 'grid grid-cols-2']">
            <li class="col-span-1 flex" :class="[for_worker ? 'border-b border-black' : '']">
              <span :class="[for_worker ? 'w-64' : '', 'border-l border-r border-black px-4 p-1 flex items-center justify-start']" >{{ data[0] }}</span>
              <input type="text" class=" w-full flex-grow bg-gray-50 border-none" v-model="answers.data[findFieldIndex(token, type)].data[0]" :disabled="blocked" >
            </li>
            <li class="col-span-1 flex">
              <span :class="[for_worker ? 'w-64' : '', 'border-l border-r border-black px-4 p-1 flex items-center justify-start']" >{{ data[1] }}</span>
              <input type="text" class=" w-full flex-grow bg-gray-50 border-none" v-model="answers.data[findFieldIndex(token, type)].data[1]" :disabled="blocked" >
            </li>
          </ul>
        </div>

      </div>
    </div> -->

    <diagnostic-card-print :fields="fields" :answers="answers" />

  </div>
</template>

<style scoped>

.for_worker {
  align-items: center !important;
}

.for_worker input {
  padding: 1em;
  border-radius: 50%;
}

.sto-mt-7{
  margin-top: 7px;
}
</style>
