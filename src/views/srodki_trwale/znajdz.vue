<template>
  <div class="find-devices">
    <h2 class="page-title">Wyszukaj urządzenia</h2>

    <!-- Formularz wyszukiwania -->
    <form @submit.prevent="searchDevices" class="search-form">
      <div class="form-group">
        <label for="category" class="form-label">Wybierz kategorię</label>
        <select
          v-model="selectedCategory"
          id="category"
          required
          class="form-input"
        >
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.nazwa"
          >
            {{ category.nazwa }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="search" class="form-label">Wyszukaj urządzenia</label>
        <input
          type="text"
          v-model="searchQuery"
          id="search"
          placeholder="Szukaj po marce, modelu..."
          required
          class="form-input"
        />
      </div>

      <!-- Checkbox do wyboru typu wyszukiwania 
      <div class="form-group">
        <label for="exactMatch" class="form-label">
          <input type="checkbox" v-model="exactMatch" id="exactMatch" />
          Szukaj dokładnie (pełne słowo)
        </label>
      </div>-->

      <button type="submit" class="btn btn-primary">Szukaj</button>
    </form>

    <!-- Lista wyników wyszukiwania -->
    <div v-if="devices.length > 0" class="search-results">
      <h3 class="results-title">Wyniki wyszukiwania</h3>
      <ul>
        <li v-for="device in devices" :key="device.id" class="device-item">
          <strong>{{ device.marka }} - {{ device.model }}</strong>
          <p>Numer inwentarzowy: {{ device.numer_inwentarzowy }}</p>
          <p>Numer seryjny: {{ device.numer_seryjny }}</p>
          <p>Lokalizacja: {{ device.lokalizacja }}</p>
        </li>
      </ul>
    </div>

    <!-- Komunikat, gdy nie ma wyników -->
    <div v-else-if="searched" class="no-results">
      <p>Brak wyników do wyświetlenia.</p>
    </div>

    <!-- Komunikat o błędzie -->
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: "", // Wartość wyszukiwania
      selectedCategory: "", // Wybrana kategoria
      categories: [], // Lista kategorii
      devices: [], // Wyniki wyszukiwania
      exactMatch: false, // Flaga dla dokładnego dopasowania
      searched: false, // Flaga, aby wiedzieć, że wyszukiwanie było wykonane
      errorMessage: "", // Komunikaty o błędach
    };
  },
  methods: {
    // Pobierz dostępne kategorie z serwera
    async fetchCategories() {
      try {
        const response = await axios.get("http://localhost:3000/api/kategorie");
        this.categories = response.data;
      } catch (error) {
        console.error("Błąd przy ładowaniu kategorii:", error);
        this.errorMessage = "Nie udało się załadować kategorii.";
      }
    },

    // Wyszukiwanie urządzeń
    async searchDevices() {
      if (!this.searchQuery || !this.selectedCategory) {
        this.errorMessage = "Proszę podać słowo kluczowe i wybrać kategorię.";
        return;
      }

      // Określamy rodzaj dopasowania na podstawie checkboxa
      const matchType = this.exactMatch ? "=" : "ILIKE"; // Jeżeli checkbox jest zaznaczony, używamy '=' dla dokładnego dopasowania, w przeciwnym razie 'ILIKE' dla częściowego dopasowania

      try {
        const response = await axios.get(
          "http://localhost:3000/api/searchDevices",
          {
            params: {
              search: this.searchQuery,
              category: this.selectedCategory,
              matchType: matchType, // Wysyłamy typ dopasowania
            },
          }
        );
        this.devices = response.data;
        this.searched = true;
        this.errorMessage = ""; // Resetowanie komunikatu błędu
      } catch (error) {
        console.error("Błąd przy wyszukiwania urządzeń:", error);
        this.errorMessage = "Wystąpił błąd podczas wyszukiwania urządzeń.";
        this.devices = [];
      }
    },
  },
  mounted() {
    // Pobranie dostępnych kategorii po załadowaniu komponentu
    this.fetchCategories();
  },
};
</script>

<style scoped>
/* Dodajemy style, które wcześniej były zaproponowane */
.find-devices {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f4f6f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

p {
  color: black;
}

.page-title {
  font-size: 2em;
  font-weight: 700;
  color: #333;
  margin-bottom: 25px;
}

.search-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-weight: 600;
  color: #4b4b4b;
  margin-bottom: 8px;
}

.form-input {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
  color: #333;
  width: 100%;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: #007bff;
  outline: none;
}

.btn {
  padding: 14px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.search-results {
  margin-top: 30px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.results-title {
  font-size: 1.6em;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
}

.device-item {
  border-bottom: 1px solid #ddd;
  padding: 12px 0;
  color: #333;
}

.device-item strong {
  font-size: 1.3em;
  color: #333;
}

.device-item p {
  margin: 5px 0;
  font-size: 1em;
}

.device-item:hover {
  background-color: #f0f8ff;
}

.no-results {
  margin-top: 30px;
  color: #777;
}

.error-message {
  margin-top: 20px;
  padding: 12px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 6px;
  font-size: 1em;
}
</style>
