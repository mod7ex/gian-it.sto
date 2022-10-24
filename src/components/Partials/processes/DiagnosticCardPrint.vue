<script setup>

const props = defineProps({
  fields: Array,

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
  <div id="printable" >
    <div :class="[$attrs.class, 'mx-auto border-2 border-black']">
      <div v-for="({ data, type, token }, i) in fields" :key="i" class="mb-9" >

        <div v-if="type === 'check_list'" class="flex justify-center flex-col" >
          <h3 class="font-bold text-xl mb-3">{{ data?.title }}</h3>
          <div :class="['mx-auto flex flex-col border-t border-l border-black']">
            <div
              v-for="(item, j) in data.items"
              :key="`${j}-item`"
              :class="[
                'checklist-item relative col-span-12 flex items-center justify-center border-r border-b border-black p-3',
                data.items.length < 3 ? 'sm:col-span-6' : '',
                data.items.length === 3 ? 'sm:col-span-6 md:col-span-4' : '',
                data.items.length >= 4 ? 'sm:col-span-6 md:col-span-4 xl:col-span-3' : '',
              ]"
            >
              <span class="flex items-center justify-center w-10 text-3xl">
                {{ answers.data[findFieldIndex(token, type)].data[j] ? '&#10003;' : ' ' }}
              </span>
              <span class="text-left w-full">{{ item }}</span>
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
@media print {
  body {
    position: relative;
    border: 2px solid green;
  }

  body #printable {
    position: sticky;
    top: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    height: 100% !important;
  }

  /*
  @page {
    size: 210mm;
    margin: 0;
  }

  html, body {
    width: 210mm;
    height: 100%;
  }
  */

  body * {
    visibility: hidden !important;
  }

  body #printable * {
    visibility: visible !important;
  }
}
</style>
