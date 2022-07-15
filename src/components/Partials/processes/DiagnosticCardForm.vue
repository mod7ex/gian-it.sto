<script setup>
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import TextArea from '@/UI/TextArea.vue';
import Select from '@/UI/Select.vue';
import service from '~/services/processes/diagnostic-card-form';
import departmentStore from '~/store/departments';

const { question, atMounted, v$ } = service();

const { options: departmentOptions } = departmentStore;

const addOption = () => {question.options.push('');};

const addParam = () => {question.params.push({ options: [''] });};

const addParamOptions = (i) => { question.params[i].options.push(''); };

await atMounted();

</script>

<template>
    <div class="grid grid-cols-12 gap-6">
        <v-can ability="crud departments" class="col-span-6 sm:col-span-6">
          <Select
            label="Отделение"
            v-model="question.department_id"
            :options="departmentOptions"
          />
        </v-can>

        <div class="col-span-12 grid grid-cols-12 gap-3 rounded-md bg-gray-50 p-3">
            <div class="col-span-6 sm:col-span-6">
                <Input
                    label="Главная проблема"
                    v-model="question.name"
                    :required="true"
                    :error="v$.name.$errors[0]?.$message"
                    @blured="v$.name.$touch"
                />
            </div>

            <div class="col-span-12">
                <Button size="xs" class="mb-2" @click="addOption" >Добавить</Button>
                <div class="grid grid-cols-12 gap-3">
                    <Input :label="`Вариант ${i+1}`" v-for="(item,i) in question.options" :key="'option-'+i" v-model="question.options[i]" class="col-span-3 sm:col-span-3" />
                </div>
            </div>
        </div>

        <div class="col-span-12 border-t border-gray-300"></div>

        <div class="col-span-12">
            <Button class="mb-4" @click="addParam" >Добавить параметр</Button>
            <div v-for="(item,i) in question.params" :key="'param-'+i" class="my-5 p-3 rounded-md grid grid-cols-12 gap-3 bg-gray-100">
            <!-- <div v-for="(item,i) in question.params" :key="'param-'+i" class="py-5 border-t border-dashed border-gray-400"> -->
                <Input label="Название параметра" v-model="question.params[i].title" class="col-span-6" />
                <div class="col-span-12">
                    <Button size="xs" class="mb-2" @click="() => addParamOptions(i)" >Добавить опцию</Button>
                    <div class="grid grid-cols-12 gap-3">
                        <Input :label="`Вариант ${j+1}`" v-for="(item,j) in question.params[i].options" :key="'pr-option-'+j" v-model="question.params[i].options[j]" class="col-span-3 sm:col-span-3" />
                    </div>
                </div>
            </div>
        </div>

        <div class="col-span-12 border-t border-gray-300"></div>

        <div class="col-span-12 grid grid-cols-12 gap-3">
            <Input label="Название комментария" v-model="question.comment.title" class="col-span-6" />
            <TextArea class="col-span-12 mt-2" label="Содержание комментария" v-model="question.comment.content" />
        </div>

        <div class="col-span-12 border-t border-gray-300"></div>

        <TextArea class="col-span-12 mt-2" label="Примечание" v-model="question.note" />
    </div>
</template>
