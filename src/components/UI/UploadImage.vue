<script setup>
import { uniqueId } from 'lodash';

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  image: {
    type: String,
    required: false,
    default: '',
  },
  rounded: {
    type: Boolean,
    required: false,
    default: true,
  },
  full: {
    type: Boolean,
    required: false,
    default: false,
  },
  loader: {
    type: Boolean,
    required: false,
    default: false,
  },
  error: {
    type: String,
    required: false,
    default: '',
  },
});

const id = uniqueId('uploadImage');
</script>

<template>
  <div class="flex-grow lg:mt-0 lg:mr-6 lg:flex-grow-0 lg:flex-shrink-0">

    <p class="text-sm font-medium text-gray-700" aria-hidden="true">
      {{ props.label }}
    </p>

<!--
    // what this code is for
    <div class="mt-1 lg:hidden">
      <div class="flex items-center">

        <div :class="[ 'flex-shrink-0 inline-block overflow-hidde', { 'rounded-full': props.rounded }, props.full ? 'h-full' : 'h-12', props.full ? 'w-full' : 'w-12', ]" aria-hidden="true" >
          <img :class="[ 'object-cover h-full w-full', { 'rounded-full': props.rounded }, ]" :src="image" alt="" />

          <span class="hidden lg:block">Загрузить</span>
        </div>

        <div class="ml-5 rounded-md shadow-sm">
          <div class="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-light-blue-500" >

            <label :for="id" class="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none">
              <span>Загрузить</span>
            </label>

            <span v-if="props.loader" class="absolute border-2 mr-1 border-blue-400 borderTopColorTransparent border-solid rounded-full animate-spin w-5 h-5"></span>

            <input
              @change="(event) => $emit('selected', event)"
              :id="id"
              type="file"
              :disabled="props.loader"
              class="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
            />
          </div>
        </div>

      </div>
    </div>
-->

    <div :class="['hidden relative overflow-hidden lg:block', { 'rounded-full': props.rounded }]" >
      <img :class="[ 'relative object-cover', { 'rounded-full': props.rounded }, props.full ? 'h-full' : 'h-40', props.full ? 'w-full' : 'w-40', ]" :src="image" alt="" />

      <label :for="id" :class="['absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white hover:opacity-100 focus-within:opacity-100', `opacity-${props.loader ? 100 : 0}`]" >

        <span>Загрузить</span>
        <div v-if="props.loader" class="absolute border-2 mr-1 border-blue-400 borderTopColorTransparent border-solid rounded-full animate-spin w-8 h-8" ></div>

        <input
          @change="(event) => $emit('selected', event)"
          :id="id"
          type="file"
          :disabled="props.loader"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
        />
      </label>
    </div>

    <label :for="id" class="mt-3 block flex justify-center text-sm text-center cursor-pointer hidden lg:block">
      Загрузить
    </label>

    <p class="mt-2 text-sm text-red-600 text-center" v-if="props.error" >
      {{ props.error }}
    </p>
  </div>
</template>

<style scoped>
.borderTopColorTransparent {
  border-top-color: transparent;
}
</style>
