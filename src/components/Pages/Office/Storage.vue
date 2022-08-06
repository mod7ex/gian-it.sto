<script setup>
import { ArrowLeftIcon, ViewListIcon, ViewGridIcon, PlusCircleIcon } from '@heroicons/vue/outline';
import { onMounted, ref, onScopeDispose } from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import ButtonGroup from '@/UI/ButtonGroup.vue';
import service from '~/services/storage/products';
import ProductsList from '@/Partials/storage/products/List.vue';
import Preview from '@/Partials/storage/products/Preview.vue';
import useSuspense from '~/composables/useSuspense';
import store from '~/store/storage/products';
import $ from '~/helpers/fetch.js';
import useAppRouter from '~/composables/useAppRouter';

const { setAvailability, state } = store;

const suspenseArea = useSuspense();

const { fetchProducts, isThePage, clearMemo, selected } = service();
const { route } = useAppRouter();

const grid = ref(true);

const currentStorage = ref();

onMounted(async () => { currentStorage.value = isThePage.value ? 'Запрошенные запчасти' : (await $.storage(route.params.id))?.name; });

onScopeDispose(clearMemo);

</script>

<template>
    <OfficeLayout :title="currentStorage" main-classes="flex-1 flex flex-col overflow-hidden">

      <template #actions>
        <Button type="secondary" :link="{ name: 'Storages' }">
          <ArrowLeftIcon class="w-5 h-5 mr-1"/>Назад
        </Button>
<!--
        <Button color="blue">
          <SaveAsIcon class="w-5 h-5 mr-1"/>Приход
        </Button>
-->
        <Button v-if="!isThePage" color="blue" :link="{ name: 'StorageForm', params: { id: route.params?.id } }">
          <PlusCircleIcon class="w-5 h-5 mr-1"/>Добавить позицию
        </Button>
      </template>

      <template #content>
        <div class="flex-1 flex items-stretch overflow-hidden">

          <div class="flex-1 overflow-y-auto">

            <div class="justify-between flex px-3 lg:px-5 mt-4">
              <div class="flex">
                <ButtonGroup :key="state.inStock ? 'inStock' : 'notInStock'">
                  <Button
                    :type="state.inStock ? 'primary' : 'secondary'"
                    @click="() => setAvailability(true)"
                    group="left"
                  >В наличии
                  </Button>

                  <Button
                    :type="state.inStock ? 'secondary' : 'primary'"
                    @click="() => setAvailability()"
                    group="right"
                  >Нет в наличии
                  </Button>
                </ButtonGroup>
              </div>

              <div class="flex">
                <ButtonGroup :key="grid ? 'grid' : 'list'">
                  <Button
                    :type="grid ? 'primary' : 'secondary'"
                    @click="grid = true"
                    group="left"
                  ><ViewGridIcon class="w-5 h-5 mr-1"/>
                  </Button>

                  <Button
                    :type="grid ? 'secondary' : 'primary'"
                    @click="grid = false"
                    group="right"
                  ><ViewListIcon class="w-5 h-5 mr-1"/>
                  </Button>
                </ButtonGroup>
              </div>
            </div>

            <suspense-area loadingMsg="получение товаров..." >
              <products-list :grid="grid" @bottom-touched="()=>fetchProducts()" />
            </suspense-area>

          </div>

          <preview v-if="selected" :key="`${isThePage ? 'on' : 'off'}`" />

        </div>
      </template>

    </OfficeLayout>
</template>
