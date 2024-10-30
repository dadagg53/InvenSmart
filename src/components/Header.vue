<template>
  <header class="header">
    <button class="back-button" @click="goBack">Cofnij</button>
    <h1 class="username">Zalogowany jako: {{ username }}</h1>
    <router-link to="/menu" class="home-button">
      <i class="fas fa-home"></i>
      <!-- Ikona domku -->
    </router-link>
    <button class="logout-button" @click="logout">Wyloguj</button>
  </header>
</template>

<script>
export default {
  data() {
    return {
      username: null,
    };
  },
  created() {
    this.username = localStorage.getItem("username");
  },
  methods: {
    goBack() {
      const currentPath = this.$route.path;
      const menuPath = "/menu"; // Ścieżka do menu

      // Sprawdzamy, czy aktualna ścieżka jest inną stroną niż menu
      if (currentPath !== menuPath) {
        this.$router.go(-1); // Cofnięcie do poprzedniej strony
      } else {
        console.warn("Nie można cofnąć z menu."); // Informacja w konsoli
      }
    },
    logout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      this.$router.push("/"); // Przekierowanie do strony logowania
    },
  },
};
</script>

<style scoped>
.header {
  position: fixed; /* Ustawia nagłówek jako stały */
  top: 0; /* Ustala nagłówek na górze */
  left: 0; /* Ustala nagłówek po lewej stronie */
  right: 0; /* Ustala nagłówek po prawej stronie */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa; /* Kolor tła nagłówka */
  padding: 10px 20px; /* Padding wokół nagłówka */
  border-bottom: 1px solid #dee2e6; /* Delikatna linia oddzielająca nagłówek */
  z-index: 1000; /* Zapewnia, że nagłówek będzie nad innymi elementami */
}

.username {
  font-size: 1.2rem; /* Rozmiar czcionki */
  color: #333; /* Kolor tekstu */
}

.back-button,
.logout-button,
.home-button {
  padding: 10px 15px; /* Padding dla przycisków */
  background-color: #007bff; /* Kolor tła przycisku */
  color: white; /* Kolor tekstu przycisku */
  border: none; /* Bez obramowania */
  border-radius: 5px; /* Zaokrąglone rogi */
  cursor: pointer; /* Kursor wskazujący na kliknięcie */
  transition: background-color 0.3s; /* Płynna zmiana koloru tła */
}

.back-button:hover,
.logout-button:hover,
.home-button:hover {
  background-color: #0056b3; /* Kolor tła przycisku po najechaniu */
}

.home-button {
  font-size: 24px; /* Rozmiar ikony */
  display: flex;
  align-items: center; /* Wyśrodkowanie ikony */
}
</style>
