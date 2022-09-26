<script setup>
import { DotsHorizontalIcon, PencilIcon, XIcon } from '@heroicons/vue/outline';
import { MenuButton } from '@headlessui/vue';
import { computed } from 'vue';
import Button from '@/UI/Button.vue';
import Dropdown from '@/UI/Dropdown.vue';
import { Table, THead, TBody, Tr, Td, Th } from '@/UI/Table';
import useIntersectionObserver from '~/composables/useIntersectionObserver';

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

  last: {
    type: Boolean,
    default: false,
  },

  noDelete: {
    type: Function,
    default: () => false,
  },

  noEdit: {
    type: Function,
    default: () => false,
  },
});

const emit = defineEmits(['delete', 'edit', 'bottomTouched']);

const { pixel, container } = useIntersectionObserver(() => {
  emit('bottomTouched');
}, computed(() => props.items.length > 0));

const noActions = (item) => props.noDelete(item) && props.noEdit(item);

</script>

<template>
    <div :ref="(v)=>container = v">
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
                <Tr v-for="(item, i) in props.items" :key="'tr-'+i" :class="(i&1) ? 'bg-white' : 'bg-gray-100'">

                    <Td v-for="field in props.fields" :key="`${field.key}-${i}`">
                        <slot
                            :name="`td-${field?.key}`"
                            :value="item[field?.key]"
                            :item="item"
                            :index="i"
                        >
                            {{ item[field.key] }}
                        </slot>
                    </Td>

                    <Td v-if="props.actions" class="text-center py-5">
                        <Dropdown
                            v-if="!noActions(item)"
                            direction="right"
                            position="center"
                            :items="[[
                                { label: 'Изменить', click: () => $emit('edit', item.id, item), icon: PencilIcon, hide: props.noEdit(item) },
                                { label: 'Удалить', click: () => $emit('delete', item.id, item), icon: XIcon, hide: props.noDelete(item) },
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

                <Tr :class="(props.items.length & 1) ? 'bg-white' : 'bg-gray-100'" v-if="props.last">
                    <Td v-for="field in props.fields" :key="`las-${field.key}-${i}`">
                        <slot :name="`td-last-${field.key}`" :items="items"></slot>
                    </Td>
                    <Td v-if="props.actions" class="text-center py-5"></Td>
                </Tr>

            </TBody>
        </Table>

        <pixel />
    </div>
</template>
