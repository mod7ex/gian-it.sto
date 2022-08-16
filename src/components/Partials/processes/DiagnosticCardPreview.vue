<script setup>
import service from '~/services/processes/diagnostic-card-form';

const { fields, dc_template } = service();

</script>

<template>
  <div id="card-preview" class="text-center border-gray-300 border rounded shadow p-3 mx-auto">
    <h2 class="text-center font-bold text-xl mb-6">Диагностическая карта <span>&#8470;</span> <span>&#95;&#95;&#95;&#95;&#95;</span></h2>

    <div class="grid grid-cols-12 border-black border mb-6">
      <span class="text-left px-9 col-span-4"><b>Дата:</b></span>
      <span class="text-left px-9 col-span-4 border-l border-black"><b>Авто:</b></span>
      <span class="text-left px-9 col-span-4 border-l border-black"><b>&#8470;:</b></span>
    </div>

    <div>
      <div v-for="(block, i) in fields" :key="i" class="mb-9" >

        <div v-if="block.type === 'check_list'" class="flex justify-center flex-col" >
          <h3 class="font-bold text-xl mb-3">{{ block.data?.title }}</h3>
          <div class="border-t border-l border-black mx-auto grid grid-cols-12">
            <div
              v-for="(item, i) in block?.data.items"
              :key="`${i}-item`"
              class="checklist-item border-b border-r border-black relative col-span-12 flex"
              :class="[
                block?.data.items.length < 3 ? 'sm:col-span-6' : '',
                block?.data.items.length === 3 ? 'sm:col-span-6 md:col-span-4' : '',
                block?.data.items.length >= 4 ? 'sm:col-span-6 md:col-span-4 xl:col-span-3' : '',
              ]"
            >
              <span class="p-2 text-left w-full">{{ item }}</span>
              <span class="border-l border-black w-16">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </div>
          </div>
        </div>

        <div v-else>
          <div v-if="block.type === 'text'" class="flex flex-col">
            <h3 class="font-bold text-xl text-left mb-6">{{ block.data }}</h3>
            <p class="border-b border-gray-500 mb-6 w-full"></p>
            <p class="border-b border-gray-500 mb-6 w-full"></p>
            <p class="border-b border-gray-500 mb-6 w-full"></p>
          </div>

          <div v-else class="border border-black flex">
            <span class="px-4 p-1">Показания</span>
            <ul class="grid grid-cols-2 flex-grow">
              <li class="col-span-1 flex">
                <span class="border-l border-r border-black  px-4 p-1" >{{ block?.data[0] }}</span>
              </li>
              <li class="col-span-1 flex">
                <span class="border-l border-r border-black  px-4 p-1" >{{ block?.data[1] }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
#card-preview{
  max-width: 100%;
}

#card-preview .checklist-item { max-width: 450px; }
</style>
