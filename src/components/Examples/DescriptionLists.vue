<script setup>
import {DescriptionList, DescriptionListItems, DescriptionListItem} from './../UI/DescriptionList/index.js';
</script>

<template>
  <h2 class="mt-5 mb-1 font-bold text-xl">Списки</h2>
  <DescriptionList title="О сотруднике" subtitle="Информация">
    <DescriptionListItems>
      <DescriptionListItem label="ФИО" value="Василий Пупкин" />
      <DescriptionListItem label="Почта" value="email@example.com" />
      <DescriptionListItem label="Телефон" value="+7 900 999-99-99" />
      <DescriptionListItem label="Должность" value="Программист" />
      <DescriptionListItem label="Описание" value="Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu." />
      <DescriptionListItem label="Вложения">
        <ul role="list" class="border border-gray-200 rounded-md divide-y divide-gray-200">
          <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
            <div class="w-0 flex-1 flex items-center">
                <span class="ml-2 flex-1 w-0 truncate">
                    resume_back_end_developer.pdf
                  </span>
            </div>
            <div class="ml-4 flex-shrink-0">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                Скачать
              </a>
            </div>
          </li>
          <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
            <div class="w-0 flex-1 flex items-center">
                <span class="ml-2 flex-1 w-0 truncate">
                    coverletter_back_end_developer.pdf
                  </span>
            </div>
            <div class="ml-4 flex-shrink-0">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                Скачать
              </a>
            </div>
          </li>
        </ul>
      </DescriptionListItem>
    </DescriptionListItems>
  </DescriptionList>

  <DescriptionList title="О сотруднике" subtitle="Информация" class="mt-5" type="columns">
    <DescriptionListItems type="columns">
      <DescriptionListItem label="ФИО" value="Василий Пупкин" type="columns" />
      <DescriptionListItem label="Почта" value="email@example.com" type="columns" />
      <DescriptionListItem label="Телефон" value="+7 900 999-99-99" type="columns" />
      <DescriptionListItem label="Должность" value="Программист" type="columns" />
      <DescriptionListItem label="Описание" type="columns" columns="2" value="Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu." />
      <DescriptionListItem label="Вложения" type="columns" columns="2">
        <ul role="list" class="border border-gray-200 rounded-md divide-y divide-gray-200">
          <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
            <div class="w-0 flex-1 flex items-center">
                <span class="ml-2 flex-1 w-0 truncate">
                    resume_back_end_developer.pdf
                  </span>
            </div>
            <div class="ml-4 flex-shrink-0">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                Скачать
              </a>
            </div>
          </li>
          <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
            <div class="w-0 flex-1 flex items-center">
                <span class="ml-2 flex-1 w-0 truncate">
                    coverletter_back_end_developer.pdf
                  </span>
            </div>
            <div class="ml-4 flex-shrink-0">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                Скачать
              </a>
            </div>
          </li>
        </ul>
      </DescriptionListItem>
    </DescriptionListItems>
  </DescriptionList>
</template>

<style scoped>

</style>
