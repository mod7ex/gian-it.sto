<script setup>
import { computed, ref, watch } from "vue";
import useApi from "~/composables/useApi.js";
import _ from "lodash";
import OfficeLayout from "@/Layout/Office.vue";
import Input from "@/UI/Input.vue";
import Link from "@/UI/Link.vue";
import Button from "@/UI/Button.vue";
import Badge from "@/UI/Badge.vue";
import Avatar from "@/UI/Avatar.vue";
import StackedListWithHeadings from "@/UI/StackedListWithHeadings.vue";
import {
  SearchIcon,
  FilterIcon,
  PhoneIcon,
  UserGroupIcon,
} from "@heroicons/vue/solid";
import { PlusCircleIcon } from "@heroicons/vue/outline";
import {
  DescriptionList,
  DescriptionListItems,
  DescriptionListItem,
} from "../../UI/DescriptionList";

const { axiosInstance } = useApi();

const selected = ref(false);
// const directory = ref({
//   A: [
//     {
//       id: 1,
//       title: "Leslie Abbott",
//       subtitle: "Co-Founder / CEO",
//       image:
//         "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//       id: 2,
//       title: "Hector Adams",
//       subtitle: "VP, Marketing",
//       image:
//         "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//       id: 3,
//       title: "Blake Alexander",
//       subtitle: "Account Coordinator",
//       image:
//         "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//       id: 4,
//       title: "Fabricio Andrews",
//       subtitle: "Senior Art Director",
//       image:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   ],
//   B: [
//     {
//       id: 5,
//       title: "Angela Beaver",
//       subtitle: "Chief Strategy Officer",
//       image:
//         "https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//       id: 6,
//       title: "Yvette Blanchard",
//       subtitle: "Studio Artist",
//       image:
//         "https://images.unsplash.com/photo-1506980595904-70325b7fdd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//       id: 7,
//       title: "Lawrence Brooks",
//       subtitle: "Content Specialist",
//       image:
//         "https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   ],
//   C: [
//     {
//       id: 8,
//       title: "Jeffrey Clark",
//       subtitle: "Senior Art Director",
//       image:
//         "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//       id: 9,
//       title: "Kathryn Cooper",
//       subtitle: "Associate Creative Director",
//       image:
//         "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   ],
//   E: [
//     {
//       id: 10,
//       title: "Alicia Edwards",
//       subtitle: "Junior Copywriter",
//       image:
//         "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//       id: 11,
//       title: "Benjamin Emerson",
//       subtitle: "Director, Print Operations",
//       image:
//         "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//       id: 12,
//       title: "Jillian Erics",
//       subtitle: "Designer",
//       image:
//         "https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//       id: 13,
//       title: "Chelsea Evans",
//       subtitle: "Human Resources Manager",
//       image:
//         "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   ],
//   G: [
//     {
//       id: 14,
//       title: "Michael Gillard",
//       subtitle: "Co-Founder / CTO",
//       image:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//       id: 15,
//       title: "Dries Giuessepe",
//       subtitle: "Manager, Business Relations",
//       image:
//         "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   ],
//   M: [
//     {
//       id: 16,
//       title: "Jenny Harrison",
//       subtitle: "Studio Artist",
//       image:
//         "https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//       id: 17,
//       title: "Lindsay Hatley",
//       subtitle: "Front-end Developer",
//       image:
//         "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//       id: 18,
//       title: "Anna Hill",
//       subtitle: "Partner, Creative",
//       image:
//         "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   ],
//   S: [
//     {
//       id: 19,
//       title: "Courtney Samuels",
//       subtitle: "Designer",
//       image:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//       id: 20,
//       title: "Tom Simpson",
//       subtitle: "Director, Product Development",
//       image:
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   ],
//   T: [
//     {
//       id: 21,
//       title: "Floyd Thompson",
//       subtitle: "Principal Designer",
//       image:
//         "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//       id: 22,
//       title: "Leonard Timmons",
//       subtitle: "Senior Designer",
//       image:
//         "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//       id: 23,
//       title: "Whitney Trudeau",
//       subtitle: "Copywriter",
//       image:
//         "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   ],
//   W: [
//     {
//       id: 24,
//       title: "Kristin Watson",
//       subtitle: "VP, Human Resources",
//       image:
//         "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//       id: 25,
//       title: "Emily Wilson",
//       subtitle: "VP, User Experience",
//       image:
//         "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   ],
//   Y: [
//     {
//       id: 26,
//       title: "Emma Young",
//       subtitle: "Senior Front-end Developer",
//       image:
//         "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   ],
// });

/* ************ Users ************ */
const users = ref([]);

let usersNumber = computed(() => users.value.length);

let directory = computed(() => {
  if (!users.value.length) return [];

  let usersList = { _: [] };

  users.value.forEach((user) => {
    let user_item = {
      id: user.id,
      title: `${user.name} ${user.surname ? user.surname : ""}`,
      subtitle: `${user.office_position ? user.office_position : ""}`,
      image: `${user.avatar ? user.avatar : ""}`,
    };

    // group users who don't have surname
    if (!user.surname) {
      usersList._.push(user_item);
      return;
    }

    // check if the letter (user.surname[0]) doesn't exists in usersList & then add it
    if (!usersList[user.surname[0]]) {
      usersList[user.surname[0]] = [];
    }

    // put the item in his letter group (group by letter)
    usersList[user.surname[0]].push(user_item);
  });

  return usersList;
});

