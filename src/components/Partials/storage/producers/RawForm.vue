<script setup>
import Input from '@/UI/Input.vue';
import form from '~/services/storage/producers/form';

const { producer, atMountedProducerForm, v$ } = form();

await atMountedProducerForm();

</script>

<template>
    <div>
        <Input
            label="Название"
            v-model="producer.name"
            :required="true"
            :error="v$.name.$errors[0]?.$message"
            @blured="v$.name.$touch"
        />
    </div>
</template>
