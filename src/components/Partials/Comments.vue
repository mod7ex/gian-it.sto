<script setup>
import { QuestionMarkCircleIcon } from '@heroicons/vue/outline';
import { ref, unref, computed } from 'vue';
import Button from '@/UI/Button.vue';
import TextArea from '@/UI/TextArea.vue';
import store from '~/store/comments';
import { defaults } from '~/composables/useAvatar';
import useAuth from '~/composables/useAuth';
import { sto_parse_DMY_T, timeSince } from '~/helpers';
import Avatar from '@/UI/Avatar.vue';

const { load, save, state } = store;

const { user } = useAuth();

// Id might be a string or ref<string>
const props = defineProps({ model: String, id: [String, Object], disabled: { type: Boolean, default: false } });

const emit = defineEmits(['comment']);

const content = ref('');

const getComments = async () => {
  if(props.model && props.id) await load(props.model, unref(props.id));
};

const submitComment = async (description) => {
  if(!content.value) return
  if (!unref(props.id)) return;
  const success = await save(props.model, unref(props.id), description);
  if (success) {
    content.value = '';
    emit('comment', description);
    await getComments();
  }
};

// REMOVE NOT : we may want to restrict later
/*
const hasCommented = computed(() => {
  for (let i = 0; i < state.raw.length; i++) {
    if (user.value.id == state.raw[i]?.user?.id) {
      return true;
    }
  }

  return false;
});
*/

await getComments();

</script>

<template>
  <section aria-labelledby="notes-title">
    <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">

      <div class="divide-y divide-gray-200">
        <div class="px-4 py-5 sm:px-6">
          <h2 id="notes-title" class="text-lg font-medium text-gray-900">Комментарии / Заметки</h2>
        </div>
        <div class="px-4 py-6 sm:px-6">
          <ul role="list" class="space-y-8">
            <li v-for="comment in state.raw" :key="comment.id">
              <div class="flex space-x-3">
                <div class="flex-shrink-0">
                  <!-- <img class="h-10 w-10 rounded-full" :src="comment.user.avatar ?? defaults.avatar" /> -->
                  <Avatar :image="comment.user.avatar" />
                </div>
                <div>

                  <div class="text-sm">
                    <router-link class="font-medium text-gray-900" :to="{ name: 'EditEmployer', params: { id: comment.user.id } }">{{ comment.user.name }} {{ comment.user.surname }}</router-link>
                  </div>

                  <div class="mt-1 text-sm text-gray-700"> <p>{{ comment.description }}</p> </div>

                  <div class="mt-2 text-sm space-x-2">
                    <span class="text-gray-500 font-medium">{{ timeSince(sto_parse_DMY_T(comment.created_at)) }}</span>
                  </div>

                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="bg-gray-50 px-4 py-6 sm:px-6">
      <!-- <div class="bg-gray-50 px-4 py-6 sm:px-6" v-if="!hasCommented"> -->
        <div class="flex space-x-3">
          <div class="flex-shrink-0">
            <!-- <img class="h-10 w-10 rounded-full" :src="user.avatar" alt="" /> -->
            <Avatar :image="user.avatar" />
          </div>
          <div class="min-w-0 flex-1">
            <div>
              <label for="comment" class="sr-only">Комментарий</label>
              <TextArea :disabled="props.disabled" placeholder="Текст вашего комментария..." rows="3" v-model="content" />
            </div>
            <div class="mt-3 flex items-center justify-between">
              <span class="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900">
                <QuestionMarkCircleIcon class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />

                <span>Только текст, HTML запрещён</span>
              </span>
              <Button :disabled="props.disabled" color="blue" @click="() => submitComment(content)">Отправить</Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
