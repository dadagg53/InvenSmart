<template>
  <Header />
  <div class="management-container">
    <h2>Zarządzaj Licencjami</h2>

    <div class="actions">
      <button @click="fetchLicenses" class="btn">Pobierz Licencje</button>
    </div>

    <div class="licenses" v-if="licenses.length > 0">
      <h3>Lista Licencji:</h3>
      <ul>
        <li v-for="license in licenses" :key="license.id" class="license-item">
          <p><strong>Nazwa:</strong> {{ license.nazwa }}</p>
          <p><strong>Typ:</strong> {{ license.typ }}</p>
          <p><strong>Numer Seryjny:</strong> {{ license.numer_seryjny }}</p>
          <p><strong>Status:</strong> {{ license.status }}</p>
          <button @click="editLicense(license)" class="btn-edit">Edytuj</button>
          <button @click="deleteLicense(license.id)" class="btn-delete">
            Usuń
          </button>
        </li>
      </ul>
    </div>

    <div v-else class="no-licenses">
      <p>
        Brak licencji do wyświetlenia. Kliknij "Pobierz Licencje", aby załadować
        dane.
      </p>
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
      licenses: [],
    };
  },
  methods: {
    async fetchLicenses() {
      try {
        const response = await axios.get("http://localhost:3000/api/licenses");
        this.licenses = response.data;
      } catch (error) {
        console.error("Błąd podczas pobierania licencji:", error);
        alert("Wystąpił błąd podczas pobierania licencji.");
      }
    },
    editLicense(license) {
      const updatedName = prompt("Podaj nową nazwę licencji", license.nazwa);
      if (updatedName) {
        this.updateLicense(license.id, { ...license, nazwa: updatedName });
      }
    },
    async updateLicense(id, updatedLicense) {
      try {
        await axios.put(
          `http://localhost:3000/api/licenses/${id}`,
          updatedLicense
        );
        this.licenses = this.licenses.map((license) =>
          license.id === id ? { ...license, ...updatedLicense } : license
        );
        alert("Licencja została zaktualizowana.");
      } catch (error) {
        console.error("Błąd podczas aktualizacji licencji:", error);
        alert("Wystąpił błąd podczas aktualizacji licencji.");
      }
    },
    async deleteLicense(id) {
      try {
        await axios.delete(`http://localhost:3000/api/licenses/${id}`);
        this.licenses = this.licenses.filter((license) => license.id !== id);
        alert("Licencja została usunięta.");
      } catch (error) {
        console.error("Błąd podczas usuwania licencji:", error);
        alert("Wystąpił błąd podczas usuwania licencji.");
      }
    },
  },
};
</script>

<style scoped>
.management-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #1e1e1e;
  color: #fff;
}

.actions {
  margin-bottom: 20px;
}

.licenses ul {
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
}

.license-item {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #2e2e2e;
  display: flex;
  flex-direction: column;
}

.license-item p {
  margin: 5px 0;
}

.btn {
  padding: 10px 20px;
  font-size: 14px;
  color: #fff;
  background-color: #007bff;
  border: none;
  cursor: pointer;
  margin-right: 10px;
}

.btn:hover {
  background-color: #0056b3;
}

.btn-edit {
  background-color: #28a745;
}

.btn-edit:hover {
  background-color: #218838;
}

.btn-delete {
  background-color: #dc3545;
}

.btn-delete:hover {
  background-color: #c82333;
}

.no-licenses {
  color: #ccc;
  margin-top: 20px;
}
</style>
