<script setup>
import Badge from './../UI/Badge.vue';
</script>

<template>
  <!-- Badges -->
  <h2 class="font-bold mb-1 text-xl">Метки</h2>

  <div>
    <Badge class="mr-2">
      Метка
    </Badge>

    <Badge class="mr-2" color="red">
      Метка
    </Badge>

    <Badge class="mr-2" color="yellow">
      Метка
    </Badge>

    <Badge class="mr-2" color="purple">
      Метка
    </Badge>

    <Badge class="mr-2" color="blue">
      Метка
    </Badge>
  </div>

  <div class="mt-4">
    <Badge class="mr-2" size="sm">
      Метка
    </Badge>

    <Badge class="mr-2" color="red" size="sm">
      Метка
    </Badge>

    <Badge class="mr-2" color="yellow" size="sm">
      Метка
    </Badge>

    <Badge class="mr-2" color="purple" size="sm">
      Метка
    </Badge>

    <Badge class="mr-2" color="blue" size="sm">
      Метка
    </Badge>
  </div>

  <div class="mt-4">
    <Badge class="mr-2" :point="true">
      Метка
    </Badge>

    <Badge class="mr-2" color="red" :point="true">
      Метка
    </Badge>

    <Badge class="mr-2" color="yellow" :point="true">
      Метка
    </Badge>

    <Badge class="mr-2" color="purple" :point="true">
      Метка
    </Badge>

    <Badge class="mr-2" color="blue"  :point="true">
      Метка
    </Badge>
  </div>

  <div class="mt-4">
    <Badge class="mr-2" size="sm" :point="true">
      Метка
    </Badge>

    <Badge class="mr-2" color="red" size="sm" :point="true">
      Метка
    </Badge>

    <Badge class="mr-2" color="yellow" size="sm" :point="true">
      Метка
    </Badge>

    <Badge class="mr-2" color="purple" size="sm" :point="true">
      Метка
    </Badge>

    <Badge class="mr-2" color="blue" size="sm" :point="true">
      Метка
    </Badge>
  </div>
</template>

<style scoped>

</style>
