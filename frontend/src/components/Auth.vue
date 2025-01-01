<script setup>
import { ref } from 'vue';
import api from '@/api';
import { defineEmits } from 'vue';

const token = ref(null);
const error = ref(null);
const emit = defineEmits(['authenticated']);

const Authenticate = async () => {
  try {
    const response = await api.authenticate();
    token.value = response.data.token;
    emit('authenticated', token.value);
  } catch (err) {
    error.value = 'Failed to authenticate: ' + err;
    console.error(err);
  }
};

Authenticate();
</script>

<template>
  <div>
    <p v-if="token">Token: {{ token }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
