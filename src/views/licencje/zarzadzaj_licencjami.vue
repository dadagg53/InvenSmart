<template>
  <Header />
  <div class="manage-licenses">
    <h2>Zarządzaj licencjami</h2>
    <ul>
      <li v-for="license in licenses" :key="license.id">
        <RouterLink :to="'/szczegoly-licencji/' + license.id">{{
          license.title
        }}</RouterLink>
        <button @click="editLicense(license.id)">Edytuj</button>
        <button @click="deleteLicense(license.id)">Usuń</button>
        <button @click="archiveLicense(license.id)">Archiwizuj</button>
      </li>
    </ul>
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
  created() {
    this.fetchLicenses();
  },
  methods: {
    async fetchLicenses() {
      try {
        const response = await axios.get("/api/licenses");
        this.licenses = response.data;
      } catch (error) {
        console.error("Błąd podczas pobierania licencji:", error);
      }
    },
    editLicense(id) {
      this.$router.push(`/edytuj-licencje/${id}`);
    },
    async deleteLicense(id) {
      if (confirm("Czy na pewno chcesz usunąć tę licencję?")) {
        try {
          await axios.delete(`/api/licenses/${id}`);
          this.fetchLicenses();
        } catch (error) {
          console.error("Błąd przy usuwaniu licencji:", error);
        }
      }
    },
    async archiveLicense(id) {
      try {
        await axios.put(`/api/licenses/archive/${id}`);
        this.fetchLicenses();
      } catch (error) {
        console.error("Błąd przy archiwizowaniu licencji:", error);
      }
    },
  },
};
</script>

<style scoped>
.manage-licenses {
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
