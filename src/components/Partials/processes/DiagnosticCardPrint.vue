<script setup>
import { generateShapedIdfromId } from '~/helpers';

const props = defineProps({
  fields: Array,

  task_id: [Number, String, undefined, null],

  task: Object,

  answers: {
    type: Object,
    default: () => ({
      id: undefined,
      task_id: undefined,
      data: [],
    }),
  },
});

const findFieldInexIn = (arr, tk, tp) => arr.findIndex(({ type, token }) => token === tk && type === tp);

const findFieldIndex = (tk, tp) => findFieldInexIn(props.answers.data, tk, tp);

</script>

<template>
  <div :class="[$attrs.class, 'mx-auto px-5 pt-5 pb-2']" >

    <header class="mb-6 py-3 mx-auto">
      <h2 class="text-center font-bold text-xl mb-6">Диагностическая карта <span>&#8470;</span> <span>{{ task?.id ?  generateShapedIdfromId(task?.id) : '&#95;&#95;&#95;&#95;&#95;' }}</span></h2>

      <div class="grid grid-cols-12 border-black border">
        <span class="text-left px-9 col-span-4"><b class="mr-6">Дата:</b>{{ task?.end_at }}</span>
        <span class="text-left px-9 col-span-4 border-l border-black"><b class="mr-6">Авто:</b>
          {{ `${task?.order.car?.car_model?.car_mark?.name ?? ''} ${task?.order.car?.car_model?.name ?? '_'}` }}
        </span>
        <span class="text-left px-9 col-span-4 border-l border-black"><b class="mr-6">&#8470;:</b>{{ ' ' }}</span>
      </div>
    </header>

    <div >
      <div v-for="({ data, type, token }, i) in fields" :key="i" class="mb-9" >

        <div v-if="type === 'check_list'" class="flex justify-center flex-col" >
          <h3 class="text-center font-bold text-xl mb-3">{{ data?.title }}</h3>
          <div :class="['mx-auto flex flex-col border-t border-l border-black']">
            <div
              v-for="(item, j) in data.items"
              :key="`${j}-item`"
              :class="[
                'checklist-item relative col-span-12 flex items-stretch justify-center border-r border-b border-black',
                data.items.length < 3 ? 'sm:col-span-6' : '',
                data.items.length === 3 ? 'sm:col-span-6 md:col-span-4' : '',
                data.items.length >= 4 ? 'sm:col-span-6 md:col-span-4 xl:col-span-3' : '',
              ]"
            >
              <span class="text-left w-full border-r border-black p-3">{{ item }}</span>
              <span class="flex items-center justify-center w-10 text-3xl py-3">
                {{ answers.data[findFieldIndex(token, type)].data[j] ? '&#10003;' : ' ' }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="type === 'text'">
          <h3 class="font-bold text-xl text-center mb-3">{{ data }}</h3>
          <p class="text-center pl-2" >{{ answers.data[findFieldIndex(token, type)].data }}</p>
        </div>

        <div v-if="type === 'indication'" class="border border-black flex">
          <span class="px-4 p-1 flex items-center justify-start">Показания</span>
          <ul :class="['flex-grow flex-col']">
            <li class="col-span-1 flex border-b border-black">
              <span :class="['w-64 border-l border-r border-black px-4 p-1 flex items-center justify-start']" >{{ data[0] }}</span>
              <span class="text-left pl-1 flex items-center flex-grow bg-gray-50" >{{ answers.data[findFieldIndex(token, type)].data[0] }}</span>
            </li>
            <li class="col-span-1 flex">
              <span :class="['w-64 border-l border-r border-black px-4 p-1 flex items-center justify-start']" >{{ data[1] }}</span>
              <span class="text-left pl-1 flex items-center flex-grow bg-gray-50" >{{ answers.data[findFieldIndex(token, type)].data[1] }}</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<style>
body #printable {
  display: none;
}

@media print {

  @page {
    size: 210mm;
    margin: 0;
  }

  html, body {
    width: 210mm;
    height: 100%;
  }

  body #app {
    display: none;
  }

  body #printable {
    display: block !important;
  }

}
</style>
