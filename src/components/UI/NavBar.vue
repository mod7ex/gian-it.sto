<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <nav aria-label="Sidebar" class="px-2">
    <div class="space-y-1">
      <router-link v-for="(item,i) in items" :key="`${item.label}-${i}`" :to="{name: item.name}" :class="[item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center px-3 py-2 text-sm font-medium rounded-md']" :aria-current="item.current ? 'page' : undefined">
        <component :is="item.icon" :class="[item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'flex-shrink-0 -ml-1 mr-3 h-6 w-6']" aria-hidden="true" />
        <span class="truncate"> {{ item.label }} </span>
      </router-link>
    </div>
  </nav>
</template>

<style scoped>

</style>
