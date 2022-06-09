<script setup>
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import form from '~/services/storage/form';
import cityStore from '~/store/cities';

const { options, load } = cityStore;

const { storage, atMountedStorageForm } = form();

await (async () => {
  await load();
  await atMountedStorageForm();
})();

</script>

<template>
    <div>
        <Input label="Название процесса" v-model="storage.name" :required="true" />
        <Select label="Город" v-model="storage.city_id" :required="true" :options="options" />
    </div>
</template>
