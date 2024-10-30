<template>
  <Header />
  <p>Dodano urządzenie {{ marka }}, {{ model }} o numerze DI {{ numer_di }}</p>
  <container class="content">
    <RouterLink to="/srodki_trwale">
      <button class="button">DRUKUJ QR</button>
    </RouterLink>
    <RouterLink to="/drukuj_barcode">
      <button class="button">DRUKUJ KOD KRESKOWY</button>
    </RouterLink>
    <RouterLink to="/dodaj">
      <button class="button">DODAJ KOLEJNE URZĄDZENIE</button>
    </RouterLink>
    <RouterLink to="/menu">
      <button class="button">MENU GŁÓWNE</button>
    </RouterLink>
  </container>
</template>

<script>
import Header from "../../components/Header.vue"; // Ścieżka do komponentu

export default {
  components: {
    Header,
  },
  data() {
    return {
      marka: this.$route.query.marka || "", // Odbierz markę z query params
      model: this.$route.query.model || "", // Odbierz model z query params
      numer_di: this.$route.query.numer_di || "", // Odbierz numer DI z query params
    };
  },
};
</script>
