<template>
  <div class="container-fluid d-flex align-items-center justify-content-center text-center full-page">
    <div>
      <h1 class="display-4">Welcome Ingram Micro Express VueJS</h1>
      <p class="lead">This proof of concept is to show how you can use the API of Ingram Micro for resellers</p>
      <button class="btn btn-primary btn-lg mt-4">Get Started</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BodySection",
};
</script>

<style scoped>
.full-page {
  width: 100vw;
  height: 100vh;
}
h1 {
  margin-bottom: 1rem;
}
</style>
