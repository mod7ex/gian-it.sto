<script setup>
import {
  Menu,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';

const props = defineProps({
  items: {
    type: Array,
    required: false,
  },
  direction: {
    type: String,
    required: false,
    default: 'center', // center, justify, right, left
  },
  position: {
    type: String,
    required: false,
    default: 'bottom', // bottom, center
  },
});

const menuStyles = ['mt-2 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none z-10'];
if (props.direction === 'center') {
  menuStyles.push('z-10 mx-3 origin-top right-0 left-0 w-48');
}

if (props.direction === 'justify') {
  menuStyles.push('z-10 mx-3 origin-top right-0 left-0');
}

if (props.direction === 'right') {
  menuStyles.push('origin-top-right right-0 w-48');
}

if (props.direction === 'left') {
  menuStyles.push('origin-top-left left-0 w-48');
}

if (props.position === 'center') {
  menuStyles.push('-top-full');
}
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <slot></slot>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems :class="menuStyles">
        <slot name="items" :items="items">
          <div class="py-1" v-for="(child, i) in items" :key="i">
            <MenuItem v-slot="{ active }" v-for="item in child" :key="item.label">
                <button
                    v-if="item.click"
                    :class="[active ? 'bg-red-100 text-gray-900' : 'text-gray-700', 'w-full text-left block px-4 py-2 text-sm']"
                    @click="item.click"
                >
                  <span class="flex">
                    <component :is="item.icon" class="w-5 h-5 mr-1" v-if="item.icon" />{{ item.label }}
                  </span>
                </button>
                <router-link
                    v-else
                    :to="{name: item.name}"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'w-full text-left block px-4 py-2 text-sm']"
                >
                  <span class="flex">
                    <component :is="item.icon" class="w-5 h-5 mr-1" v-if="item.icon" />{{ item.label }}
                  </span>
                </router-link>
            </MenuItem>
          </div>
        </slot>
      </MenuItems>
    </transition>
  </Menu>
</template>
