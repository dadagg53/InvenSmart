<template>
  <Header />
  <container class="content">
    <div class="form-container">
      <div class="input-container">
        <input
          type="text"
          v-model="marka"
          class="input-field"
          placeholder="Marka"
        />
      </div>
      <div class="input-container">
        <input
          type="text"
          v-model="model"
          class="input-field"
          placeholder="Model"
        />
      </div>
      <div class="input-container">
        <select v-model="kategoria" class="input-field" required>
          <option value="" disabled selected>Kategoria</option>
          <option
            v-for="kategoria in kategorie"
            :key="kategoria.id"
            :value="kategoria.nazwa"
          >
            {{ kategoria.nazwa }}
          </option>
        </select>
      </div>
      <div class="input-container">
        <input
          type="text"
          v-model="numer_seryjny"
          class="input-field"
          placeholder="Numer Seryjny"
          required
        />
      </div>
      <div class="input-container">
        <input
          type="text"
          v-model="numer_inwentarzowy"
          class="input-field"
          placeholder="Numer Inwentarzowy"
        />
      </div>
      <div class="input-container">
        <input
          type="text"
          v-model="service_tag"
          class="input-field"
          placeholder="Service TAG"
        />
      </div>
      <div class="input-container">
        <input
          type="text"
          v-model="dzial"
          class="input-field"
          placeholder="Dział"
          required
        />
      </div>
      <div class="input-container">
        <select v-model="lokalizacja" class="input-field" required>
          <option value="" disabled selected>Lokalizacja</option>
          <option value="Kościerzyna">Kościerzyna</option>
          <option value="Dzierżążno">Dzierżążno</option>
        </select>
      </div>

      <div class="input-container">
        <input
          type="text"
          v-model="glowny_uzytkownik"
          class="input-field"
          placeholder="Główny Użytkownik"
        />
      </div>
      <div class="input-container">
        <input
          type="text"
          v-model="osoba_odpowiedzialna"
          class="input-field"
          placeholder="Osoba Odpowiedzialna"
        />
      </div>
      <div class="input-container">
        <input
          type="text"
          v-model="miejsce_uzytkowania"
          class="input-field"
          placeholder="Miejsce Użytkowania"
        />
      </div>
      <div class="input-container">
        <input
          type="text"
          v-model="uwagi"
          class="input-field"
          placeholder="Uwagi"
        />
      </div>
    </div>
    <button class="button" @click="addDevice">DODAJ URZĄDZENIE</button>
  </container>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.form-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
}

.input-container {
  display: flex;
  flex-direction: column;
}

.input-field {
  width: 100%;
  padding: 10px 5px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
  background-color: transparent;
  color: #fff;
}

.input-field:focus {
  outline: none;
  border-bottom: 1px solid #fff;
}

select.input-field {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 10px 5px;
  border: none;
  border-bottom: 1px solid #ccc;
  background-color: #333;
  color: #fff;
}

select.input-field:focus {
  outline: none;
  border-bottom: 1px solid #fff;
}

::placeholder {
  font-family: "Inter", sans-serif;
  color: #ccc;
}

.button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}
</style>

<script>
import Header from "../../components/Header.vue";
import axios from "axios";

export default {
  components: {
    Header,
  },
  data() {
    return {
      marka: "",
      model: "",
      kategoria: "",
      kategorie: [],
      numer_seryjny: "",
      numer_inwentarzowy: "", // Nowe pole
      service_tag: "",
      dzial: "",
      lokalizacja: "",
      glowny_uzytkownik: "",
      osoba_odpowiedzialna: "",
      miejsce_uzytkowania: "",
      uwagi: "",
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:3000/api/kategorie");
      this.kategorie = response.data;
    } catch (error) {
      console.error("Błąd przy pobieraniu kategorii:", error);
    }
  },
  methods: {
    async addDevice() {
      if (
        !this.marka ||
        !this.model ||
        !this.kategoria ||
        !this.numer_seryjny ||
        !this.dzial
      ) {
        alert("Proszę uzupełnić wszystkie wymagane pola.");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/addDevice",
          {
            marka: this.marka,
            model: this.model,
            kategoria_nazwa: this.kategoria,
            numer_seryjny: this.numer_seryjny,
            numer_inwentarzowy: this.numer_inwentarzowy,
            service_tag: this.service_tag,
            dzial: this.dzial,
            lokalizacja: this.lokalizacja,
            glowny_uzytkownik: this.glowny_uzytkownik,
            osoba_odpowiedzialna: this.osoba_odpowiedzialna,
            miejsce_uzytkowania: this.miejsce_uzytkowania,
            uwagi: this.uwagi,
          }
        );

        this.$router.push({
          path: "/dodano_urzadzenie",
          params: {
            marka: this.marka,
            model: this.model,
          },
        });
      } catch (error) {
        console.error("Błąd przy dodawaniu urządzenia:", error);
        alert("Wystąpił błąd podczas dodawania urządzenia.");
      }
    },
  },
};
</script>
