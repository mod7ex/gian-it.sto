<script setup>
import Card from '@/UI/Card.vue';
import Avatar from '@/UI/Avatar.vue';
import Button from '@/UI/Button.vue';
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center p-6 lg:p-0">
    <Card class="mx-auto lg:w-1/2 w-full" main-classes="">
      <template #header>
        Выберите нового работника
      </template>

      <router-link to="/w/tasks" v-for="item in [1, 2, 3]" class="py-4 px-4 border-b block">
        <Avatar
          image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          title="Тим Кук"
          subtitle="cook@apple.com"
        />
      </router-link>

      <template #footer>
        <div>
          <Button color="blue">
            Выйти из системы
          </Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>

</style>
