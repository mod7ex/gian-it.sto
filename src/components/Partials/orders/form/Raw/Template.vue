<script setup>
import Upload from '@/UI/Upload.vue';
import Input from '@/UI/Input.vue';
import service from '~/services/orders/template';

const { log, template } = service();

</script>

<template>
  <div>
      <Input label="Hазвание" type="text" v-model="template.name" />
      <Upload :multiple="false" @selected="log" accept=".html" >
        <template #format>только html файлы</template>
      </Upload>
  </div>
</template>
