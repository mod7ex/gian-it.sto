<script setup>
import { computed } from 'vue';

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

const styles = computed(() => {
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

  const v = [
    'relative inline-flex items-center border font-medium shadow-sm focus:outline-none',
    `focus:ring-${ring}-500`,
    // `focus:ring-${ring}-500 bg-${bg}-600 hover:bg-${bg}-700`,
    `${props.disabled ? `bg-${bg}-500 cursor-not-allowed` : `bg-${bg}-600 hover:bg-${bg}-700`}`,
    border, text,
  ];

  if (props.group === 'none') {
    v.push('focus:ring-2 focus:ring-offset-2');
  } else {
    v.push(`focus:ring-1 focus:z-10 focus:border-${ring}-500`);
  }

  if (props.group === 'left') {
    v.push('rounded-l-md');
  }

  if (props.group === 'right') {
    v.push('-ml-px');
    v.push('rounded-r-md');
  }

  if (props.group === 'center') {
    v.push('-ml-px');
  }

  if (props.round && props.group === 'none') {
    v.push('rounded');
  }

  if (props.circle) {
    v.push('rounded-full');

    switch (props.size) {
      case 'xs':
        v.push('p-1');
        v.push('text-xs');
        break;

      case 'sm':
        v.push('p-1.5');
        v.push('text-sm');
        break;

      case 'md':
        v.push('p-2');
        v.push('text-sm');
        break;

      case 'lg':
        v.push('p-2');
        v.push('text-base');
        break;

      case 'xl':
        v.push('p-3');
        v.push('text-base');
        break;

      default:
        break;
    }
  } else {
    switch (props.size) {
      case 'xs':
        v.push('px-2.5 py-1.5');
        v.push('text-xs');
        break;

      case 'sm':
        v.push('px-3 py-2');
        v.push('text-sm leading-4');
        break;

      case 'md':
        v.push('px-4 py-2');
        v.push('text-sm');
        break;

      case 'lg':
        v.push('px-4 py-2');
        v.push('text-base');
        break;

      case 'xl':
        v.push('px-6 py-3');
        v.push('text-base');
        break;

      default:
        break;
    }
  }

  return v;
});

const handelClick = (e) => { if (props.blur) e.target.blur(); };

</script>

<template>
  <router-link :class="styles.concat($attrs.class)" :to="props.link" v-if="props.link" >
    <slot></slot>
  </router-link>

  <button @click="handelClick" :disabled="props.disabled" type="button" :class="styles.concat($attrs.class)" v-else>
    <slot></slot>
  </button>
</template>
