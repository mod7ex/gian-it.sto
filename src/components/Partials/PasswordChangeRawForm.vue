<script setup>
import Input from '@/UI/Input.vue';
import service from '~/services/auth/profileChangePassword.js';

const { v$, form } = service();

</script>

<template>
  <div>
      <Input
        label="Новый пароль"
        type="password"
        v-model="form.password"
        @input="v$.password.$touch"
        :error="(v$.password.$error) ? v$.password.$silentErrors[0].$message : ''"
      />
      <Input
        label="Повторите пароль"
        type="password"
        v-model="form.confirmPassword"
        @input="v$.confirmPassword.$touch"
        :error="(v$.confirmPassword.$error) ? v$.confirmPassword.$silentErrors[0].$message : ''"
      />
  </div>
</template>
