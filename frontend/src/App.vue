<template>
  <div id="landing-page" class=" d-flex flex-column">
    <!-- Top Bar Component -->
    <TopBar />

    <!-- Body Component -->
    <BodySection />

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script>
import TopBar from "./components/TopBar.vue";
import BodySection from "./components/BodySection.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "LandingPage",
  components: {
    TopBar,
    BodySection,
    Footer,
  },
};
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css';

  #landing-page {
    font-family: Arial, sans-serif;
  }
</style>
