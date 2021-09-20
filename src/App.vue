<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Badge from './components/UI/Badge.vue';
import Button from './components/UI/Button.vue';
import ButtonGroup from './components/UI/ButtonGroup.vue';

import { MailIcon, PlusSmIcon as PlusSmIconSolid } from '@heroicons/vue/solid'
import { PlusSmIcon as PlusSmIconOutline } from '@heroicons/vue/outline'

const log = (msg) => console.log(msg);
</script>

<template>
    <div class="p-5">
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

      <!-- Buttons -->
      <h2 class="mt-5 mb-1 font-bold text-xl">Кнопки</h2>
      <div>
        <Button @click="log('button click')">
          Кнопка
        </Button>

        <Button color="indigo" class="ml-2">
          Кнопка
        </Button>

        <Button color="red" class="ml-2">
          Кнопка
        </Button>

        <Button color="yellow" class="ml-2">
          Кнопка
        </Button>

        <Button color="purple" class="ml-2">
          Кнопка
        </Button>
      </div>
      <div class="mt-4">
        <Button size="xs">
          Кнопка
        </Button>

        <Button color="indigo" class="ml-2" size="sm">
          Кнопка
        </Button>

        <Button color="red" class="ml-2" size="md">
          Кнопка
        </Button>

        <Button color="yellow" class="ml-2" size="lg">
          Кнопка
        </Button>

        <Button color="purple" class="ml-2" size="xl">
          Кнопка
        </Button>
      </div>
      <div class="mt-4 flex">
        <Button @click="log('button click')">
          <MailIcon class="mr-1 -ml-1 h-5 w-5" aria-hidden="true" />
          Кнопка
        </Button>

        <Button color="indigo" class="ml-2">
          Кнопка
          <MailIcon class="ml-1 h-5 w-5" aria-hidden="true" />
        </Button>

        <Button color="red" class="ml-2">
          <MailIcon class="mr-1 -ml-1 h-5 w-5" aria-hidden="true" />
          Кнопка
        </Button>

        <Button color="yellow" class="ml-2">
          Кнопка
          <MailIcon class="ml-1 h-5 w-5" aria-hidden="true" />
        </Button>

        <Button color="purple" class="ml-2">
          <MailIcon class="mr-1 -ml-1 h-5 w-5" aria-hidden="true" />
          Кнопка
        </Button>
      </div>
      <div class="mt-4">
        <Button size="xs" :circle="true">
          <PlusSmIconSolid class="h-5 w-5" aria-hidden="true" />
        </Button>

        <Button color="indigo" class="ml-2" size="sm" :circle="true">
          <PlusSmIconSolid class="h-5 w-5" aria-hidden="true" />
        </Button>

        <Button color="red" class="ml-2" size="md" :circle="true">
          <PlusSmIconSolid class="h-5 w-5" aria-hidden="true" />
        </Button>

        <Button color="yellow" class="ml-2" size="lg" :circle="true">
          <PlusSmIconOutline class="h-6 w-6" aria-hidden="true" />
        </Button>

        <Button color="purple" class="ml-2" size="xl" :circle="true">
          <PlusSmIconOutline class="h-6 w-6" aria-hidden="true" />
        </Button>
      </div>

      <!-- Button Groups -->
      <h2 class="mt-5 mb-1 font-bold text-xl">Группы кнопок</h2>
      <div class="flex">
        <ButtonGroup>
          <Button color="indigo" group="left">
            Кнопка
          </Button>
          <Button color="indigo" group="center">
            Кнопка
          </Button>
          <Button color="indigo" group="right">
            Кнопка
          </Button>
        </ButtonGroup>

        <ButtonGroup class="ml-2">
          <Button type="secondary" group="left">
            Кнопка
          </Button>
          <Button type="secondary" group="center">
            Кнопка
          </Button>
          <Button type="secondary" group="right">
            Кнопка
          </Button>
        </ButtonGroup>

        <ButtonGroup class="ml-2">
          <Button type="secondary" group="left">
            <span class="sr-only">Previous</span>
            <!-- Heroicon name: solid/chevron-left -->
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </Button>
          <Button type="secondary" group="right">
            <span class="sr-only">Next</span>
            <!-- Heroicon name: solid/chevron-right -->
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </Button>
        </ButtonGroup>
      </div>
    </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
