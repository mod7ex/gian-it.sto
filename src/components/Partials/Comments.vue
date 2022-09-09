<script setup>
import { QuestionMarkCircleIcon, XCircleIcon } from '@heroicons/vue/outline';
import {  PaperClipIcon, CameraIcon, VideoCameraIcon } from '@heroicons/vue/solid';
import { ref, unref, computed } from 'vue';
import Button from '@/UI/Button.vue';
import TextArea from '@/UI/TextArea.vue';
import store from '~/store/comments';
import { defaults } from '~/composables/useAvatar';
import useAuth from '~/composables/useAuth';
import { sto_parse_DMY_T, timeSince } from '~/helpers';
import Avatar from '@/UI/Avatar.vue';
import { upload } from '~/helpers/save';

const { load, save, state, addComment } = store;

const { user } = useAuth();

// Id might be a string or ref<string>
const props = defineProps({ model: String, id: [String, Object], disabled: { type: Boolean, default: false } });

const emit = defineEmits(['comment']);

const content = ref('');
const files = ref([]);

const getComments = async () => {
  if(props.model && props.id) await load(props.model, unref(props.id));
};

const submitComment = async (description) => {
  const len = files.value?.length ?? 0;

  if(!content.value && !len) return;

  const _id = unref(props.id);

  if (!_id) return;

  const fileSet = new FormData();

  for (let i = 0; i < len; i++) {
    fileSet.append('files[]', files.value[0]);
  }
  
  fileSet.append('description', description);

  const { message, success, data } = await upload(`comments/${props.model}/${_id}`, fileSet);

  if (success) {
    content.value = '';
    files.value = []
    emit('comment', description);
    addComment(data.comment)
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

const isVideo = (f) => {
  return f.type.startsWith('video/')
}

const creatUrl = (v) => window.URL.createObjectURL(v)



const handler = (e) => {
  files.value = [...e.target.files]
  console.log(files.value)
};

const removeFile = (file) => {
  files.value = files.value.filter((_file) => file != _file)
}

await getComments();

const onEnter = (e) => {
  e.currentTarget.classList.add('current-preview')
}

const onLeave = (e) => {
  e.currentTarget.classList.remove('current-preview')
}

const groupBy = (i = 0, d = 4) => {
  return files.value.filter((_, _i) => _i%d === i)
}

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
                <div class="flex-grow">

                  <div class="text-sm">
                    <router-link class="font-medium text-gray-900" :to="{ name: 'EditEmployer', params: { id: comment.user.id } }">
                      {{ comment.user.name ?? '' }} {{ comment.user.middle_name ?? '' }}
                    </router-link>
                  </div>

                  <div class="mt-1 text-sm text-gray-700"> <p>{{ comment.description }}</p> </div>

                  <div class="mt-1 flex flex-wrap">

                    <div class="column flex flex-col mx-1">
                      <span v-for="(file, i) in groupBy(0)" :key="i" class="my-1" >
                        <video class="comment-file-preview rounded shadow-md" v-if="isVideo(file)" autoplay >
                          <source :src="creatUrl(file)" type="video/mp4">
                        </video>
                        <img class="comment-file-preview rounded shadow-md" :src="creatUrl(file)" v-else />
                      </span>
                    </div>
                    <div class="column flex flex-col mx-1">
                      <span v-for="(file, i) in groupBy(1)" :key="i" class="my-1" >
                        <video class="comment-file-preview rounded shadow-md" v-if="isVideo(file)" autoplay >
                          <source :src="creatUrl(file)" type="video/mp4">
                        </video>
                        <img class="comment-file-preview rounded shadow-md" :src="creatUrl(file)" v-else />
                      </span>
                    </div>
                    <div class="column flex flex-col mx-1">
                      <span v-for="(file, i) in groupBy(2)" :key="i" class="my-1" >
                        <video class="comment-file-preview rounded shadow-md" v-if="isVideo(file)" autoplay >
                          <source :src="creatUrl(file)" type="video/mp4">
                        </video>
                        <img class="comment-file-preview rounded shadow-md" :src="creatUrl(file)" v-else />
                      </span>
                    </div>
                    <div class="column flex flex-col mx-1">
                      <span v-for="(file, i) in groupBy(3)" :key="i" class="my-1" >
                        <video class="comment-file-preview rounded shadow-md" v-if="isVideo(file)" autoplay >
                          <source :src="creatUrl(file)" type="video/mp4">
                        </video>
                        <img class="comment-file-preview rounded shadow-md" :src="creatUrl(file)" v-else />
                      </span>
                    </div>

                  </div>

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
            <Transition name="slide-fade">
              <div v-if="files.length" class="border shadow rounded-md my-1 p-2 flex flex-wrap gap-2" > 

                <span @mouseenter="onEnter" @mouseleave="onLeave" v-for="(file, i) in files" :key="i" class="relative mx-1 my-1" >
                  <video class="upload-preview rounded shadow-md" v-if="isVideo(file)" autoplay >
                    <source :src="creatUrl(file)" type="video/mp4">
                  </video>
                  <img class="upload-preview rounded shadow-md" :src="creatUrl(file)" v-else />

                  <span class="remover bg-white rounded-full absolute -top-3 -right-3 shadow cursor-pointer" @click="() => removeFile(file)">
                    <XCircleIcon class="w-6 text-gray-600" />
                  </span>
                </span>

              </div>
            </Transition>
            <div class="mt-3 flex items-center justify-between">
              <div class="flex gap-9" >
                <span>
                  <label for="attach-file-upload"><PaperClipIcon class="h-7 transform -rotate-45 text-blue-500 hover:text-blue-600 cursor-pointer" /></label>
                  <input
                    class="hidden"
                    id="attach-file-upload"
                    type="file"
                    multiple
                    @change="handler"
                    accept="image/*, video/*"
                  />
                </span>
                <!-- video -->
                <span>
                  <label for="attach-video-camera"><VideoCameraIcon class="h-7 text-blue-500 hover:text-blue-600 cursor-pointer" /></label>
                  <input class="hidden" type="file" id="attach-video-camera" accept="video/*;capture=camera">
                </span>
                <!-- image -->
                <span>
                  <label for="attach-image-camera"><CameraIcon class="h-7 text-blue-500 hover:text-blue-600 cursor-pointer" /></label>
                  <input class="hidden" type="file" id="attach-image-camera" accept="image/*;capture=camera">
                </span>
              </div>
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


<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}



.slide-fade-enter-from {
  transform: translateX(30px);
  height: 0;
}

.upload-preview {
  max-width: 150px;
  max-height: 150px;
  height: 100%;
}

.remover {
  display: none;
}

.current-preview .remover {
  display: inline;
}

.comment-file-preview {
  width: 100%;
}

.column {
  flex: 100%;
  max-width: 100%;
}

@media screen and (min-width: 768px) {
  .column {
    flex: 47%;
    max-width: 47%;
  }
}

@media screen and (min-width: 1280px) {
  .column {
    flex: 31%;
    max-width: 31%;
  }
}

@media screen and (min-width: 1536px) {
  .column {
    flex: 23%;
    max-width: 23%;
  }
}
</style>