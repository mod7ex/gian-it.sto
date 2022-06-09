<script setup>

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

const id = Math.random().toString();
</script>

<template>
  <div class="flex-grow lg:mt-0 lg:mr-6 lg:flex-grow-0 lg:flex-shrink-0">

    <p class="text-sm font-medium text-gray-700" aria-hidden="true">
      {{ props.label }}
    </p>

    <div :class="['hidden relative overflow-hidden lg:block', { 'rounded-full': props.rounded }]" >
      <img :class="[ 'relative object-cover', { 'rounded-full': props.rounded }, props.full ? 'h-full' : 'h-40', props.full ? 'w-full' : 'w-40', ]" :src="image" alt="" />

      <label :for="id" :class="['absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 ease-in', `opacity-${props.loader ? 100 : 0}`]" >

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

    <label :for="id" class="mt-3 justify-center text-sm text-center cursor-pointer hidden lg:block">
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
