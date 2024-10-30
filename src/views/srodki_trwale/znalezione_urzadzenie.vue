<template>
  <Header />
  <p>Urządzenie {Marka}, {Model} o numerze DI {Numer DI}</p>
  <container class="content">
    <div class="form-container">
      <div class="input-container">
        <input type="text" id="marka" class="input-field" placeholder="Marka" />
      </div>
      <div class="input-container">
        <input
          type="text"
          id="kategoria"
          class="input-field"
          placeholder="Kategoria"
        />
      </div>
      <div class="input-container">
        <input
          type="text"
          id="numer_seryjny"
          class="input-field"
          placeholder="Numer Seryjny"
        />
      </div>
      <div class="input-container">
        <input type="text" id="dzial" class="input-field" placeholder="Dział" />
      </div>
      <div class="input-container">
        <input
          type="text"
          id="glowny_uzytkownik"
          class="input-field"
          placeholder="Główny Użytkownik"
        />
      </div>
      <div class="input-container">
        <input
          type="text"
          id="miejsce_uzytkowania"
          class="input-field"
          placeholder="Miejsce użytkowania"
        />
      </div>
      <div class="input-container">
        <input type="text" id="model" class="input-field" placeholder="Model" />
      </div>
      <div class="input-container">
        <input
          type="text"
          id="numer_inwentarzowy"
          class="input-field"
          placeholder="Numer inwentarzowy"
        />
      </div>
      <div class="input-container">
        <input
          type="text"
          id="service_tag"
          class="input-field"
          placeholder="Service TAG"
        />
      </div>
      <div class="input-container">
        <input
          type="text"
          id="lokalizacja"
          class="input-field"
          placeholder="Lokalizacja"
        />
      </div>
      <div class="input-container">
        <input
          type="text"
          id="osoba_odpowiedzialna"
          class="input-field"
          placeholder="Osoba odpowiedzialna"
        />
      </div>
      <div class="input-container">
        <input type="text" id="uwagi" class="input-field" placeholder="Uwagi" />
      </div>
    </div>

    <RouterLink to="/znalezione_urzadzenie">
      <button class="button">USUŃ URZĄDZENIE</button>
    </RouterLink>
    <RouterLink to="/menu">
      <button class="button">MENU GŁÓWNE</button>
    </RouterLink>
    <RouterLink to="/znalezione_urzadzenie">
      <button class="button">EDYTUJ URZĄDZENIE</button>
    </RouterLink>
    <RouterLink to="/znalezione_urzadzenie">
      <button class="button">DRUKUJ QR</button>
    </RouterLink>
    <RouterLink to="/znalezione_urzadzenie">
      <button class="button">DRUKUJ KOD KRESKOWY</button>
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
