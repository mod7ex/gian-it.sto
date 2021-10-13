<script setup>
import StatGroup from '@/UI/StatGroup.vue';
import Stat from '@/UI/Stat.vue';
import { CursorClickIcon, MailOpenIcon, UsersIcon } from '@heroicons/vue/outline';

const stats = [
  { id: 1, name: 'Новых клиентов', stat: '71 897', icon: UsersIcon, change: '122', changeType: 'increase' },
  { id: 2, name: 'Открытых заявок', stat: '58.16%', icon: MailOpenIcon, change: '5.4%', changeType: 'increase' },
  { id: 3, name: 'Переходов', stat: '24.57%', icon: CursorClickIcon, change: '3.2%', changeType: 'decrease', },
];
</script>

<template>
  <h2 class="mt-5 mb-1 font-bold text-xl">Статистики</h2>

  <StatGroup title="Статистика">
    <Stat v-for="stat in stats"
      :title="stat.name"
      :stat="stat.stat"
      :change="stat.change"
      :type="stat.changeType"
      :icon="stat.icon"
      :link="stat.link"
    />
  </StatGroup>
</template>

<style scoped>

</style>
