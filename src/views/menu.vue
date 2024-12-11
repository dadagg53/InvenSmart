<template>
  <Header />
  <container class="content">
    <RouterLink to="/srodki_trwale">
      <button class="button">ŚRODKI TRWAŁE</button>
    </RouterLink>
    <RouterLink to="/licencje">
      <button class="button">LICENCJE</button>
    </RouterLink>

    <button class="button">PRZEGLĄDY</button>
    <button class="button">RAPORTY</button>
    <RouterLink to="/kalendarz">
      <button class="button">KALENDARZ</button>
    </RouterLink>
  </container>
</template>
<script>
import Header from "../components/Header.vue"; // Ścieżka do komponentu

export default {
  components: {
    Header,
  },
};
</script>
