<script setup>
import { DotsHorizontalIcon, PencilIcon, XIcon } from '@heroicons/vue/outline';
import { MenuButton } from '@headlessui/vue';
import Button from '@/UI/Button.vue';
import Dropdown from '@/UI/Dropdown.vue';
import { Table, THead, TBody, Tr, Td, Th } from '@/UI/Table';

const props = defineProps({
  fields: {
    type: Array,
    default: [],
  },

  items: {
    type: Array,
    default: [],
  },

  actions: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['delete', 'edit']);

</script>

<template>
      <Table class="mt-5">
        <THead>
            <Tr>
                <Th v-for="field in props.fields" :key="field.key">
                    <slot :name="`th-${field.key}`" :label="field.label" :field="field" > {{ field.label }} </slot>
                </Th>

                <Th v-if="props.actions" class="text-center">Действия</Th>
            </Tr>
        </THead>
        <TBody>
            <Tr v-for="(item, i) in props.items" :key="i" :class="(i&1) ? 'bg-white' : 'bg-gray-100'">

                <Td v-for="field in props.fields" :key="`${field.key}-${i}`">
                    <slot
                        :name="`td-${field.key}`"
                        :value="item[field.key]"
                        :item="item"
                        :index="i"
                    >
                        {{ item[field.key] }}
                    </slot>
                </Td>

                <Td v-if="props.actions" class="text-center py-5">
                    <Dropdown
                        direction="right"
                        position="center"
                        :items="[[
                            { label: 'Изменить', click: () => $emit('edit', item.id), icon: PencilIcon },
                            { label: 'Удалить', click: () => $emit('delete', item.id), icon: XIcon },
                        ]]"
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
</template>
