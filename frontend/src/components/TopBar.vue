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
            <a class="nav-link" href="#" @click="showAuth">Login</a>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <a class="nav-link" href="#" @click="logout">Logout</a>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <a class="nav-link" href="#">Catalog</a>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <a class="nav-link" href="#">Catalog Search</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <Auth v-if="showAuthComponent" @authenticated="handleAuthenticated" />
</template>

<script>
import { ref, computed } from 'vue';
import Auth from '@/components/Auth.vue';

export default {
  name: "TopBar",
  components: {
    Auth
  },
  setup() {
    const showAuthComponent = ref(false);
    const isAuthenticated = ref(!!sessionStorage.getItem('authToken'));

    const showAuth = () => {
      showAuthComponent.value = true;
    };

    const handleAuthenticated = (token) => {
      sessionStorage.setItem('authToken', token);
      isAuthenticated.value = true;
      alert('You are authenticated');
      showAuthComponent.value = false;
    };

    const logout = () => {
      sessionStorage.removeItem('authToken');
      isAuthenticated.value = false;
      alert('You are logged out');
    };

    return {
      showAuthComponent,
      isAuthenticated,
      showAuth,
      handleAuthenticated,
      logout
    };
  }
};
</script>

<style scoped>
.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
