<script setup>
const props = defineProps({
  color: {
    type: String,
    required: false,
    default: 'gray',
  },
  size: {
    type: String,
    required: false,
    default: 'md',  // xs, sm, md, lg, xl
  },
  circle: {
    type: Boolean,
    required: false,
    default: false,
  },
  round: {
    type: Boolean,
    required: false,
    default: true,
  },
  group: {
    type: String,
    required: false,
    default: 'none', // left, right, none, center
  },
  type: {
    type: String,
    required: false,
    default: 'primary', // primary, secondary
  },
  link: {
    type: String,
    required: false,
  }
});
let ring = props.color;
let bg = props.color;
let border = 'border-transparent';
let text = 'text-white';
if (props.type === 'secondary') {
  ring = 'indigo';
  border = 'border-gray';
  bg = 'white';
  text = '';
}

// for prod parser
const colors = [
  'focus:ring-indigo-500',
  'bg-indigo-600',
  'hover:bg-indigo-700',
  'focus:border-indigo-500',

  'focus:ring-yellow-500',
  'bg-yellow-600',
  'hover:bg-yellow-700',
  'focus:border-yellow-500',

  'focus:ring-red-500',
  'bg-red-600',
  'hover:bg-red-700',
  'focus:border-red-500',

  'focus:ring-purple-500',
  'bg-purple-600',
  'hover:bg-purple-700',
  'focus:border-purple-500',

  'focus:ring-blue-500',
  'bg-blue-600',
  'hover:bg-blue-700',
  'focus:border-blue-500',

  'focus:ring-green-500',
  'bg-green-600',
  'hover:bg-green-700',
  'focus:border-green-500',

  'focus:ring-gray-500',
  'bg-gray-600',
  'hover:bg-gray-700',
  'focus:border-gray-500',
];

const styles = [
  'relative inline-flex items-center border font-medium shadow-sm focus:outline-none',
  `focus:ring-${ring}-500 bg-${bg}-600 hover:bg-${bg}-700`,
  border, text,
];

if (props.group === 'none') {
  styles.push('focus:ring-2 focus:ring-offset-2');
} else {
  styles.push(`focus:ring-1 focus:z-10 focus:border-${ring}-500`);
}

if (props.group === 'left') {
  styles.push('rounded-l-md');
}

if (props.group === 'right') {
  styles.push('-ml-px');
  styles.push('rounded-r-md');
}

if (props.group === 'center') {
  styles.push('-ml-px');
}

if (props.round && props.group === 'none') {
  styles.push('rounded');
}

if (props.circle) {
  styles.push('rounded-full');

  switch (props.size) {
    case 'xs':
      styles.push('p-1');
      styles.push('text-xs');
      break;

    case 'sm':
      styles.push('p-1.5');
      styles.push('text-sm');
      break;

    case 'md':
      styles.push('p-2');
      styles.push('text-sm');
      break;

    case 'lg':
      styles.push('p-2');
      styles.push('text-base');
      break;

    case 'xl':
      styles.push('p-3');
      styles.push('text-base');
      break;
  }
} else {
  switch (props.size) {
    case 'xs':
      styles.push('px-2.5 py-1.5');
      styles.push('text-xs');
      break;

    case 'sm':
      styles.push('px-3 py-2');
      styles.push('text-sm leading-4');
      break;

    case 'md':
      styles.push('px-4 py-2');
      styles.push('text-sm');
      break;

    case 'lg':
      styles.push('px-4 py-2');
      styles.push('text-base');
      break;

    case 'xl':
      styles.push('px-6 py-3');
      styles.push('text-base');
      break;
  }
}
</script>

<template>
  <button type="button" :class="styles.concat($attrs.class)" v-if="!props.link">
    <slot></slot>
  </button>

  <router-link :class="styles.concat($attrs.class)" :to="props.link" v-else>
    <slot></slot>
  </router-link>
</template>

<style scoped>

</style>
