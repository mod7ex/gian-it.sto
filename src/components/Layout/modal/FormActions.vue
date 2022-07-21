<script setup>
import Button from '@/UI/Button.vue';
import Spinner from '@/UI/Spinner.vue';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['close', 'submited']);

</script>

<template>
    <div class="mt-4 sm:mt-5 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
        <Button
            color="blue"
            :disabled="props.loading"
            @click.prevent="$emit('submited')"
            class="w-full inline-flex justify-center  px-4 py-2 sm:col-start-2"
            :class="{ 'cursor-not-allowed opacity-60': props.loading }"
        >
            <Spinner class="h-1" v-if="props.loading" />
            <span v-else>Сохранить</span>
        </Button>

        <Button
            color="gray"
            @click.prevent="$emit('close')"
            class="mt-3 w-full inline-flex justify-center px-4 py-2 sm:mt-0 sm:col-start-1"
        >Закрыть</Button>
    </div>
</template>
