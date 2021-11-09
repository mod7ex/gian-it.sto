<script setup>
import {ref} from 'vue';
import _ from 'lodash';
import OfficeLayout from '@/Layout/Office.vue';
import Input from '@/UI/Input.vue';
import Link from '@/UI/Link.vue';
import Button from '@/UI/Button.vue';
import Badge from '@/UI/Badge.vue';
import Avatar from '@/UI/Avatar.vue';
import StackedListWithHeadings from '@/UI/StackedListWithHeadings.vue';
import {SearchIcon, FilterIcon, PhoneIcon, UserGroupIcon,} from '@heroicons/vue/solid';
import {PlusCircleIcon, CogIcon} from '@heroicons/vue/outline';
import {DescriptionList, DescriptionListItems, DescriptionListItem} from './../UI/DescriptionList/index.js';

const selected = ref(false);
const directory = ref({
  A: [
    {
      id: 1,
      title: 'Leslie Abbott',
      subtitle: 'Co-Founder / CEO',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 2,
      title: 'Hector Adams',
      subtitle: 'VP, Marketing',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 3,
      title: 'Blake Alexander',
      subtitle: 'Account Coordinator',
      image:
        'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 4,
      title: 'Fabricio Andrews',
      subtitle: 'Senior Art Director',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  B: [
    {
      id: 5,
      title: 'Angela Beaver',
      subtitle: 'Chief Strategy Officer',
      image:
        'https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 6,
      title: 'Yvette Blanchard',
      subtitle: 'Studio Artist',
      image:
        'https://images.unsplash.com/photo-1506980595904-70325b7fdd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 7,
      title: 'Lawrence Brooks',
      subtitle: 'Content Specialist',
      image:
        'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  C: [
    {
      id: 8,
      title: 'Jeffrey Clark',
      subtitle: 'Senior Art Director',
      image:
        'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 9,
      title: 'Kathryn Cooper',
      subtitle: 'Associate Creative Director',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  E: [
    {
      id: 10,
      title: 'Alicia Edwards',
      subtitle: 'Junior Copywriter',
      image:
        'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 11,
      title: 'Benjamin Emerson',
      subtitle: 'Director, Print Operations',
      image:
        'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 12,
      title: 'Jillian Erics',
      subtitle: 'Designer',
      image:
        'https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 13,
      title: 'Chelsea Evans',
      subtitle: 'Human Resources Manager',
      image:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  G: [
    {
      id: 14,
      title: 'Michael Gillard',
      subtitle: 'Co-Founder / CTO',
      image:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 15,
      title: 'Dries Giuessepe',
      subtitle: 'Manager, Business Relations',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  M: [
    {
      id: 16,
      title: 'Jenny Harrison',
      subtitle: 'Studio Artist',
      image:
        'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 17,
      title: 'Lindsay Hatley',
      subtitle: 'Front-end Developer',
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 18,
      title: 'Anna Hill',
      subtitle: 'Partner, Creative',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  S: [
    {
      id: 19,
      title: 'Courtney Samuels',
      subtitle: 'Designer',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 20,
      title: 'Tom Simpson',
      subtitle: 'Director, Product Development',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  T: [
    {
      id: 21,
      title: 'Floyd Thompson',
      subtitle: 'Principal Designer',
      image:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 22,
      title: 'Leonard Timmons',
      subtitle: 'Senior Designer',
      image:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 23,
      title: 'Whitney Trudeau',
      subtitle: 'Copywriter',
      image:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  W: [
    {
      id: 24,
      title: 'Kristin Watson',
      subtitle: 'VP, Human Resources',
      image:
        'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 25,
      title: 'Emily Wilson',
      subtitle: 'VP, User Experience',
      image:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  Y: [
    {
      id: 26,
      title: 'Emma Young',
      subtitle: 'Senior Front-end Developer',
      image:
        'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
});
const search = ref('');
</script>

<template>
    <OfficeLayout title="Клиенты" main-classes="flex flex-col min-w-0 flex-1 md:overflow-hidden overflow-auto">
      <template #actions>
        <Button type="secondary" link="/cars">
          <CogIcon class="w-5 h-5 mr-1" />
          Автомобили
        </Button>

        <Button color="blue" link="/clients/create">
          <PlusCircleIcon class="w-5 h-5 mr-1"/>
          Создать
        </Button>
      </template>

      <template #content>
        <div class="flex-1 relative z-0 flex md:overflow-hidden overflow-visible flex-col md:flex-row">
          <div class="order-2 md:order-first md:flex md:flex-col flex-shrink-0 w-96 border-r border-gray-200">
            <div class="px-6 pt-6 pb-4">
              <h2 class="text-lg font-medium text-gray-900">Картотека</h2>

              <p class="mt-1 text-sm text-gray-600">
                Искать среди 1008 клиентов
              </p>

              <div class="mt-6 flex space-x-4">
                <Input placeholder="Поиск" class="flex-grow" :icon="SearchIcon" v-model="search" />

                <Button type="secondary">
                  <FilterIcon class="w-5 h-5 text-gray-400" />
                </Button>
              </div>
            </div>

            <StackedListWithHeadings class="flex-1 min-h-0 overflow-y-auto" :items="directory" @select="selected = true" />
          </div>

          <div class="flex flex-col items-center justify-center w-full" v-if="!selected">
            <UserGroupIcon class="h-12 w-12 mx-auto text-gray-600" />

            <span class="mt-2 block text-sm font-medium text-gray-900">
              Выберите клиента
            </span>
          </div>


          <div class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last" v-if="selected">
            <article>
              <!-- Profile header -->
              <div class="border-b border-gray-200 flex justify-between px-4 sm:px-6 py-3 lg:items-center items-baseline lg:flex-row flex-col gap-2">
                <h1 class="text-2xl font-bold text-gray-900 truncate">
                  Абдулович Василий
                </h1>

                <Button type="secondary" size="sm">
                  <PhoneIcon class="mr-2 h-5 w-5 text-gray-400" />
                  Позвонить
                </Button>
              </div>

              <!-- Description list -->
              <DescriptionList :bordered="false" class="mt-5" type="columns">
                <DescriptionListItems type="columns">
                  <DescriptionListItem label="Телефон" value="+7 900 999-99-99" type="columns" />
                  <DescriptionListItem label="Почта" value="email@example.com" type="columns" />
                  <DescriptionListItem label="Город" value="Ростов-на-Дону" type="columns" />
                  <DescriptionListItem label="Паспорт" value="1234 123456" type="columns" />
                  <DescriptionListItem label="Заказов на" value="146 000 ₽" type="columns" />
                  <DescriptionListItem label="Дата рождения" value="11.06.1989" type="columns" />
                  <DescriptionListItem label="О клиенте" type="columns" columns="2" value="Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu." />
                  <DescriptionListItem label="Заказ-наряды" type="columns" columns="2">
                    <template #value>
                      <div class="grid grid-cols-12 mt-1 gap-2">
                        <div class="sm:col-span-6 col-span-12 shadow border px-4 py-2 rounded">
                          <div class="flex justify-between items-center">
                            <div class="text-sm mb-2 font-bold">
                              <Link>
                                Заказ наряд #0001
                              </Link>
                            </div>

                            <Badge color="green">
                              Завершён
                            </Badge>
                          </div>
                          <Avatar
                            class="mb-1"
                            image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            title="Тим Кук"
                            subtitle="Ответственный"
                          />
                        </div>
                        <div class="sm:col-span-6 col-span-12 shadow border px-4 py-2 rounded">
                          <div class="flex justify-between items-center">
                            <div class="text-sm mb-2 font-bold">
                              <Link>
                                Заказ наряд #0002
                              </Link>
                            </div>

                            <Badge color="yellow">
                              В работе
                            </Badge>
                          </div>
                          <Avatar
                            class="mb-1"
                            image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            title="Тим Кук"
                            subtitle="Ответственный"
                          />
                        </div>
                      </div>
                    </template>
                  </DescriptionListItem>
                </DescriptionListItems>
              </DescriptionList>
            </article>
          </div>
        </div>
      </template>
    </OfficeLayout>
</template>

<style scoped>

</style>
