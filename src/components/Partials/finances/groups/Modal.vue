<script setup>
import Button from '@/UI/Button.vue';
import DialogModal from '@/UI/DialogModal.vue';
import Spinner from '@/UI/Spinner.vue';
import form from '~/services/finances/groups/form';
import RawForm from '~/components/Partials/finances/groups/RawForm.vue';

import useSuspense from '~/composables/useSuspense.js';

const SuspensRawForm = useSuspense(RawForm);

const { saveForm, loading, errorMsg, success, ready, isModalUp, isUpdate } = form();

defineEmits(['close']);

</script>

<template>
    <dialog-modal :title="`${isUpdate ? 'Oбновляете' : 'Создайте'} финансовая группа`" :open="isModalUp">
        <template v-slot:dialog-inner>
            <div class="mt-6 mb-6">

                <p v-if="ready && !success" class="text-red-700 text-sm text-center mb-6">
                    {{ errorMsg ?? 'Что-то пошло не так !' }}
                </p>

                <form class="space-y-6">
                    <SuspensRawForm loadingMsg="setting up the form..." />

                    <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">

                        <Button :disabled="loading" @click.prevent="saveForm" :class="{ 'cursor-not-allowed': loading, 'opacity-60': loading }" color="blue" class="w-full inline-flex justify-center  px-4 py-2 sm:col-start-2" >
                            <Spinner  v-if="loading" />
                            <span v-else>Сохранить</span>
                        </Button>

                        <Button color="gray" @click.prevent="$emit('close')" class="mt-3 w-full inline-flex justify-center px-4 py-2 sm:mt-0 sm:col-start-1">Закрыть</Button>
                    </div>
                </form>
            </div>
        </template>
    </dialog-modal>
</template>
