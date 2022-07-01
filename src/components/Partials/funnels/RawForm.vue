<script setup>
import Input from '@/UI/Input.vue';
import form from '~/services/funnels';

const { pipeline, atMounted } = form();

await atMounted();

</script>

<template>
    <div>
        <Input label="Название" v-model="pipeline.name" :required="true" />
        <Input label="Тип" v-model="pipeline.type" :required="true" />
    </div>
</template>
