<script setup>
import { SearchIcon, FilterIcon, UserGroupIcon } from '@heroicons/vue/solid';
import Input from '@/UI/Input.vue';
import Button from '@/UI/Button.vue';
import Spinner from '@/UI/Spinner.vue';

defineProps({
  selectText: {
    type: String,
    default: 'Выберите сотрудника',
  },

  loading: {
    type: Boolean,
    default: false,
  },

  selected: {
    type: Boolean,
    default: false,
  },

  message: {
    type: String,
  },

  modelValue: {
    type: [String, Number],
  },
});

defineEmits(['toggle-filter', 'update:modelValue']);

</script>

<template>
    <div class="flex-1 relative z-0 flex md:overflow-hidden overflow-visible flex-col md:flex-row" >
        <div class="order-2 md:order-first md:flex md:flex-col flex-shrink-0 w-96 border-r border-gray-200" >
            <div class="px-6 pt-6 pb-4">
            <h2 class="text-lg font-medium text-gray-900">Картотека</h2>

            <div v-if="loading" class="mt-1">
                <Spinner h="4" w="4">
                    <span class="text-sm text-gray-600">Загрузка данных...</span>
                </Spinner>
            </div>

            <p class="my-1 text-sm text-gray-600" v-else><span> {{ message }} </span></p>

            <div class="mt-6 flex space-x-4 mb-3">
                <Input placeholder="Поиск" class="flex-grow" :icon="SearchIcon" @input="(e) => $emit('update:modelValue', e.target.value)" />

                <Button type="secondary" @click="() => $emit('toggle-filter')">
                    <FilterIcon class="w-5 h-5 text-gray-400" />
                </Button>
            </div>

            <slot name="filter"></slot>

            </div>

            <slot name="list"></slot>
        </div>

        <slot name="preview" v-if="selected"></slot>

        <div class="flex flex-col items-center justify-center w-full" v-else>
            <UserGroupIcon class="h-12 w-12 mx-auto text-gray-600" />

            <span class="mt-2 block text-sm font-medium text-gray-900">{{ selectText }}</span>
        </div>
    </div>
</template>
