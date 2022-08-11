<script setup>
import useAuth from '~/composables/useAuth';
import Avatar from '@/UI/Avatar.vue';

const { user } = useAuth();
</script>

<template>
  <Avatar
    :title="`${user.name} ${user.surname} ${user.middlename ?? ''}`"
    :image="user.avatar"
    :worker="true"
  >
    <template #subtitle >
      <!-- Работник <span class="text-gray-900">{{ user.department?.name }}</span> начал смену в <time :datetime="'2020-08-25'">__:__</time> -->
    </template>
  </Avatar>
</template>
