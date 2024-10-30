<template>
  <Header />
  <div class="content">
    <vue-cal class="vuecal--blue-theme" locale="pl"></vue-cal>
  </div>
</template>

<script>
// Documentation: https://antoniandre.github.io/vue-cal

import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import Header from "../components/Header.vue"; // Ścieżka do komponentu

export default {
  components: {
    Header,
    VueCal,
  },
};
</script>

<style scoped>
html,
body {
  height: 100%; /* Ustawia wysokość na 100% dla całego dokumentu */
  margin: 0; /* Usuwa domyślne marginesy */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%; /* Ustawia wysokość na 100% dla aplikacji */
}

.content {
  display: flex; /* Umożliwia użycie flexboxa */
  justify-content: center; /* Wyrównuje kalendarz do środka */
  align-items: center; /* Wyrównuje kalendarz w pionie */
  height: calc(
    100vh - 60px
  ); /* Odejmowanie wysokości nagłówka (przy założeniu, że header ma 60px) */
}

.vuecal {
  width: 100vw; /* Szerokość kalendarza na 100% widoku */
  height: 100%; /* Wysokość kalendarza na 100% rodzica */
}
</style>
