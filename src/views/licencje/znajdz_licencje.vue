<template>
  <Header />
  <div class="search-container">
    <h2>Wyszukaj licencję</h2>
    <form @submit.prevent="searchLicenses">
      <label for="searchTerm">Numer licencji lub tytuł</label>
      <input
        v-model="searchTerm"
        id="searchTerm"
        type="text"
        placeholder="Wpisz numer lub tytuł"
        required
      />

      <button type="submit">Szukaj</button>
    </form>

    <div v-if="licenses.length > 0">
      <h3>Wyniki wyszukiwania</h3>
      <ul>
        <li v-for="license in licenses" :key="license.id">
          <RouterLink :to="'/szczegoly_licencji/' + license.id"
            >{{ license.nazwa }} - {{ license.numer_seryjny }}</RouterLink
          >
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Brak wyników.</p>
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
      searchTerm: "",
      licenses: [],
    };
  },
  methods: {
    async searchLicenses() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/licenses/search",
          {
            params: { term: this.searchTerm },
          }
        );
        this.licenses = response.data;
      } catch (error) {
        console.error("Błąd podczas wyszukiwania licencji:", error);
        alert("Wystąpił błąd przy wyszukiwaniu licencji.");
      }
    },
  },
};
</script>

<style scoped>
.search-container {
  padding: 20px;
}

form {
  margin-bottom: 20px;
}

form input {
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

form button:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

li a {
  color: #007bff;
  text-decoration: none;
}

li a:hover {
  text-decoration: underline;
}
</style>
