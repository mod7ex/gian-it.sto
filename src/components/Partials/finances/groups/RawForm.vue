<script setup>
import Input from '@/UI/Input.vue';
import form from '~/services/finances/groups/form';

const { financeGroup, atMountedFinanceGroup, v$ } = form();

await atMountedFinanceGroup();

</script>

<template>
    <div>
        <Input
            label="Hазвание финансовая группа"
            v-model="financeGroup.name"
            :required="true"
            :error="v$.name.$errors[0]?.$message"
            @blured="v$.name.$touch"
        />
    </div>
</template>
