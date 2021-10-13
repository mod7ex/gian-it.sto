<script setup>
const props = defineProps({
  image: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  subtitle: {
    type: String,
    required: false,
  },
  detail: {
    type: Boolean,
    required: false,
    default: true,
  },
});
</script>

<template>
  <div class="flex-shrink-0 group block">
    <div class="flex items-center">
      <div>
        <img class="inline-block h-9 w-9 rounded-full" :src="props.image" alt="" style="min-width: 40px; min-height: 40px" />
      </div>

      <slot name="detail">
        <div class="ml-3" v-if="detail">
          <slot name="title">
            <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900" v-if="props.title">
              {{ props.title }}
            </p>
          </slot>

          <slot name="subtitle">
            <p class="text-xs font-medium text-gray-500 group-hover:text-gray-700" v-if="props.subtitle">
              {{ props.subtitle }}
            </p>
          </slot>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>

</style>
