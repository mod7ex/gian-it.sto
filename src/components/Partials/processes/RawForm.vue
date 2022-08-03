<script setup>
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import form from '~/services/processes/form';
import store from '~/store/processes/why';

const { options, load } = store;

const { process, atMounted, v$ } = form();

await (async ()=>{
    await load();
    await atMounted();
})();

</script>

<template>
    <div>
      <div>
        <Input
          label="Название"
          v-model="process.name"
          :required="true"
          :error="v$.name.$errors[0]?.$message"
          @blured="v$.name.$touch"
        />
      </div>

      <div>
        <Select
          label="Причина обращения"
          :options="options"
          v-model="process.appeal_reason_id"
          :required="true"
          :error="v$.appeal_reason_id.$errors[0]?.$message"
          @blured="v$.appeal_reason_id.$touch"
        />
      </div>
    </div>
</template>
