<script setup>
import { QuestionMarkCircleIcon } from '@heroicons/vue/outline';
import { ref } from 'vue';
import Button from '@/UI/Button.vue';
import TextArea from '@/UI/TextArea.vue';
import useAuth from '~/composables/useAuth.js';
import store from '~/store/comments';

const { load, save, state } = store;

const { user } = useAuth();

const props = defineProps({ model: String, id: String });
console.log(props.model);

const emit = defineEmits(['comment']);

const content = ref('');

const submitComment = async (description) => {
  await save(props.model, props.id, description);
  emit('comment', description);
};

// await load(props.model, props.id)

const comments = [
  {
    id: 1,
    name: 'Leslie Alexander',
    date: '4 дня назад',
    imageId: '1494790108377-be9c29b29330',
    body:
      'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
  },
  {
    id: 2,
    name: 'Michael Foster',
    date: '4 дня назад',
    imageId: '1519244703995-f4e0f30006d5',
    body:
      'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.',
  },
  {
    id: 3,
    name: 'Dries Vincent',
    date: '4 дня назад',
    imageId: '1506794778202-cad84cf45f1d',
    body:
      'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.',
  },
];

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
            <li v-for="comment in comments" :key="comment.id">
              <div class="flex space-x-3">
                <div class="flex-shrink-0">
                  <img class="h-10 w-10 rounded-full" :src="`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`" alt="" />
                </div>
                <div>
                  <div class="text-sm">
                    <a href="#" class="font-medium text-gray-900">{{ comment.name }}</a>
                  </div>
                  <div class="mt-1 text-sm text-gray-700">
                    <p>{{ comment.body }}</p>
                  </div>
                  <div class="mt-2 text-sm space-x-2">
                    <span class="text-gray-500 font-medium">{{ comment.date }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- form -->
      <div class="bg-gray-50 px-4 py-6 sm:px-6">
        <div class="flex space-x-3">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="user.avatar" alt="" />
          </div>
          <div class="min-w-0 flex-1">
            <form action="#">
              <div>
                <label for="comment" class="sr-only">Комментарий</label>
                <TextArea placeholder="Текст вашего комментария..." rows="3" v-model="content" />
              </div>
              <div class="mt-3 flex items-center justify-between">
                <span class="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900">
                  <QuestionMarkCircleIcon class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />

                  <span>Только текст, HTML запрещён</span>
                </span>
                <Button color="blue" @click="() => submitComment(content)">Отправить</Button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
