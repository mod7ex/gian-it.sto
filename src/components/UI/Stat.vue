<script setup>
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/vue/solid';
import Link from '@/UI/Link.vue';

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  stat: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  change: {
    type: String,
    required: false,
  },
  link: {
    type: Object,
    required: false,
  },
  icon: {
    type: [Object, Function, null],
    required: false,
  },
});
</script>

<template>
  <div class="relative bg-white pt-5 sm:pt-6 shadow rounded-lg overflow-hidden">
    <div class="px-4 sm:px-6">
      <dt>
        <div class="absolute bg-blue-600 rounded-md p-3" v-if="props.icon">
          <component :is="props.icon" class="h-6 w-6 text-white" aria-hidden="true" />
        </div>

        <p class="ml-16 text-sm font-medium text-gray-500 truncate" v-if="props.title">
          {{ props.title }}
        </p>
      </dt>

      <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
        <p class="text-2xl font-semibold text-gray-900" v-if="props.stat">
          {{ props.stat }}
        </p>

        <p :class="[props.type === 'increase' ? 'text-green-600' : 'text-red-600', 'ml-2 flex items-baseline text-sm font-semibold']" v-if="props.change">
          <ArrowSmUpIcon v-if="props.type === 'increase'" class="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
          <ArrowSmDownIcon v-else class="self-center flex-shrink-0 h-5 w-5 text-red-500" aria-hidden="true" />
          {{ props.change }}
        </p>
      </dd>
    </div>

    <div class="inset-x-0 bg-gray-50 px-4 py-4 sm:px-6" v-if="props.link">
      <div class="text-sm">
        <Link :href="props.link.href">
          {{ props.link.label }}
        </Link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
