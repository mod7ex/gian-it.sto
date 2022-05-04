<script setup>
const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <nav class="h-full overflow-y-auto scroll-area" aria-label="Directory">
    <div v-for="letter in Object.keys(props.items)" :key="letter" class="relative">
      <div class="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
        <h3>{{ letter }}</h3>
      </div>

      <ul role="list" class="relative z-0 divide-y divide-gray-200">
        <li v-for="item in props.items[letter]" :key="item.id" class="bg-white">
          <div class="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
            <div class="flex-shrink-0" v-if="item.image">
              <img class="h-10 w-10 rounded-full" :src="item.image" alt="" />
            </div>

            <div class="flex-1 min-w-0">
              <button @click="$emit('select', item)" class="focus:outline-none text-left">
                <span class="absolute inset-0" aria-hidden="true" />
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
