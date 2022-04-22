<script setup>
const props = defineProps({
  icon: {
    type: [Object, null],
    required: false,
  },
  title: {
    type: String,
    required: false,
    default: "title",
  },
  text: {
    type: String,
    required: false,
    default: "lorem ipsum",
  },
  color: {
    type: String,
    required: false,
    default: "blue", // red, green, blue, yellow
  },
  open: {
    type: Boolean,
    required: false,
    default: false,
  },
});

// for prod parser
const colors = [
  "bg-red-50",
  "text-red-400",
  "text-red-800",
  "text-red-700",
  "bg-red-50",
  "text-red-500",
  "hover:bg-red-100",
  "focus:ring-offset-red-50",
  "focus:ring-red-600",

  "bg-blue-50",
  "text-blue-400",
  "text-blue-800",
  "text-blue-700",
  "bg-blue-50",
  "text-blue-500",
  "hover:bg-blue-100",
  "focus:ring-offset-blue-50",
  "focus:ring-blue-600",

  "bg-green-50",
  "text-green-400",
  "text-green-800",
  "text-green-700",
  "bg-green-50",
  "text-green-500",
  "hover:bg-green-100",
  "focus:ring-offset-green-50",
  "focus:ring-green-600",

  "bg-yellow-50",
  "text-yellow-400",
  "text-yellow-800",
  "text-yellow-700",
  "bg-yellow-50",
  "text-yellow-500",
  "hover:bg-yellow-100",
  "focus:ring-offset-yellow-50",
  "focus:ring-yellow-600",

  "bg-indigo-50",
  "text-indigo-400",
  "text-indigo-800",
  "text-indigo-700",
  "bg-indigo-50",
  "text-indigo-500",
  "hover:bg-indigo-100",
  "focus:ring-offset-indigo-50",
  "focus:ring-indigo-600",

  "bg-gray-50",
  "text-gray-400",
  "text-gray-800",
  "text-gray-700",
  "bg-gray-50",
  "text-gray-500",
  "hover:bg-gray-100",
  "focus:ring-offset-gray-50",
  "focus:ring-gray-600",

  "bg-purple-50",
  "text-purple-400",
  "text-purple-800",
  "text-purple-700",
  "bg-purple-50",
  "text-purple-500",
  "hover:bg-purple-100",
  "focus:ring-offset-purple-50",
  "focus:ring-purple-600",
];
</script>
<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div
    aria-live="assertive"
    class="fixed inset-0 flex items-start px-4 py-6 pointer-events-none sm:p-6 z-50"
  >
    <div class="w-full flex flex-col items-center space-y-4">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="props.open"
          class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
          <div :class="['rounded-md p-4', `bg-${props.color}-50`]">
            <div class="flex items-start">
              <div class="flex-shrink-0" v-if="props.icon">
                <component
                  :is="props.icon"
                  :class="['h-5 w-5', `text-${props.color}-400`]"
                />
              </div>
              <div class="ml-3 w-0 flex-1">
                <slot name="title">
                  <h3
                    :class="['text-sm font-medium', `text-${props.color}-800`]"
                    v-if="props.title"
                  >
                    {{ props.title }}
                  </h3>
                </slot>

                <slot name="text">
                  <div
                    :class="['ml-2 text-sm', `text-${props.color}-700`]"
                    v-if="props.text"
                  >
                    <p>
                      {{ props.text }}
                    </p>
                  </div>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
