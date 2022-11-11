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
  <div :class="[$attrs.class, 'mx-auto px-20 py-5']" >

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

    <div>
      <div v-for="({ data, type, token }, i) in fields" :key="i" class="my-9" >

        <div v-if="type === 'check_list'" class="flex justify-center flex-col items-center" >
          <h3 class="text-center font-bold text-xl mb-3">{{ data?.title }}</h3>
          <div :class="[' border-t border-l border-black grid grid-cols-12']">
            <div
              v-for="(item, j) in data.items"
              :key="`${j}-item`"
              :class="['checklist-item flex items-stretch border-r border-b border-black col-span-4']"
            >
              <span class="text-left p-1 flex items-center">{{ item }}</span>
              <span class="w-12 relative border-black border-l ml-auto check_area">
                <p :class="['absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center text-2xl', answers.data[findFieldIndex(token, type)].data[j] ? 'text-black' : 'text-transparent']" >{{ '&#10003;'  }}</p>
              </span>
            </div>
          </div>
        </div>

        <div v-if="type === 'text'">
          <h3 class="font-bold text-xl text-center mb-3">{{ data }}</h3>
          <p class="text-center pl-2" >{{ answers.data[findFieldIndex(token, type)].data }}</p>
        </div>

        <div v-if="type === 'indication'" class="flex items-center justify-center">
          <div class="border border-black flex items-center justify-center mx-auto" >
            <span class="px-4 p-1 flex items-center justify-start">Показания</span>
            <ul :class="['flex-col']">
              <li class="col-span-1 flex border-b border-black">
                <span :class="['w-64 border-l border-r border-black p-1 flex items-center justify-start']" >{{ data[0] }}</span>
                <span class="pl-1 flex items-center flex-grow bg-gray-50 pr-1" >{{ answers.data[findFieldIndex(token, type)].data[0] }}</span>
              </li>
              <li class="col-span-1 flex">
                <span :class="['w-64 border-l border-r border-black p-1 flex items-center justify-start']" >{{ data[1] }}</span>
                <span class="pl-1 flex items-center flex-grow bg-gray-50 pr-1" >{{ answers.data[findFieldIndex(token, type)].data[1] }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div :class="(i + 1)%7 == 0 ? 'pagebreak' : ''"> </div>

      </div>
    </div>
  </div>
</template>

<style>

.check_area {
  min-width: 50px !important;
}

body #printable {
  display: none;
}

@media print {

  .pagebreak {
    clear: both;
    page-break-after: always; /* page-break-before works, as well */
  }

  @page {
    size: 210mm;
    margin: 0;
  }

  html, body {
    width: 210mm;
    height: 100%;
    font-size: 8px;
  }

  body #app {
    display: none;
  }

  body #printable {
    display: block !important;
  }

}

</style>
