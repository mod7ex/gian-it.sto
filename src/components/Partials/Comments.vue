<script setup>
import { QuestionMarkCircleIcon, XCircleIcon } from '@heroicons/vue/outline';
import { PaperClipIcon, CameraIcon, VideoCameraIcon } from '@heroicons/vue/solid';
import { ref, unref } from 'vue';
import Button from '@/UI/Button.vue';
import TextArea from '@/UI/TextArea.vue';
import store from '~/store/comments';
import useAuth from '~/composables/useAuth';
import { sto_parse_DMY_T, timeSince, dataURItoBlob } from '~/helpers';
import Avatar from '@/UI/Avatar.vue';
import { upload } from '~/helpers/save';
import useToast from '~/composables/useToast';
import Spinner from '@/UI/Spinner.vue';

const toaster = useToast()

const { load, save, state, addComment } = store;

const { user } = useAuth();

// Id might be a string or ref<string>
const props = defineProps({ title: String, model: String, id: [String, Object], disabled: { type: Boolean, default: false } });

const emit = defineEmits(['comment']);

const content = ref('');
const files = ref([]);

const getComments = async () => {
  if (props.model && props.id) await load(props.model, unref(props.id));
};

const pending = ref(false)

const submitComment = async (description) => {
  if(pending.value) return

  try {
    const len = files.value?.length ?? 0;

    if (!content.value && !len) return;

    const _id = unref(props.id);

    if (!_id) return;

    const fileSet = new FormData();

    for (let i = 0; i < len; i++) { fileSet.append('files[]', files.value[i]); }

    fileSet.append('description', description || '_');

    pending.value = true

    const { message, success, data } = await upload(`comments/${props.model}/${_id}`, fileSet);

    if (success) {
      content.value = '';
      files.value = [];
      emit('comment', description);
      addComment(data.comment);
      toaster.success('Комментарий сохранен')
    } else {
      toaster.danger(message || 'Не удалось сохранить комментарий');
    }
  } finally {
    pending.value = false
  }
};

const VIDEO_EXT = ['WEBM', 'MPG', 'MP2', 'MPEG', 'MPE', 'MPV', 'OGG', 'MP4', 'M4P', 'M4V', 'AVI', 'WMV', 'MOV', 'QT', 'FLV', 'SWF', 'AVCHD'];

const isVideo = (f) => {
  if (typeof f === 'string') {
    const ext = [...f.split('.')].pop();
    return VIDEO_EXT.includes(ext.toUpperCase());
  }

  return f?.type?.startsWith('video/');
};

const creatUrl = (v) => window.URL.createObjectURL(v);

const handler = (e) => {
  files.value = [...e.target.files];
  console.log(files.value);
};

const removeFile = (file) => {
  files.value = files.value.filter((_file) => file != _file);
};

await getComments();

const onEnter = (e) => {
  e.currentTarget.classList.add('current-preview');
};

const onLeave = (e) => {
  e.currentTarget.classList.remove('current-preview');
};

const groupBy = (arr, i = 0, d = 4) => arr.filter((_, _i) => _i % d === i);
</script>

<template>
  <section aria-labelledby="notes-title">
    <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">

      <div class="divide-y divide-gray-200">
        <div class="px-4 py-5 sm:px-6">
          <h2 id="notes-title" class="text-lg font-medium text-gray-900">{{ props.title ?? 'Комментарии / Заметки' }}</h2>
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
                      <span v-for="{id, url, file_name} in groupBy(comment.files, 0)" :key="id" class="my-1" >
                        <video class="comment-file-preview rounded shadow-md" v-if="isVideo(file_name)" controls autoplay >
                          <source :src="url" type="video/mp4">
                        </video>
                        <a :href="url" target="_blank" v-else>
                          <img class="comment-file-preview rounded shadow-md" :src="url" />
                        </a>
                      </span>
                    </div>
                    <div class="column flex flex-col mx-1">
                      <span v-for="{id, url} in groupBy(comment.files, 1)" :key="id" class="my-1" >
                        <video class="comment-file-preview rounded shadow-md" v-if="isVideo(file_name)" controls autoplay >
                          <source :src="url" type="video/mp4">
                        </video>
                        <a :href="url" target="_blank" v-else>
                          <img class="comment-file-preview rounded shadow-md" :src="url" />
                        </a>
                      </span>
                    </div>
                    <div class="column flex flex-col mx-1">
                      <span v-for="{id, url} in groupBy(comment.files, 2)" :key="id" class="my-1" >
                        <video class="comment-file-preview rounded shadow-md" v-if="isVideo(file_name)" controls autoplay >
                          <source :src="url" type="video/mp4">
                        </video>
                        <a :href="url" target="_blank" v-else>
                          <img class="comment-file-preview rounded shadow-md" :src="url" />
                        </a>
                      </span>
                    </div>
                    <div class="column flex flex-col mx-1">
                      <span v-for="{id, url} in groupBy(comment.files, 3)" :key="id" class="my-1" >
                        <video class="comment-file-preview rounded shadow-md" v-if="isVideo(file_name)" controls autoplay >
                          <source :src="url" type="video/mp4">
                        </video>
                        <a :href="url" target="_blank" v-else>
                          <img class="comment-file-preview rounded shadow-md" :src="url" />
                        </a>
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
                  <video class="upload-preview rounded shadow-md" v-if="isVideo(file)" autoplay muted >
                    <source :src="creatUrl(file)" type="video/mp4">
                  </video>
                  <img class="upload-preview rounded shadow-md" :src="creatUrl(file)" v-else />

                  <span class="remover bg-white rounded-full absolute -top-3 -right-3 shadow cursor-pointer" @click="() => removeFile(file)">
                    <XCircleIcon class="w-6 text-gray-600" />
                  </span>
                </span>

              </div>
            </Transition>
            <div class="mt-3 flex items-center justify-between flex-wrap">
              <div class="flex gap-9 mb-2" >
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

                <label for="camera-video" >
                  <VideoCameraIcon class="h-7 text-blue-500 hover:text-blue-600 cursor-pointer" />
                  <input @change="handler" class="hidden" id="camera-video" type="file" capture accept="video/*" >
                </label>
                <label for="camera-image" >
                  <CameraIcon class="h-7 text-blue-500 hover:text-blue-600 cursor-pointer" />
                  <input @change="handler" class="hidden" id="camera-image" type="file" capture accept="image/*" >
                </label>
              </div>
              <span class="mb-2 group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900">
                <QuestionMarkCircleIcon class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                <small>Только текст, HTML запрещён</small>
              </span>
              <Button class="h-9 w-28 flex justify-center" :disabled="props.disabled || pending" color="blue" @click="() => submitComment(content)">
                <Spinner class="h-1" v-if="pending" />
                <span v-else>Отправить</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.not-visible-area{
  position: absolute;
  bottom: 3000px;
}

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
