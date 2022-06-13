<script setup>
import { XIcon } from '@heroicons/vue/outline';
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import TextArea from '@/UI/TextArea.vue';
import service from '~/services/clients/clientForm.js';
import Button from '@/UI/Button.vue';
import CarsTable from '~/components/Layout/cars/CarsTable.vue';
import departmentStore from '~/store/departments';
import cityStore from '~/store/cities';

const { options: departmentOptions } = departmentStore;
const { options: cityOptions, load } = cityStore;

const { clientFields, v$, atMountedClientForm, addItem } = service();

await (async ()=>{
    await load();
    await atMountedClientForm();
})();

const addMail = addItem('emails');
const addPhone = addItem('phones');

</script>

<template>
    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-4">
            <Input
                label="Фамилия"
                v-model="clientFields.surname"
                :required="true"
                :error="v$.surname.$errors[0]?.$message"
                @blured="v$.surname.$touch"
            />
        </div>

        <div class="col-span-12 sm:col-span-4">
            <Input
                label="Имя"
                v-model="clientFields.name"
                :required="true"
                :error="v$.name.$errors[0]?.$message"
                @blured="v$.name.$touch"
            />
        </div>

        <div class="col-span-12 sm:col-span-4">
            <Input label="Отчество" v-model="clientFields.middle_name"/>
        </div>

        <div class="col-span-12 sm:col-span-4">
            <Select
                label="Пол"
                v-model="clientFields.gender"
                :options="[{value: 'male', label: 'Мужчина'}, {value: 'female', label: 'Женщина'}]"
            />
        </div>

        <div class="col-span-12 sm:col-span-4 ">
            <Input label="День рождения" type="date" v-model="clientFields.born_at"/>
        </div>

        <div class="col-span-12 sm:col-span-4 ">
            <Input label="Паспорт" v-model="clientFields.passport" />
            <!-- <Input label="Паспорт" mask="#### #######" v-model="clientFields.passport" /> -->
        </div>

        <div class="col-span-12 sm:col-span-3 ">
            <Select label="Город" :options="cityOptions" v-model="clientFields.city_id" />
        </div>

        <v-can ability="crud departments" class="col-span-12 sm:col-span-3">
            <Select
                label="Отделение"
                :options="departmentOptions"
                v-model="clientFields.department_id"
                :required="true"
                :error="v$.department_id.$errors[0]?.$message"
                @blured="v$.department_id.$touch"
            />
        </v-can>

        <div class="col-span-12 sm:col-span-6">
            <Input label="Адрес" v-model="clientFields.address" />
        </div>

        <div class="col-span-12 sm:col-span-12">
            <div class="flex flex-row gap-4 flex-wrap items-center">
                <div v-for="(phone, i) in clientFields.phones" class="flex items-center" :key="`phones-${i}`">
                    <Input
                        :label="`Телефон ${i + 1}`"
                        mask="+7 ### ###-##-##"
                        v-model="clientFields.phones[i]"
                        :error="clientFields.phones.invalide == i ?  v$.phones.$errors[0]?.$message : ''"
                        @input="v$.phones.$touch"
                        @focused="clientFields.phones.active = i"
                    />
                    <Button @click="clientFields.phones.splice(i, 1)" color="red" class="ml-2" v-if="i > 0">
                        <XIcon class="w-5 h-5" />
                    </Button>
                </div>
                <Button @click="() => addPhone()" type="secondary">Ещё</Button>
            </div>
        </div>

        <div class="col-span-12 sm:col-span-12">
            <div class="flex flex-row gap-4 flex-wrap items-center">
                <div v-for="(email, i) in clientFields.emails" class="flex items-center" :key="`emails-${i}`">
                    <Input
                        :label="`Почта ${i + 1}`"
                        type="email"
                        v-model="clientFields.emails[i]"
                        :error="clientFields.emails.invalide == i ?  v$.emails.$errors[0]?.$message : ''"
                        @input="v$.emails.$touch"
                        @focused="clientFields.emails.active = i"
                    />
                    <Button @click="clientFields.emails.splice(i, 1)" color="red" class="ml-2" v-if="i > 0">
                        <XIcon class="w-5 h-5" />
                    </Button>
                </div>
                <Button @click="() => addMail()" type="secondary">Ещё</Button>
            </div>
        </div>

        <div class="col-span-12 sm:col-span-12">
            <TextArea label="Примечания" rows="5" v-model="clientFields.notes" />
        </div>

        <div class="col-span-12 sm:col-span-12" v-if="clientFields.id">
            <div class="flex justify-between items-center my-6">
                <span>Автомобили</span>
                <Button color="blue" :link="{name: 'CarForm', query: { client_id: clientFields.id }}" >Добавить</Button>
            </div>
            <cars-table :cars="clientFields.cars" :showOwner="false" />
        </div>
    </div>
</template>
