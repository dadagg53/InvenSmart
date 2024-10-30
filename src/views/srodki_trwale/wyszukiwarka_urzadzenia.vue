<template>
  <Header />
  <container class="content">
    <p>Wybierz kategorię</p>

    <RouterLink to="/dodano_urzadzenie">
      <button class="button">Kategoria</button>
    </RouterLink>
    <RouterLink to="/lista_urzadzen">
      <button class="button">SZUKAJ</button>
    </RouterLink>
  </container>
</template>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px; /* Dodanie odstępu między elementami siatki */
  width: 100%;
  max-width: 800px; /* Maksymalna szerokość formularza */
}

.input-container:nth-child(-n + 6) {
  grid-column: 1; /* Pierwsze 6 pól w pierwszej kolumnie */
}

.input-container:nth-child(n + 7) {
  grid-column: 2; /* Kolejne pola w drugiej kolumnie */
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

::placeholder {
  font-family: "Inter", sans-serif;
  color: #ccc;
}
</style>
