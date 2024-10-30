<template>
  <Header />
  <container class="content">
    <RouterLink to="/dodaj">
      <button class="button">DODAJ URZĄDZENIE</button>
    </RouterLink>
    <RouterLink to="/znajdz">
      <button class="button">ZNAJDŹ URZĄDZENIE</button>
    </RouterLink>
    <RouterLink to="/wyszukiwarka_urzadzenia">
      <button class="button">LISTA URZĄDZEŃ</button>
    </RouterLink>
  </container>
</template>
<style scoped>
.content {
  flex-direction: row;
}
.button {
  padding: 15px 0;
}
</style>
<script>
import Header from "../../components/Header.vue"; // Ścieżka do komponentu

export default {
  components: {
    Header,
  },
};
</script>
