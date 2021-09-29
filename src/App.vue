<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import Buttons from './components/Examples/Buttons.vue';
import Badges from './components/Examples/Badges.vue';
import Inputs from './components/Examples/Inputs.vue';
import Selects from './components/Examples/Selects.vue';
import Toggles from './components/Examples/Toggles.vue';
</script>

<template>
    <div class="p-5">
      <Badges />
      <Buttons />
      <Inputs />
      <Selects />
      <Toggles />
    </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
