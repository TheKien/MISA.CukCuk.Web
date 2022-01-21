<template>
  <div id="app">
    <TheNavbar />

    <TheHeader />
    <TheContent />
  </div>
</template>

<script>
import TheNavbar from "./layouts/TheNavbar";
import TheHeader from "./layouts/TheHeader";
import TheContent from "./layouts/TheContent";
export default {
  name: "App",
  components: {
    TheNavbar,
    TheHeader,
    TheContent,
  },
};
</script>

<style scoped>
@import url("./assets/css/main.css");
</style>
