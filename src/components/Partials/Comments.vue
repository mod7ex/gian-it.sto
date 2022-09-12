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
const props = defineProps({ model: String, id: [String, Object], disabled: { type: Boolean, default: false } });

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

// **************************************************************************************************
/*
const showModal = ref(false);
const cameraErrMsg = ref();

let video = null;
let canvas = null;
// let photo = null;
let startbutton = null;

const closeCamera = () => {
  console.log(video.srcObject)
  video.srcObject.getTracks().forEach((track) => {
    track.stop();
  });

  setTimeout(() => {
    showModal.value = false;
  })
}

const handeCamera = () => {
  showModal.value = true;

  const width = 320;
  let height = 0;

  let streaming = false;

  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    // photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
        cameraErrMsg.value = 'Something went wrong';
      });

    video.addEventListener('canplay', (ev) => {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);

        if (isNaN(height)) {
          height = width / (4 / 3);
        }

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', (ev) => {
      takepicture();
      ev.preventDefault();
    }, false);

    clearphoto();
  }

  function clearphoto() {
    const context = canvas.getContext('2d');
    context.fillStyle = '#AAA';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL('image/png');

    // photo.setAttribute('src', data);
  }

  function takepicture() {
    const context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      const data = canvas.toDataURL('image/png');
      const blob = dataURItoBlob(data);
      files.value = [...files.value, blob];
      // photo.setAttribute('src', data);
    } else {
      clearphoto();
    }

    closeCamera()
  }

  requestAnimationFrame(startup);
};
*/
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
<!-- 
                <label>
                  <VideoCameraIcon class="h-7 text-blue-500 hover:text-blue-600 cursor-pointer" />
                </label>
                <label @click="() => handeCamera()" >
                  <CameraIcon class="h-7 text-blue-500 hover:text-blue-600 cursor-pointer" />
                </label>
-->
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
<!--
      <Teleport to="#sto-modal-teleport" v-if="showModal">
        <Transition name="docs-modal">
          <div class="absolute p-9 bg-gray-600 inset-0 flex justify-center items-center bg-opacity-75 z-50" >
            <div class="bg-white rounded-md px-3 py-6 mt-12 shadow-2xl m-6">

              <div class="p-1 max-h-vw">
                <h1 class="text-lg mb-3 text-center">Take a photo</h1>

                <p v-if="cameraErrMsg" class="mb-3 text-xs text-red-500 text-center" >{{ cameraErrMsg }}</p>

                <div class="camera">
                  <video autoplay id="video" class="w-full-l" >Video stream not available.</video>
                </div>
                <div class="not-visible-area ">
                  <canvas id="canvas"></canvas>
                </div>

              </div>

              <div class="mt-4 sm:mt-5 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <Button
                  color="blue"
                  class="w-full inline-flex justify-center  px-4 py-2 sm:col-start-2"
                  id="startbutton"
                >
                  <span>Take a photo</span>
                </Button>

                <Button
                  color="gray"
                  @click.prevent="() => closeCamera()"
                  class="mt-3 w-full inline-flex justify-center px-4 py-2 sm:mt-0 sm:col-start-1"
                >{{ 'Закрыть' }}</Button>
              </div>

            </div>
          </div>
        </Transition>
      </Teleport>
-->

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
