<script setup>
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import TextArea from '@/UI/TextArea.vue';
import service from '~/services/processes/diagnostic-card-form';

const { question, atMounted, v$ } = service();

const add = () => {
  question.answers_and_recommendations.push({});
};

// await atMounted();

</script>

<template>
    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-12">
            <Input
                label="Вопрос"
                v-model="question.question"
                :required="true"
                :error="v$.question.$errors[0]?.$message"
                @blured="v$.question.$touch"
            />
        </div>

        <div class="col-span-12 sm:col-span-12">
            <div v-for="(item,i) in question.answers_and_recommendations" :key="'ques-'+i" class="py-5 border-t border-dashed border-gray-400">
                <Input label="Ответ" v-model="question.answers_and_recommendations[i].answer" />
                <TextArea label="Рекомендация" class="mt-2" v-model="question.answers_and_recommendations[i].recommendations" />
            </div>

            <Button class="mt-2" @click="add">Добавить</Button>
        </div>
    </div>
</template>
