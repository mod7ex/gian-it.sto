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

/* ************ scroll-area ************ */
/* .scroll-area::-webkit-scrollbar {
  width: .5em;
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

/* ********* */

::-webkit-scrollbar {
  width: .5em;
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
