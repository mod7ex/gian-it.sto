<script setup>
import {
  Dialog,
  DialogOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import Link from '@/UI/Link.vue';

const props = defineProps({
  items: {
    type: Array,
    required: false,
  },
  direction: {
    type: String,
    required: false,
    default: 'center',
  },
});

const menuStyles = ['mt-2 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'];
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
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <slot></slot>
    </div>
    <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems :class="menuStyles">
        <slot name="items" :items="items">
          <div class="py-1" v-for="(child, i) in items" :key="i">
            <MenuItem v-slot="{ active }" v-for="item in child">
                <button
                    v-if="item.click !== undefined"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'w-full text-left block px-4 py-2 text-sm']"
                    @click="item.click"
                >
                  {{ item.label }}
                </button>
                <router-link
                    v-else
                    :to="item.href || '#'"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'w-full text-left block px-4 py-2 text-sm']"
                >
                  {{ item.label }}
                </router-link>
            </MenuItem>
          </div>
        </slot>
      </MenuItems>
    </transition>
  </Menu>
</template>

<style scoped>

</style>
