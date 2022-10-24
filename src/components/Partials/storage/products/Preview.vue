<script setup>
import { PencilIcon as PencilSolidIcon, ArrowNarrowLeftIcon, CheckIcon, RefreshIcon, PlusIcon } from '@heroicons/vue/solid';
import { onMounted, ref, watch, computed } from 'vue';
import Button from '@/UI/Button.vue';
import Avatar from '@/UI/Avatar.vue';
import TextArea from '@/UI/TextArea.vue';
import store from '~/store/storage/products';
import form from '~/services/storage/products/form';
import service from '~/services/storage/products';
import save from '~/helpers/save';
import { generateShapedIdfromId } from '~/helpers';
import assignService from '~/services/storage/products/assign-product';

const { redirectToForm, isThePage, ping, key, replaceInRequests, target } = service();

const { render } = assignService();

const requests = computed(() => target.value?.product_requests?.filter(({ status }) => status === 'wait'));

const { dropProduct, defaults } = form();
const { select, replace } = store;

const editMode = ref(false);
const description = ref('');
const isUpdating = ref(false);

const saveDescription = async () => {
  if (description.value) {
    if (description.value === target.value.description) return true;
    isUpdating.value = true;
    try {
      const product = { ...target.value };
      product.description = description.value;
      const { data, success } = await save.product(product, null, true);
      success && (isThePage.value ? replaceInRequests : replace)(data?.product);
      return success;
    } finally {
      isUpdating.value = false;
    }
  } else {
    return true;
  }
};

const reset = () => { description.value = target.value.description; };

watch(target, reset);

const close = () => { editMode.value = false; };

const edit = async () => {
  if (isUpdating.value) return;

  if (editMode.value) {
    const success = await saveDescription();
    success && close();
    return;
  }

  editMode.value = true;
  reset();
};

onMounted(() => { close(); reset(); });

</script>

<template>
    <aside class="hidden w-96 bg-white px-8 border-l border-gray-200 overflow-y-auto lg:block">

        <div>
            <button @click="()=>select()" type="button" class="my-4 mx-auto bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <ArrowNarrowLeftIcon class="h-5 w-5" />
            </button>
        </div>

        <div class="pb-16 space-y-6">
            <div>
                <div class="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                    <img :src="target.photo ?? defaults.photo" class="object-cover">
                </div>
                <div class="mt-4 flex items-start justify-between">
                    <div>
                        <h2 class="text-lg font-medium text-gray-900">{{ target.name }}</h2>
                        <p :key="target.count" class="text-sm font-medium text-gray-500">В наличии: {{ target.count }} шт</p>
                        <p class="text-sm font-medium text-gray-500">Место: {{ target.place }}</p>
                    </div>
                </div>
            </div>

            <div>
                <h3 class="font-medium text-gray-900">Информация</h3>
                <dl class="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Добавил</dt>
                        <dd class="text-gray-900">{{ `${target.user?.name ?? ''} ${target.user?.surname ?? ''}` }}</dd>
                    </div>

                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Дата добавления</dt>
                        <dd class="text-gray-900">{{ target.created_at?.split(' ')[0] }}</dd>
                    </div>

                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Дата изменения</dt>
                        <dd class="text-gray-900">{{ target.updated_at?.split(' ')[0] }}</dd>
                    </div>

                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Стоимость закупки</dt>
                        <dd class="text-gray-900">{{ target.input_sum }} ₽</dd>
                    </div>

                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Стоимость продажи</dt>
                        <dd class="text-gray-900">{{ target.output_sum }} ₽</dd>
                    </div>

                    <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Артикул</dt>
                        <dd class="text-gray-900">{{ target.sku }}</dd>
                    </div>
                </dl>
            </div>

            <div>
                <h3 class="font-medium text-gray-900">Описание</h3>
                <div>
                    <div class="mt-2 flex items-center justify-between mb-2">
                        <p class="text-sm text-gray-500 italic ml-1" :key="target.description">
                            {{ description ? `${description.substr(0, 23)}...` : 'Добавить описание' }}
                        </p>

                        <div class=" flex items-center justify-end">
                            <button v-if="editMode" @click="reset" type="button" class="mr-2 bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <RefreshIcon class="h-5 w-5" />
                            </button>

                            <button v-if="!isUpdating" @click="() => edit()" type="button" class="bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <CheckIcon class="h-5 w-5" v-if="editMode" />
                                <PencilSolidIcon class="h-5 w-5" v-else />
                            </button>
                        </div>
                    </div>
                    <TextArea
                        v-if="editMode"
                        rows="7"
                        v-model="description"
                    ></TextArea>
                </div>
            </div>
<!-- -->
            <div>
                <h3 class="font-medium text-gray-900" v-if="requests?.length">Запросили</h3>
                <ul
                    class="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200"
                    v-if="requests?.length"
                    :key="`${key}-${requests.length}-requests`"
                >
                    <li v-for="request in requests" :key="request.id" class="py-3">
                        <div class="mb-2 flex justify-between items-center">
                            <Avatar
                                :image="request?.user?.avatar"
                                :title="`${request?.user?.name ?? ''} ${request?.user?.surname ?? ''}`"
                                :subtitle="request?.user?.office_position"
                            />

                            <button @click="() => ping(request, target?.id)" type="button" class="ml-6 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Выдать</button>
                        </div>
                        <div class="flex justify-between items-center mb-2">
                            <p class="text-xs">Заказ-наряд: {{ request?.order_id != null ? `#${generateShapedIdfromId(request?.order_id)}` : '' }}</p>
                            <p class="text-xs">Kоличество: {{ request?.count }}</p>
                        </div>
                        <p class="text-xs" v-if="request?.sum" >Цена продажи: {{ request?.sum }} &#8381;</p>
                    </li>
                </ul>

                <div class="py-2 flex justify-between items-center">
                    <button @click="() => render(target?.id)" type="button" class="flex-grow group -ml-1 bg-white p-1 rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <span class="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                            <PlusIcon class="h-5 w-5" />
                        </span>

                        <span class="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">Добавить выдачу</span>
                    </button>
                </div>
            </div>
<!-- -->
            <div class="flex justify-between">
                <Button color="blue" class="flex-1 justify-center" @click="() => redirectToForm(target.id, target)">Изменить</Button>
                <Button color="red" class="flex-1 ml-3 justify-center" @click="()=>dropProduct(target.id, isThePage)">Удалить</Button>
            </div>
        </div>
    </aside>
</template>

<style scoped>

textarea{ width: 100%; }

</style>
