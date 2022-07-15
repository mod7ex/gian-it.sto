<script setup>
defineProps({
  payload: Object,
});

/*
  id: '',
  department_id: current,

  name: '',
  options: [''],

  params: [{ options: [''] }], // { title: '', options: ['lorum ipsom'] }
  comment: { title: '', content: '' },
  note: '',
*/

const my_paylaod = {
  name: 'lorum ipsom problem',
  options: ['some ran optio', 'the othe fake option', 'the third random one', 'and again one more', 'almost done one else'],

  params: [
    { title: 'Lorem title dolor', options: ['some ran optio', 'the othe fake option', 'the third random one', 'and again one more', 'almost done one else'] },
  ],

  comment: { title: 'The comment title goes here', content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, distinctio?' },

  note: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, distinctio? adipisicing elit. Quia, distinctio?',
};

</script>

<template>
  <div id="card-preview" class="text-center border-gray-300 border-2">
    <h2 class="text-center mb-6">Диагностическая карта <span>&#8470;</span> <span>&#95;&#95;&#95;&#95;&#95;</span></h2>

    <div class="grid grid-cols-12 border-black border-2">
      <span class="col-span-4"><b>Дата: </b>some lorum data</span>
      <span class="col-span-4"><b>Авто: </b>some lorum data</span>
      <span class="col-span-4"><b>&#8470;: </b>some lorum data</span>
    </div>

  </div>
</template>
