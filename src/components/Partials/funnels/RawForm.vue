<script setup>
import Input from '@/UI/Input.vue';
import form from '~/services/funnels';

const { pipeline, atMounted, v$ } = form();

await atMounted();

</script>

<template>
    <div>
        <Input
            label="Название"
            v-model="pipeline.name"
            :required="true"
            :error="v$.name.$errors[0]?.$message"
            @blured="v$.name.$touch"
        />
    </div>
</template>
