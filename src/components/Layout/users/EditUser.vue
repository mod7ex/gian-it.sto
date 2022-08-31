<script setup>
import List from '@/UI/List.vue';

const props = defineProps({
  settings_title: {
    type: String,
    default: 'Приватность',
  },

  settings_subtitle: {
    type: String,
    default: 'Здесь вы можете настроить поведение приложения - то что хотели бы не показывать',
  },

  items: {
    type: Array,
    default: [],
  },
});

const finalOptions = [
  {
    key: 'is_about_visible',
    title: 'О себе',
    subtitle: 'Скрыть информацию о себе для других сотрудников',
  },
  {
    key: 'is_born_at_visible',
    title: 'День рождения',
    subtitle: 'Скрыть день рождения для других сотрудников',
  },
  {
    key: 'is_active',
    title: 'Активный статус аккаунта',
    subtitle: 'выбрать статус активности аккаунта',
  },
  //   {
  //     key: 'is_active',
  //     title: 'Виден активный статус',
  //     subtitle: 'скрыть активный статус от других сотрудников',
  //   },
  ...props.items,
];

</script>

<template>
<form autocomplete="chrome-off">

    <div>
        <div class="flex flex-col lg:flex-row">
            <slot name="avatar"></slot>

            <div class="flex-grow space-y-6">
            <div class="grid grid-cols-12 gap-6">

                <div class="col-span-12 sm:col-span-4">
                    <slot name="middle_name"></slot>
                </div>

                <div class="col-span-12 sm:col-span-4">
                    <slot name="name"></slot>
                </div>

                <div class="col-span-12 sm:col-span-4">
                    <slot name="surname"></slot>
                </div>

                <div class="col-span-12 sm:col-span-6">
                    <slot name="email"></slot>
                </div>

                <div class="col-span-12 sm:col-span-6">
                    <slot name="phone"></slot>
                </div>

                <div class="col-span-12 sm:col-span-6">
                    <slot name="password"></slot>
                </div>

                <div class="col-span-12 sm:col-span-6">
                    <slot name="password_confirmation"></slot>
                </div>
            </div>
            </div>
        </div>

        <div class="grid grid-cols-12 gap-6 mt-5">
            <div class="col-span-12 sm:col-span-6">
                <slot name="born_at"></slot>
            </div>

            <div class="col-span-12 sm:col-span-6">
                <slot name="office_position"></slot>
            </div>

            <div class="col-span-12 sm:col-span-6">
                <slot name="role"></slot>
            </div>

            <v-can ability="crud departments" class="col-span-12 sm:col-span-6">
                <slot name="department"></slot>
            </v-can>

            <div class="col-span-12">
                <slot name="about"></slot>
            </div>
        </div>

        <div class="pt-6 divide-y divide-gray-200">
            <List class='mt-2' :items="finalOptions" :title="settings_title" :subtitle="settings_subtitle" >
                <template v-slot:right="{ item, index }">
                    <slot name="settings" :item="item" :index="index"></slot>
                </template>
            </List>
        </div>
    </div>
</form>
</template>
