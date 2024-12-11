<template>
  <Header />
  <div class="content">
    <!-- Dodanie nowej licencji -->
    <RouterLink to="/dodaj_licencje">
      <button class="button">DODAJ LICENCJĘ</button>
    </RouterLink>

    <!-- Wyszukiwanie licencji -->
    <RouterLink to="/znajdz_licencje">
      <button class="button">ZNAJDŹ LICENCJĘ</button>
    </RouterLink>

    <!-- Lista licencji -->
    <RouterLink to="/lista_licencji">
      <button class="button">LISTA LICENCJI</button>
    </RouterLink>

    <!-- Zarządzanie licencjami (np. edycja, usuwanie) -->
    <RouterLink to="/zarzadzaj_licencjami">
      <button class="button">ZARZĄDZAJ LICENCJAMI</button>
    </RouterLink>
  </div>
</template>

<script>
import Header from "../../components/Header.vue"; // Ścieżka do komponentu

export default {
  components: {
    Header,
  },
};
</script>
