<template>
  <Header />
  <div class="form-container">
    <form @submit.prevent="submitForm" class="licencja-form">
      <h2>Dodaj Licencję</h2>

      <div class="form-group">
        <label for="nazwa">Nazwa Licencji</label>
        <input type="text" v-model="nazwa" required />
      </div>

      <div class="form-group">
        <label for="typ">Typ Licencji</label>
        <input type="text" v-model="typ" required />
      </div>

      <div class="form-group">
        <label for="data_rozpoczecia">Data Rozpoczęcia</label>
        <input type="date" v-model="data_rozpoczecia" />
      </div>

      <div class="form-group">
        <label for="data_zakonczenia">Data Zakończenia</label>
        <input type="date" v-model="data_zakonczenia" />
      </div>

      <div class="form-group">
        <label for="numer_seryjny">Numer Seryjny</label>
        <input type="text" v-model="numer_seryjny" />
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <input type="text" v-model="status" />
      </div>

      <div class="form-group">
        <label for="opis">Opis</label>
        <textarea v-model="opis"></textarea>
      </div>

      <button type="submit" class="btn-submit">Dodaj Licencję</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../../components/Header.vue";
export default {
  components: { Header },
  data() {
    return {
      nazwa: "",
      typ: "",
      data_rozpoczecia: "",
      data_zakonczenia: "",
      numer_seryjny: "",
      status: "",
      opis: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/addLicense",
          {
            nazwa: this.nazwa,
            typ: this.typ,
            data_rozpoczecia: this.data_rozpoczecia,
            data_zakonczenia: this.data_zakonczenia,
            numer_seryjny: this.numer_seryjny,
            status: this.status,
            opis: this.opis,
          }
        );

        console.log("Licencja dodana:", response.data);
        alert("Licencja została dodana pomyślnie!");
      } catch (error) {
        console.error("Błąd przy dodawaniu licencji:", error);
        alert("Wystąpił błąd przy dodawaniu licencji.");
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #1e1e1e;
  color: #fff;
}

.licencja-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  max-width: 600px;
  width: 100%;
}

h2 {
  text-align: center;
  color: #fff;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 14px;
  color: #ccc;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px 5px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
  background-color: transparent;
  color: #fff;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-bottom: 1px solid #007bff;
}

textarea {
  resize: vertical;
  min-height: 120px;
}

button.btn-submit {
  padding: 12px 24px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}

button.btn-submit:hover {
  background-color: #0056b3;
}
</style>