/* ************ Selected User ************ */
let selectedUser = ref({});

let showSelectedUser = ({ id }) => {
  selected.value = true;
  selectedUser.value = users.value.find((item) => item.id === id) || {};
  console.log(selectedUser.value);
};

/* ************ Order ************ */
const order = ref({
  criteria: "id",
  mod: 1,
});

watch(
  // Reorder the users array on order change (on filter)
  () => order.value.criteria,
  (v) => {
    order.value.mod = 1;

    switch (v) {
      case "id":
        users.value = users.value.sort((a, b) => (a.id >= b.id ? 0 : 1));
        break;

      case "surname":
        users.value = users.value.sort((a, b) =>
          a.surname >= b.surname ? 0 : 1
        );
        break;

      case "department":
        users.value = users.value.sort((a, b) =>
          a.department?.id >= b.department?.id ? 0 : 1
        );
        break;

      default:
        break;
    }
  }
);

/* ************ Search ************ */
const search = ref("");

watch(
  // watching search
  () => search.value,
  _.debounce(async (v) => {
    let res;
    try {
      let url = `/users?order=${order.value.criteria}`;
      if (v) url += `&name=${v}`;
      res = await axiosInstance.get(url);
      users.value = res.data?.users;
    } catch (e) {
      console.error("Error request", e);
    }
  }, 1500),
  {
    immediate: true,
  }
);
</script>

<template>
  <OfficeLayout
    title="Сотрудники"
    main-classes="flex flex-col min-w-0 flex-1 md:overflow-hidden overflow-auto"
  >
    <template #actions>
      <Button type="secondary" link="/roles">
        <UserGroupIcon class="w-5 h-5 mr-1" />
        Роли
      </Button>

      <Button color="blue" link="/employers/create">
        <PlusCircleIcon class="w-5 h-5 mr-1" />
        Создать
      </Button>
    </template>

    <template #content>
      <div
        class="flex-1 relative z-0 flex md:overflow-hidden overflow-visible flex-col md:flex-row"
      >
        <div
          class="order-2 md:order-first md:flex md:flex-col flex-shrink-0 w-96 border-r border-gray-200"
        >
          <div class="px-6 pt-6 pb-4">
            <h2 class="text-lg font-medium text-gray-900">Картотека</h2>

            <p class="mt-1 text-sm text-gray-600">
              <span v-if="usersNumber > 1">
                Искать среди {{ usersNumber }} сотрудников
              </span>
              <span v-else>нет пользователей!</span>
            </p>

            <div class="mt-6 flex space-x-4">
              <Input
                placeholder="Поиск"
                class="flex-grow"
                :icon="SearchIcon"
                v-model="search"
              />

              <Button type="secondary">
                <FilterIcon class="w-5 h-5 text-gray-400" />
              </Button>
            </div>
          </div>

          <StackedListWithHeadings
            class="flex-1 min-h-0 overflow-y-auto"
            :items="directory"
            @select="showSelectedUser"
          />
        </div>

        <div
          class="flex flex-col items-center justify-center w-full"
          v-if="!selected"
        >
          <UserGroupIcon class="h-12 w-12 mx-auto text-gray-600" />

          <span class="mt-2 block text-sm font-medium text-gray-900">
            Выберите сотрудника
          </span>
        </div>

        <div
          class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
          v-if="selected"
        >
          <article>
            <!-- Profile header -->
            <div
              class="border-b border-gray-200 flex justify-between px-4 sm:px-6 py-3 lg:items-end items-baseline lg:flex-row flex-col gap-2"
            >
              <div class="flex items-end">
                <img
                  :src="selectedUser.avatar ? selectedUser.avatar : ''"
                  alt=""
                  class="w-32 rounded-full"
                />

                <h1 class="text-2xl font-bold text-gray-900 truncate ml-2">
                  {{ selectedUser.name + " " + selectedUser.surname }}
                </h1>
              </div>

              <Button type="secondary" size="sm">
                <PhoneIcon class="mr-2 h-5 w-5 text-gray-400" />
                Позвонить
              </Button>
            </div>

            <!-- Description list -->
            <DescriptionList :bordered="false" class="mt-5" type="columns">
              <DescriptionListItems type="columns">
                <DescriptionListItem
                  label="Телефон"
                  :value="selectedUser.phone"
                  type="columns"
                />
                <DescriptionListItem
                  label="Почта"
                  :value="selectedUser.email"
                  type="columns"
                />
                <DescriptionListItem
                  label="Город / Отдел"
                  :value="selectedUser.city"
                  type="columns"
                />
                <DescriptionListItem
                  label="Должность"
                  :value="selectedUser.position"
                  type="columns"
                />
                <DescriptionListItem
                  label="Задач в работе"
                  :value="5"
                  type="columns"
                />
                <DescriptionListItem
                  label="Дата рождения"
                  :value="selectedUser.born_at"
                  type="columns"
                />
                <DescriptionListItem
                  label="О сотруднике"
                  type="columns"
                  columns="2"
                  :value="selectedUser.about"
                />
              </DescriptionListItems>
            </DescriptionList>
          </article>
        </div>
      </div>
    </template>
  </OfficeLayout>
</template>

<style scoped></style>
