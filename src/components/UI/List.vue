<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
  subtitle: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<template>
  <div>
    <div v-if="props.title.length > 0 || props.subtitle.length > 0">
      <h2 class="text-lg leading-6 font-medium text-gray-900">{{ props.title }}</h2>

      <p class="mt-1 text-sm text-gray-500">
        {{ props.subtitle }}
      </p>
    </div>

    <ul class="divide-y divide-gray-200">
      <li class="py-4 flex items-center justify-between" v-for="(item, index) in props.items" :key="index">
        <div class="flex flex-col">
          <p class="text-sm font-medium text-gray-900">
            {{ item.title }}
          </p>

          <p class="text-sm text-gray-500">
            {{ item.subtitle }}
          </p>
        </div>

        <div>
          <slot name="right" :item="item" :index="index"></slot>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
