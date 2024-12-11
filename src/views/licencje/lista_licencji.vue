<template>
  <Header />
  <div class="license-list">
    <h2>Lista licencji</h2>

    <!-- Filtrowanie -->
    <div class="filters">
      <label for="status">Status:</label>
      <select v-model="filterStatus" @change="fetchLicenses">
        <option value="">Wszystkie</option>
        <option value="Active">Active</option>
        <option value="Non Active">Non Active</option>
      </select>

      <input
        v-model="searchQuery"
        @input="fetchLicenses"
        type="text"
        placeholder="Wyszukaj..."
      />
    </div>

    <!-- Tabela licencji -->
    <table>
      <thead>
        <tr>
          <th @click="sort('nazwa')">Tytuł</th>
          <th @click="sort('numer_seryjny')">Numer licencji</th>
          <th @click="sort('data_rozpoczecia')">Data rozpoczęcia</th>
          <th @click="sort('data_zakonczenia')">Data zakończenia</th>
          <th @click="sort('status')">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="license in licenses" :key="license.id">
          <td>{{ license.nazwa }}</td>
          <td>{{ license.numer_seryjny }}</td>
          <td>{{ formatDate(license.data_rozpoczecia) }}</td>
          <td>{{ formatDate(license.data_zakonczenia) }}</td>
          <td>{{ license.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../../components/Header.vue";

export default {
  components: { Header },
  data() {
    return {
      licenses: [],
      filterStatus: "", // Status filtrowania
      searchQuery: "", // Tekst wyszukiwania
      sortKey: "", // Klucz dla sortowania
      sortDirection: "asc", // Kierunek sortowania
    };
  },
  created() {
    this.fetchLicenses();
  },
  methods: {
    async fetchLicenses() {
      try {
        const response = await axios.get("http://localhost:3000/api/licenses", {
          params: {
            status: this.filterStatus,
            search: this.searchQuery,
            sort: this.sortKey,
            direction: this.sortDirection,
          },
        });
        this.licenses = response.data;
      } catch (error) {
        console.error("Błąd podczas pobierania licencji:", error);
      }
    },
    sort(key) {
      if (this.sortKey === key) {
        // Zmieniamy kierunek sortowania, jeśli kliknięto tę samą kolumnę
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        // Ustawiamy nową kolumnę i domyślnie rosnący kierunek
        this.sortKey = key;
        this.sortDirection = "asc";
      }
      this.fetchLicenses(); // Ponownie ładujemy dane po zmianie sortowania
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
  },
};
</script>

<style scoped>
.license-list {
  padding: 20px;
}

h2 {
  text-align: center;
}

.filters {
  margin-bottom: 20px;
}

input {
  margin-left: 10px;
}

select {
  margin-left: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
}

th {
  cursor: pointer;
}

th:hover {
  background-color: #f0f0f0;
}
</style>
