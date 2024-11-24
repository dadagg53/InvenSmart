<template>
  <Header />
  <div class="drukuj-barcode">
    <h1>Generowanie kodu kreskowego</h1>
    <Barcode :value="qrData" />
    <!-- Przekazanie wartości do komponentu Barcode -->
  </div>
</template>

<script>
import Barcode from "@/components/barcode.vue"; // Importowanie komponentu Barcode
import Header from "../../components/Header.vue"; // Ścieżka do komponentu
import axios from "axios";

export default {
  name: "DrukujBarcode",
  components: {
    Barcode, // Rejestracja komponentu Barcode
    Header,
  },
  data() {
    return {
      qrData: "", // Zmienna do przechowywania danych do kodu QR
    };
  },
  async created() {
    const id = this.$route.params.id; // Pobranie ID z parametru trasy
    try {
      const response = await axios.get(
        `http://localhost:3000/api/device/${id}` // Pobranie danych urządzenia
      );
      const device = response.data;

      // Upewnij się, że 'kategoria' i 'id' są poprawnie zdefiniowane
      this.qrData = `DI${device.kategoria[0]}${device.id}`; // Ustawienie wartości do kodu QR
      console.log("Dane do QR:", this.qrData); // Sprawdzenie wartości QR
    } catch (error) {
      console.error("Błąd przy pobieraniu danych urządzenia:", error);
    }
  },
};
</script>

<style scoped>
.drukuj-barcode {
  text-align: center;
  margin-top: 20px;
}
</style>
