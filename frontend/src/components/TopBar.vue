<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">IMExpress</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="!isAuthenticated">
            <a class="nav-link" href="#" @click="showAuth">Authenticate</a>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <a class="nav-link" href="#" @click="logout">De-Auth</a>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link class="nav-link" to="/catalog">Catalog</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <a class="nav-link" href="#">Catalog Search</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <Auth v-if="showAuthComponent" @authenticated="handleAuthenticated" />
  <div class="top-bar">
    <div v-if="!isAuthenticated">You are not authenticated</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Auth from '@/components/Auth.vue';
import eventBus from '../assets/eventBus';

export default {
  name: 'TopBar',
  components: {
    Auth,
  },
  setup() {
    const isAuthenticated = ref(false);
    const showAuthComponent = ref(false);
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        isAuthenticated.value = true;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    const showAuth = () => {
      showAuthComponent.value = true;
    };

    const handleAuthenticated = (token) => {
      isAuthenticated.value = true;
      showAuthComponent.value = false;
      console.log('Authenticated with token:', token);
      // Store the token in localStorage
      localStorage.setItem('authToken', token);
    };

    const logout = () => {
      isAuthenticated.value = false;
      // Remove the token from localStorage
      localStorage.removeItem('authToken');
    };

    const handleDeauth = () => {
      isAuthenticated.value = false;
    };

    onMounted(() => {
      eventBus.on('deauth', handleDeauth);
    });

    return {
      isAuthenticated,
      showAuthComponent,
      showAuth,
      handleAuthenticated,
      logout,
    };
  },
};
</script>

<style scoped>
.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}
.navbar {
  margin-bottom: 20px;
}
</style>
