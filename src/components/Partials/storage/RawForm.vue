<script setup>
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import form from '~/services/storage/form';
import cityStore from '~/store/cities';

const { options, load } = cityStore;

const { storage, atMountedStorageForm, v$ } = form();

await (async () => {
  await load();
  await atMountedStorageForm();
})();

</script>

<template>
    <div>
        <Input
          label="Название процесса"
          v-model="storage.name"
          :required="true"
          :error="v$.name.$errors[0]?.$message"
          @blured="v$.name.$touch"
          class="mb-3"
        />
        <Select 
          label="Город"
          v-model="storage.city_id" 
          :required="true" 
          :options="options" 
          :error="v$.city_id.$errors[0]?.$message"
          @blured="v$.city_id.$touch"
        />
    </div>
</template>
