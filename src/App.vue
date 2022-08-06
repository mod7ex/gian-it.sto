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

/* ************ Toasts transition group ************ */
.toasts-list-move, /* apply transition to moving elements */
.toasts-list-enter-active,
.toasts-list-leave-active {
  transition: all 0.5s ease;
}

.toasts-list-enter-from,
.toasts-list-leave-to {
  /* opacity: 0; */
  transform: translateY(-200px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.toasts-list-leave-active {
  position: absolute;
}
/* ************ ************ ************ ************ */

/* ************ scroll-area ************ */
/* .scroll-area::-webkit-scrollbar {
  width: .3em;
  height: .3em;
}

.scroll-area::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.scroll-area::-webkit-scrollbar-thumb {
  background-color: darkgrey;
}

.scroll-area::-webkit-scrollbar-thumb:hover {
  background-color: #2563EB;
} */

/* ************ ************ ************ ************ */

::-webkit-scrollbar {
  width: .3em;
  height: .3em;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
  background-color: darkgrey;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #2563EB;
}
</style>
