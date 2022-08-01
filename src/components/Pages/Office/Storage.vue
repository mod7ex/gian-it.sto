<script setup>
import {
  // PlusCircleIcon,
  // SaveAsIcon,
  ArrowLeftIcon,
  ViewListIcon,
  ViewGridIcon,
} from '@heroicons/vue/outline';
import { ref } from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import ButtonGroup from '@/UI/ButtonGroup.vue';
import service from '~/services/storage/products';
import ProductsList from '@/Partials/storage/products/List.vue';
import Preview from '@/Partials/storage/products/Preview.vue';
import useSuspense from '~/composables/useSuspense';
import store from '~/store/storage/products';
import useAppRouter from '~/composables/useAppRouter';

const { setAvailability, state, selected, selectedProduct } = store;

const suspenseArea = useSuspense();

const { fetchProducts, filter } = service();
const { route } = useAppRouter();

const grid = ref(true);

</script>

<template>
    <OfficeLayout :title="`${route.params.name ?? '(Unknown)'}`" main-classes="flex-1 flex flex-col overflow-hidden">

      <template #actions>
        <Button type="secondary" :link="{ name: 'Storages' }">
          <ArrowLeftIcon class="w-5 h-5 mr-1"/>Назад
        </Button>
<!--
        <Button color="blue">
          <SaveAsIcon class="w-5 h-5 mr-1"/>Приход
        </Button>
-->
        <!--
          <Button color="blue" :link="{ name: 'StorageForm' }">
            <PlusCircleIcon class="w-5 h-5 mr-1"/>Добавить позицию
          </Button>
        -->
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

          <preview v-if="selected" :key="selectedProduct.id ?? 'product-preview'" />

        </div>
      </template>

    </OfficeLayout>
</template>
