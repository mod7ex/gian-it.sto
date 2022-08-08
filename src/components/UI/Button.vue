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
    default: 'md', // xs, sm, md, lg, xl
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
    type: [String, Object],
    required: false,
  },
  blur: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
});

let ring = props.color;
let bg = props.color;
let border = 'border-transparent';
let text = 'text-white';

if (props.type === 'secondary') {
  ring = 'indigo';
  border = 'border-gray hover:bg-gray-100';
  bg = 'white';
  text = '';
}

const styles = [
  'relative inline-flex items-center border font-medium shadow-sm focus:outline-none',
  `focus:ring-${ring}-500`,
  // `focus:ring-${ring}-500 bg-${bg}-600 hover:bg-${bg}-700`,
  `${props.disabled ? `bg-${bg}-500 cursor-not-allowed` : `bg-${bg}-600 hover:bg-${bg}-700`}`,
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

    default:
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

    default:
      break;
  }
}

const handelClick = (e) => {
  if (props.blur) e.target.blur();
};

</script>

<template>
  <router-link :class="styles.concat($attrs.class)" :to="props.link" v-if="props.link" >
    <slot></slot>
  </router-link>

  <button @click="handelClick" :disabled="props.disabled" type="button" :class="styles.concat($attrs.class)" v-else>
    <slot></slot>
  </button>
</template>
