<script setup>
import Loader from '~/components/Partials/Loader.vue';

</script>

<template>
  <Loader />
  <router-view />
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

/* filter classes */

.filter-enter-active {
  transition: all 300ms ease;
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
  transition: all 300ms ease;
}
.filter-leave-to {
  height: 0;
}

/* ************ scroll-area ************ */
.scroll-area::-webkit-scrollbar {
  width: .5em;
}

.scroll-area::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.scroll-area::-webkit-scrollbar-thumb {
  background-color: darkgrey;
}
</style>
