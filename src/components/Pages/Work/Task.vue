<script setup>
import Layout from '@/Layout/Work.vue';
import Feeds from '@/UI/Feeds.vue';
import Comments from '@/Partials/Comments.vue';
import Button from '@/UI/Button.vue';
import {DescriptionList, DescriptionListItems, DescriptionListItem} from '@/UI/DescriptionList/index.js';
import {CheckIcon, ThumbUpIcon, UserIcon} from '@heroicons/vue/solid';
import {ArrowLeftIcon} from '@heroicons/vue/outline';

const timeline = [
  {
    id: 1,
    content: 'Поставлено',
    target: 'на Вася Пупкину',
    href: null,
    date: '20 сентября',
    datetime: '22.10.2020',
    icon: UserIcon,
    iconBackground: 'bg-gray-400',
  },
  {
    id: 2,
    content: 'Принято',
    target: 'Василием Пупкином',
    href: null,
    date: '21 сентября',
    datetime: '2020-09-22',
    icon: ThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 3,
    content: '1 этап завершён',
    target: 'Василием Пупкином',
    href: null,
    date: '22 сентября',
    datetime: '2020-09-28',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
  {
    id: 4,
    content: 'Изменено',
    target: 'руководителем',
    href: null,
    date: '25 сентября',
    datetime: '2020-09-30',
    icon: ThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 5,
    content: 'Завершено',
    target: 'Василием Пупкином',
    href: null,
    date: '1 октября',
    datetime: '2020-10-04',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
];
</script>

<template>
  <Layout title="Название задачи">
    <template #actions>
      <Button type="secondary" link="/w/tasks">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>
        К задачам
      </Button>
    </template>

    <div class="grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-3 ">
      <div class="space-y-6 lg:col-start-1 lg:col-span-2">
        <!-- Description list-->
        <section>
          <DescriptionList title="Название текущей задачи" subtitle="Название проекта" type="columns">
            <DescriptionListItems type="columns">
              <DescriptionListItem label="Автомобиль" value="Skoda Rapid" type="columns" />

              <DescriptionListItem label="Клиент" value="Пупкин Иван Иванович" type="columns" />

              <DescriptionListItem label="Задача" type="columns" columns="2">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
              </DescriptionListItem>

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
        </section>

        <Comments />
      </div>

      <section aria-labelledby="timeline-title" class="lg:col-start-3 lg:col-span-1">
        <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
          <h2 id="timeline-title" class="text-lg font-medium text-gray-900">Выполнено по текущему процессу</h2>

          <Feeds :items="timeline" class="mt-5" />

          <div class="mt-6 flex flex-col justify-stretch">
            <Button color="blue" class="justify-center">
              Завершить текущую задачу
            </Button>
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>

<style scoped>

</style>
