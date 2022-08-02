<script setup>
import Input from '@/UI/Input.vue';
import TextArea from '@/UI/TextArea.vue';
import UploadImage from '@/UI/UploadImage.vue';
import Select from '@/UI/Select.vue';
import form from '~/services/storage/products/form';
import producerStore from '~/store/storage/producers';

const { load, options } = producerStore;

const { isValideAvatarFileSize, log, avatar, product, v$, atMountedProductForm, isUploadingAvatar, } = form();

await Promise.all([load(), atMountedProductForm()]);

</script>

<template>
    <div class="flex flex-col lg:flex-row">
        <div class="lg:w-96">
            <UploadImage
                :rounded="false"
                @selected="log"
                :image="avatar"
                label="Фото"
                class="mb-3"
                :full="true"
                :error="!isValideAvatarFileSize ? 'Размер фото не должен превышать 10000 Кб' : ''"
                :loader="isUploadingAvatar"
            />
        </div>

        <div class="flex-grow space-y-6">
            <div class="grid grid-cols-12 gap-6">
                <div class="col-span-12 sm:col-span-3">
                    <Input
                        label="Название"
                        v-model="product.name"
                        :required="true"
                        :error="v$.name.$errors[0]?.$message"
                        @blured="v$.name.$touch"
                    />
                </div>

                <div class="col-span-12 sm:col-span-3">
                    <Input
                        label="Количество"
                        type="number"
                        v-model="product.count"
                        :required="true"
                        :error="v$.count.$errors[0]?.$message"
                        @blured="v$.count.$touch"
                    />
                </div>

                <div class="col-span-12 sm:col-span-3">
                    <Input label="Артикул" v-model="product.sku" />
                </div>

                <div class="col-span-12 sm:col-span-3">
                    <Input label="Место на складе" v-model="product.place" />
                </div>

                <div class="col-span-12 sm:col-span-4">
                    <Select label="Производитель" :options="options" v-model="product.producer_id" />
                </div>

                <div class="col-span-12 sm:col-span-4">
                    <Input label="Стоимость в закупке" type="number" v-model="product.input_sum" />
                </div>

                <div class="col-span-12 sm:col-span-4">
                    <Input label="Стоимость для реализации" type="number" v-model="product.output_sum" />
                </div>

                <div class="col-span-12 sm:col-span-12">
                    <TextArea label="Описание" rows="5" v-model="product.description" />
                </div>
            </div>
        </div>
    </div>
</template>
