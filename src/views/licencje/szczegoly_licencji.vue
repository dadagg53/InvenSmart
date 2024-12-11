<template>
  <Header />
  <div class="license-details">
    <h2>Szczegóły licencji</h2>
    <div v-if="license">
      <p><strong>Tytuł: </strong> {{ "&nbsp;" + license.nazwa }}</p>
      <p>
        <strong>Numer licencji:</strong> {{ "&nbsp;" + license.numer_seryjny }}
      </p>
      <p>
        <strong>Data rozpoczęcia:</strong>
        {{ "&nbsp;" + formatDate(license.data_rozpoczecia) }}
      </p>
      <p>
        <strong>Data ważności:</strong>
        {{ "&nbsp;" + formatDate(license.data_zakonczenia) }}
      </p>
      <p>
        <strong>Status:</strong>
        <span
          :class="{
            'active-status': license.status === 'Active',
            'non-active-status': license.status === 'Non Active',
          }"
        >
          {{ "&nbsp;" + license.status }}
        </span>
      </p>
      <p><strong>Opis:</strong> {{ "&nbsp;" + license.opis }}</p>
    </div>
    <div v-else>
      <p>Ładowanie szczegółów...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../../components/Header.vue";

export default {
  components: { Header },
  data() {
    return {
      license: null,
    };
  },
  created() {
    this.fetchLicense();
  },

  methods: {
    formatDate(dateString) {
      const date = new Date(dateString); // Zamień string na obiekt Date
      const day = String(date.getDate()).padStart(2, "0"); // Dzień (zawsze 2 cyfry)
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Miesiąc (dodajemy 1, ponieważ miesiące są numerowane od 0)
      const year = date.getFullYear(); // Rok

      return `${day}-${month}-${year}`; // Formatowanie daty
    },
    async fetchLicense() {
      const { id } = this.$route.params;
      try {
        const response = await axios.get(
          `http://localhost:3000/api/licenses/${id}`
        );
        this.license = response.data;
      } catch (error) {
        console.error("Błąd podczas pobierania szczegółów licencji:", error);
      }
    },
  },
};
</script>

<style scoped>
.license-details {
  padding: 20px;
}
h2 {
  text-align: center; /* Wyśrodkowanie nagłówka */
}
p {
  font-size: 18px;
  margin: 5px 0;
}
.active-status {
  color: green; /* Zielony kolor dla statusu 'Active' */
  font-weight: bold;
}

.non-active-status {
  color: red; /* Czerwony kolor dla statusu 'Non Active' */
  font-weight: bold;
}
</style>
