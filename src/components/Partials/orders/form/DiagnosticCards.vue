<script setup>
import Avatar from '@/UI/Avatar.vue';

</script>

<template>
    <div class="px-2">

      <div class="justify-between flex px-2">
        <Avatar
          title="Василий Пупкин"
          subtitle="Турбинный цех"
          image="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        />

        <div class="text-sm text-center">
          <div class="text-gray-500">Автомобиль</div>
          <div>Марка автомобиля</div>
        </div>

        <div class="text-right text-sm">
          <div class="text-gray-500">Дата заполнения</div>
          <div>11.07.2021 11:20</div>
        </div>
      </div>

      <div class="mt-5 border px-6">
        <div v-for="i in [1,2,3,4,5,6]" :key="i" class="border-b py-8">
          <div class="font-bold text-lg">Жалоба на турбокомпрессор</div>

          <div class="my-3">
            <b>Ответ:</b> Нет мощности тяги
          </div>

          <div>
            <b>Рекомендация:</b>

            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam animi, consequuntur culpa deleniti dolore nulla possimus vel! At atque dolore eaque eligendi magnam mollitia nam numquam obcaecati quae, recusandae. Adipisci aliquam dignissimos dolorem et exercitationem expedita fuga, in ipsa iste laboriosam, magnam modi porro praesentium provident quasi quisquam velit?
          </div>
        </div>
      </div>
    </div>
</template>
