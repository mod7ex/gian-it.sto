<script setup>
import { ExclamationCircleIcon } from '@heroicons/vue/solid';

// Fix ISSUE --> https://github.com/vuejs-tips/vue-the-mask/issues/82

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  mask: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
  type: {
    type: String,
    required: false,
    default: 'text',
  },
  help: {
    type: String,
    required: false,
    default: '',
  },
  error: {
    type: String,
    required: false,
    default: '',
  },
  meta: {
    type: String,
    required: false,
    default: '',
  },
  view: {
    type: String,
    required: false,
    default: 'default', // default, inset, over
  },
  classMap: {
    type: Array,
    required: false,
    default: [],
  },
  icon: {
    type: Function,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  modelValue: {
    type: [String, Number],
  },
  min: {
    type: Number,
    required: false,
  },
  max: {
    type: Number,
    required: false,
  },
  step: {
    type: Number,
    default: 1,
  },
});

const styles = props.classMap.concat([
  'shadow-sm block w-full sm:text-sm rounded-md',
]);

if (props.type === 'color') {
  styles.push('h-9 p-1');
}

if (props.disabled) {
  styles.push('bg-gray-200');
}

if (props.error.length > 0) {
  styles.push(
    'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500',
  );
} else {
  styles.push('focus:ring-blue-500 focus:border-blue-500 border-gray-300');
}

if (props.icon) {
  styles.push('pl-10');
}
</script>

<template>
  <div>
    <div class="flex justify-between mb-1" v-if="label.length || meta.length" >
      <label class="block text-sm font-medium text-gray-700" v-if="label.length > 0" >
        {{ label }}
      </label>

      <span class="text-sm text-gray-500" v-if="meta.length > 0">
        {{ meta }}
      </span>
    </div>

    <div class="relative rounded-md shadow-sm">
      <slot name="before">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true" v-if="icon" >
          <component :is="icon" class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </slot>

      <!--
            The reason we have an if statement
            is that we have a conflict with maska
            inside the useModalFoem composable
            the v-maska directive is an unknown directive
       -->

      <input
        v-if="mask"
        :type="type"
        :class="styles"
        :placeholder="placeholder"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        :value="modelValue"
        @input="(e) => $emit('update:modelValue', e.target.value)"
        @blur="() => $emit('blured')"
        @focus="() => $emit('focused')"
        :disabled="disabled"
        v-maska="mask"
      />

      <input
        v-else
        :type="type"
        :class="styles"
        :placeholder="placeholder"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        :value="modelValue"
        @input="(e) => $emit('update:modelValue', e.target.value)"
        @blur="() => $emit('blured')"
        @focus="() => $emit('focused')"
        :disabled="disabled"
      />

      <slot name="after">
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-if="error.length > 0" >
          <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
        </div>
      </slot>
    </div>

    <p class="mt-1 text-xs text-red-600" :class="[`text-${error.lenght ? 'red-600' : 'gray-500'}`]">
      &#160;{{ error ?? help  }}
    </p>
  </div>
</template>

<style scoped></style>
