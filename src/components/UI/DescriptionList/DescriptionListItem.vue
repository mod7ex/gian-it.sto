<script setup>
import { computed } from 'vue';
import Badge from '@/UI/Badge.vue';

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  value: {
    type: [String, Array],
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
    default: 'rows', // rows, columns
  },
  columns: {
    type: String,
    required: false,
    default: '1', // 1, 2
  },
});

const isArrayValue = computed(() => Array.isArray(props.value));

const style = computed(() => (props.type === 'columns' ? `sm:col-span-${props.columns}` : 'py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'));
</script>

<template>
  <div :class="style">
    <slot name="label">
      <div class="text-sm font-medium text-gray-500" v-if="props.label">
        {{ props.label }}
      </div>
    </slot>

    <slot>
      <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" v-if="props.value">
        <span v-if="isArrayValue" >
          <Badge :point="true" color="blue" v-for="item in props.value" :key="item" style="mx-6">
              {{ item }}
          </Badge>
        </span>
        <span v-else>{{ props.value }}</span>
      </div>
    </slot>

    <slot name="text">
      <span class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-3" v-if="props.text">
        {{ props.text }}
      </span>
    </slot>
  </div>
</template>
