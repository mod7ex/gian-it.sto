<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  items: {
    type: Array,
    required: true,
  },
});

// for prod parser
const colors = [
  'bg-indigo-500',
  'bg-blue-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-gray-500',
];
</script>

<template>
  <div>
    <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {{ props.title }}
    </h3>

    <div class="mt-1 space-y-1" role="group">
      <router-link v-for="item in items" :key="item.label" :to="item.href" class="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50">
        <span :class="[`bg-${item.color}-500`, 'w-2.5 h-2.5 mr-2 rounded-full']" aria-hidden="true" />
        <span class="truncate">
          {{ item.label }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>

</style>
