<script setup>
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/solid';

defineProps({
  order: {
    type: Object,
  },

  isOpen: {
    type: Boolean,
    default: false,
  },
});

</script>

<template>
<Transition name="filter">
    <div class="text-gray-600" v-if="isOpen">
        <div
            class="py-2 px-4 border cursor-pointer hover:bg-gray-50 flex justify-between items-center"
            v-for="(key, i) in order.criterias.value"
            :key="i"
            @click="order.change(key)"
        >
            <span>{{ order.pivot[key].label }}</span>
            <component
                v-if="key === order.criteria.value"
                :is="order.mod.value === 1 ? ArrowUpIcon : ArrowDownIcon"
                class="w-4 h-4 text-gray-400"
            />
        </div>
    </div>
</Transition>
</template>

<style scoped>
.filter-enter-active {
  transition: all 1s ease;
}
.filter-leave-active,
.filter-enter-active {
  height: 7.85em;
}
.filter-enter-from {
  height: 0;
}
.filter-leave-active,
.filter-enter-from {
  opacity: 0;
  transition: all 1s ease;
}
.filter-leave-to {
  height: 0;
}
</style>
