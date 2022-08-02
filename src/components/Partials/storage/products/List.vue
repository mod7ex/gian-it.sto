<script setup>
import { computed } from 'vue';
import Table from '@/Layout/Table.vue';
import Link from '@/UI/Link.vue';
import useIntersectionObserver from '~/composables/useIntersectionObserver';
import store from '~/store/storage/products';
import service from '~/services/storage/products';
import form from '~/services/storage/products/form';
import Badge from '~/components/UI/Badge.vue';

defineProps({ grid: Boolean });

const emit = defineEmits(['bottomTouched']);

const { select, products } = store;

const { dropProduct, defaults } = form();

const { fetchProducts, redirectToForm, fetchRequestedParts, isThePage } = service();

const { pixel, container } = useIntersectionObserver(() => { emit('bottomTouched'); }, computed(() => products.value.length > 0));

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Количество', key: 'count' },
  { label: 'Место', key: 'place' },
];

await Promise.all([fetchProducts(true), fetchRequestedParts()]);

</script>

<template>
    <div class="pt-5 pb-1 px-3 lg:px-5" :ref="v => (container = v)">

        <div class="flex" v-if="grid">
            <ul role="list" class="w-full grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <li v-for="item in products" :key="item.id" class="relative shadow-md">
                    <div class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                        <div
                            :style="`background-image: url(${item.photo ?? defaults.photo});`"
                            class="w-full h-full bg-center bg-no-repeat bg-cover shadow-sm cursor-pointer group-hover:opacity-75 transition-opacity duration-300 ease-in"
                        />
                        <button type="button" class="absolute inset-0 focus:outline-none" @click="() => select(item.id)">
                            <span class="sr-only">Посмотреть {{ item.name }}</span>
                        </button>
                    </div>

                    <div class="p-4">
                        <Badge v-if="isThePage" :point="true" color="yellow">Запрошено</Badge>
                        <p class="mb-1 mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{{ item.name }}</p>
                        <p class="mb-1 block text-sm font-medium text-gray-500 pointer-events-none">В наличии: {{ item.count }}</p>
                        <p class="mb-1 block text-sm font-medium text-gray-500 pointer-events-none">Место: {{ item.place }}</p>
                    </div>
                </li>
            </ul>
        </div>

        <Table
            v-else
            :fields="fields"
            :items="products"
            @delete="(id) => dropProduct(id)"
            @edit="(id) => redirectToForm(id)"
        >
            <template #td-name="{ value, item: {id} }" >
                <Link @click="() => select(id)">{{ value }} </Link>
            </template>

            <template #td-count="{ value }" >
                {{ value }}
            </template>

            <template #td-place="{ value }" >
                {{ value }}
            </template>
        </Table>

        <pixel />
    </div>
</template>
