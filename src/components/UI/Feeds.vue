<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const feedRef = ref();

watch(() => props.items, () => {
  const target = feedRef.value ?? document.getElementById('task-feed');

  requestAnimationFrame(() => {
    target.scroll({
      top: target.scrollHeight,
      behavior: 'smooth',
    });
  });
});

</script>

<template>
  <div class="flow-root" ref="feedRef" id="task-feed" >
    <ul role="list" class="-mb-8">
      <li v-for="(event, eventIdx) in props.items" :key="event.id">
        <div class="relative pb-8">
          <span v-if="(eventIdx !== props.items.length - 1)" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />

          <div class="relative flex space-x-3">
            <div>
              <span :class="[event.iconBackground, 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white']">
                <component :is="event.icon" class="h-5 w-5 text-white" aria-hidden="true" />
              </span>
            </div>

            <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
              <div>
                <p class="text-sm text-gray-500">
                  {{ event.content }} <a :href="event.href" class="font-medium text-gray-900">{{ event.target }}</a>
                </p>
              </div>

              <div class="text-right text-sm whitespace-nowrap text-gray-500">
                <time :datetime="event.datetime">{{ event.date }}</time>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
