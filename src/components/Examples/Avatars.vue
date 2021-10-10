<script setup>
import Avatar from './../UI/Avatar.vue';
import AvatarGroup from './../UI/AvatarGroup.vue';

const avatars = [
  'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
];
</script>

<template>
  <h2 class="mt-5 mb-1 font-bold text-xl">Аватары</h2>

  <Avatar
    image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    title="Тим Кук"
    subtitle="cook@apple.com"
  />

  <AvatarGroup class="mt-5">
    <Avatar
        v-for="img in avatars"
        :image="img"
        :detail="false"
    />
  </AvatarGroup>

  <AvatarGroup class="mt-5" :images="avatars" />
</template>

<style scoped>

</style>
