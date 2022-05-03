<script setup>
import Loader from '~/components/Partials/Loader.vue';

</script>

<template>
  <Loader />
  <router-view />
</template>

<style>
@import "vue-toastification/dist/index.css";
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
</style>
