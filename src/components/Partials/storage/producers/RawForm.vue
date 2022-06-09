<script setup>
import Input from '@/UI/Input.vue';
import form from '~/services/storage/producers/form';

const { producer, atMountedProducerForm } = form();

await atMountedProducerForm();

</script>

<template>
    <div>
        <Input label="Название" v-model="producer.name" :required="true" />
    </div>
</template>
