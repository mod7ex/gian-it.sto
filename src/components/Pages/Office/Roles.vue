<script setup>
import {
  PlusCircleIcon,
  DotsHorizontalIcon,
  PencilIcon,
  XIcon,
  ArrowLeftIcon,
} from "@heroicons/vue/outline";
import { MenuButton } from "@headlessui/vue";
import OfficeLayout from "@/Layout/Office.vue";
import Header from "@/UI/Header.vue";
import Button from "@/UI/Button.vue";
import Badge from "@/UI/Badge.vue";
import Dropdown from "@/UI/Dropdown.vue";
import Dialog from "@/UI/Dialog.vue";
import Spinner from "@/UI/Spinner.vue";
import Link from "@/UI/Link.vue";
import { Table, THead, TBody, Tr, Td, Th } from "@/UI/Table";
import { onMounted, ref, watch } from "vue";
import useApi from "~/composables/useApi.js";
import useRoles from "~/composables/useRoles.js";
import { useRouter } from "vue-router";

let router = useRouter();

let { roles, fetchRoles, deleteRoleLocally } = useRoles();

const { axiosInstance } = useApi();

/* ************ Fetch roles ************ */
onMounted(async () => {
  await fetchRoles();
});

/* ************ Update role ************ */

let editRole = async (id) => {
  await router.push({ name: "EditRole", params: { id } });
};

/* ************ Delete role ************ */

// Role deletion
let roleToBeDeletedId = ref(null);
let isWaitingForRoleDeletion = ref(false);
let isRoleDeleted = ref(false);
let deletionMessage = ref(null);

let closeRoleDeletionModal = () => {
  roleToBeDeletedId.value = null;

  setTimeout(() => {
    isWaitingForRoleDeletion.value = false;
    isRoleDeleted.value = false;
    deletionMessage.value = null;
  }, 300);
};

let deleteRole = async () => {
  isWaitingForRoleDeletion.value = true;

  try {
    let { data } = await axiosInstance.delete(
      `roles/${roleToBeDeletedId.value}`
    );

    if (!data.success) throw Error();

    isRoleDeleted.value = true;
    deletionMessage.value = "Роль успешно удалена";

    deleteRoleLocally(roleToBeDeletedId.value);
  } catch (e) {
    console.error("Error request", e);

    if (e.response) {
      console.error("Error responce", e, e.response.data);
      deletionMessage.value = e.response.data.message;
    } else if (e.request) {
      console.log("Error request", e.request);
      deletionMessage.value = "Не удалось удалить роль";
    } else {
      console.log("Error local", e.message);
      deletionMessage.value = e.message;
    }

    isRoleDeleted.value = false;
  } finally {
    isWaitingForRoleDeletion.value = false;
  }
};
</script>

<template>
  <OfficeLayout title="Роли">
    <template #actions>
      <Button type="secondary" link="/employers">
        <ArrowLeftIcon class="w-5 h-5 mr-1" />
        К сотрудникам
      </Button>

      <Button color="blue" link="/roles/create">
        <PlusCircleIcon class="w-5 h-5 mr-1" />
        Создать
      </Button>
    </template>

    <!-- Table -->
    <Table class="mt-5">
      <THead>
        <Tr>
          <Th>Название</Th>
          <Th>Дата создания</Th>
          <Th class="text-center">Действия</Th>
        </Tr>
      </THead>
      <TBody>
        <Tr
          v-for="(item, index) in roles"
          :key="item.id"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'"
        >
          <Td>
            <Link :href="`/roles/update/${item.id}`">
              {{ item.name }}
            </Link>
          </Td>
          <Td>
            {{ item.created_at }}
          </Td>
          <Td class="text-center py-5">
            <Dropdown
              :items="[
                [
                  {
                    label: 'Изменить',
                    click: () => editRole(item.id),
                    icon: PencilIcon,
                  },
                  {
                    label: 'Удалить',
                    click: () => (roleToBeDeletedId = item.id),
                    icon: XIcon,
                  },
                ],
              ]"
              direction="right"
              position="center"
            >
              <MenuButton>
                <Button type="secondary" :circle="true">
                  <DotsHorizontalIcon class="w-4 h-4" />
                </Button>
              </MenuButton>
            </Dropdown>
          </Td>
        </Tr>
      </TBody>
    </Table>

    <Dialog
      :open="roleToBeDeletedId != null"
      @close="closeRoleDeletionModal"
      :type="isRoleDeleted ? 'success' : 'danger'"
    >
      <template #title>
        {{ deletionMessage ? deletionMessage : "Удалить?" }}
      </template>

      <template #text v-if="!deletionMessage">
        Вы уверены что хотите удалить пользователь?
        <div class="my-5 flex justify-center" v-if="isWaitingForRoleDeletion">
          <Spinner />
        </div>
      </template>

      <template v-slot:actions v-if="!deletionMessage">
        <div class="mt-5 sm:mt-6 flex justify-center items-end">
          <Button @click="closeRoleDeletionModal" class="mx-3 justify-center">
            Закрыть
          </Button>

          <Button color="red" @click="deleteRole" class="mx-3 justify-center">
            Удалить
          </Button>
        </div>
      </template>
    </Dialog>
  </OfficeLayout>
</template>

<style scoped></style>
