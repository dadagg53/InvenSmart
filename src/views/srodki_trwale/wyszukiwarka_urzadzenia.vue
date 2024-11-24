<template>
  <div class="select-category">
    <h2 class="page-title">Wybierz kategorię urządzenia</h2>

    <!-- Formularz wyboru kategorii -->
    <form @submit.prevent="submitCategory" class="category-form">
      <div class="form-group">
        <label for="category" class="form-label">Wybierz kategorię</label>
        <select
          v-model="selectedCategory"
          id="category"
          required
          class="form-input"
        >
          <option value="" disabled>Wybierz kategorię</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.nazwa"
          >
            {{ category.nazwa }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Zatwierdź wybór</button>
    </form>

    <!-- Lista urządzeń -->
    <div v-if="devices.length > 0" class="device-list">
      <h3>Lista urządzeń</h3>
      <ul>
        <li v-for="device in devices" :key="device.id" class="device-item">
          <strong>{{ device.marka }} - {{ device.model }}</strong>
          <p>Numer inwentarzowy: {{ device.numer_inwentarzowy }}</p>
          <p>Numer seryjny: {{ device.numer_seryjny }}</p>
        </li>
      </ul>
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
      selectedCategory: "", // Wybrana kategoria
      categories: [], // Lista kategorii
      devices: [], // Lista urządzeń
      errorMessage: "", // Komunikaty o błędach
    };
  },
  methods: {
    // Pobierz dostępne kategorie z serwera
    async fetchCategories() {
      try {
        const response = await axios.get("http://localhost:3000/api/kategorie");
        this.categories = response.data; // Załadowanie kategorii do listy
      } catch (error) {
        console.error("Błąd przy ładowaniu kategorii:", error);
        this.errorMessage = "Nie udało się załadować kategorii.";
      }
    },

    // Pobierz urządzenia dla wybranej kategorii
    async fetchDevices() {
      if (!this.selectedCategory) {
        this.errorMessage = "Proszę wybrać kategorię.";
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/urzadzenia",
          {
            params: {
              category: this.selectedCategory, // Wysyłamy wybraną kategorię
            },
          }
        );
        this.devices = response.data; // Załadowanie urządzeń do listy
        this.errorMessage = ""; // Resetowanie komunikatu o błędzie
      } catch (error) {
        console.error("Błąd przy pobieraniu urządzeń:", error);
        this.errorMessage = "Nie udało się pobrać urządzeń.";
        this.devices = [];
      }
    },

    // Obsługuje wybór kategorii
    submitCategory() {
      this.fetchDevices(); // Pobiera urządzenia po wybraniu kategorii
    },
  },
  mounted() {
    this.fetchCategories(); // Pobranie dostępnych kategorii po załadowaniu komponentu
  },
};
</script>

<style scoped>
p {
  color: black;
}
/* Kontener formularza */
.select-category {
  width: 100%; /* Kontener zajmuje całą szerokość ekranu */
  margin: 0 auto;
  padding: 30px;
  background-color: #f4f6f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Dla ekranów większych niż 1200px */
@media (min-width: 1200px) {
  .select-category {
    width: 80%; /* Ustawiamy kontener na 80% szerokości ekranu */
    max-width: 1200px; /* Maksymalna szerokość kontenera na dużych ekranach */
  }
}

.page-title {
  font-size: 2em;
  font-weight: 700;
  color: #333;
  margin-bottom: 25px;
  text-align: center;
}

.category-form {
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

.device-list {
  margin-top: 30px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.device-list h3 {
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

.error-message {
  margin-top: 20px;
  padding: 12px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 6px;
  font-size: 1em;
  text-align: center;
}
</style>
