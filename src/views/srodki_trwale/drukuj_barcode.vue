<template>
  <Header />
  <div class="drukuj-barcode">
    <h1>Generowanie kodu kreskowego</h1>
    <Barcode :value="'123456789012'" />
    <!-- Przekazanie wartości do komponentu Barcode -->
  </div>
</template>

<script>
import Barcode from "@/components/barcode.vue"; // Importowanie komponentu Barcode
import Header from "../../components/Header.vue"; // Ścieżka do komponentu

export default {
  name: "DrukujBarcode",
  components: {
    Barcode, // Rejestracja komponentu Barcode
  },
  components: {
    Header,
  },
  // Dodatkowe opcje widoku
};
</script>

<style scoped>
.drukuj-barcode {
  text-align: center;
  margin-top: 20px;
}
</style>
