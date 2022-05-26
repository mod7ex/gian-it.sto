<script setup>
const props = defineProps({
  items: {
    type: Object,
    required: true,
  },

  selected: {
    type: [String, Number],
    required: false,
  },
});

const emit = defineEmits(['select']);

const pick = (e) => {
  const id = e.target?.id;
  if (Number.isNaN(id)) return;
  emit('select', id);
};

</script>

<template>
  <nav class="h-full overflow-y-auto scroll-area" aria-label="Directory">
    <div v-for="letter in Object.keys(props.items)" :key="letter" class="relative">
      <div class="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
        <h3>{{ letter }}</h3>
      </div>

      <ul role="list" class="relative z-0 divide-y divide-gray-200" @click="($e)=>pick($e)">
        <li
          v-for="item in props.items[letter]"
          :key="item.id"
          :class="[`bg-${selected == item.id ? 'gray-200 ring-indigo-300 ring-inset ring-1' : 'white'}`, `hover:bg-gray-${selected == item.id ? '200' : '100'}`]"
        >
          <div class="relative px-6 py-5 flex items-center space-x-3 ">
            <div class="flex-shrink-0" v-if="item.image">
              <div
                class="h-10 w-10 rounded-full mr-2 bg-center bg-no-repeat bg-cover shadow-2xl"
                :style="`background-image: url(${item.image});`"
              />
            </div>

            <div class="flex-1 min-w-0">
              <button class="focus:outline-none text-left">
                <span class="absolute inset-0" aria-hidden="true" :id="item.id"/>
                <p class="text-sm font-medium text-gray-900" v-if="item.title">
                  {{ item.title }}
                </p>

                <p class="text-sm text-gray-500 truncate" v-if="item.subtitle">
                  {{ item.subtitle }}
                </p>
              </button>
            </div>
          </div>
        </li>
      </ul>

    </div>
  </nav>
</template>
