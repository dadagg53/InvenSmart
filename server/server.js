// Importowanie wymaganych bibliotek
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const cors = require("cors"); // Dodanie biblioteki CORS
const app = express();

// Konfiguracja bazy danych
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "InvenSmart",
  password: "PPx215$Q",
  port: 5432,
});

// Middleware do parsowania JSON i CORS
app.use(express.json());
app.use(cors()); // Umożliwienie CORS

// Ustawienie sekretu do JWT
const SECRET_KEY = "your_secret_key"; // Użyj silniejszego klucza w produkcji

// Funkcja transliterująca nazwę kategorii (usuwa polskie znaki i formatuje)
function transliterateToTableName(categoryName) {
  return categoryName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Usuwanie akcentów
    .replace(/ł/g, "l")
    .replace(/ /g, "_")
    .toLowerCase();
}

// Endpoint do wyszukiwania urządzeń z tabel dynamicznych przy wyborze kategorii
app.get("/api/searchDevices", async (req, res) => {
  const { search, category } = req.query;

  if (!search) {
    return res.status(400).json({ error: "Wyszukiwane słowo jest puste." });
  }

  if (!category) {
    return res.status(400).json({ error: "Kategoria jest wymagana." });
  }

  try {
    // Pobierz dostępne kategorie (nazwy tabel urządzeń)
    const categoriesResult = await pool.query("SELECT * FROM kategorie");
    const categories = categoriesResult.rows;

    if (categories.length === 0) {
      return res.status(404).json({ error: "Brak dostępnych kategorii." });
    }

    // Sprawdzenie, czy podana kategoria istnieje
    const categoryExists = categories.some(
      (cat) => cat.nazwa.toLowerCase() === category.toLowerCase()
    );

    if (!categoryExists) {
      return res.status(404).json({ error: "Kategoria nie istnieje." });
    }

    // Tłumaczenie nazwy kategorii na nazwę tabeli
    const tableName = transliterateToTableName(category);

    // Zapytanie do dynamicznej tabeli
    const query = `
      SELECT * FROM ${tableName}
      WHERE marka ILIKE $1
         OR model ILIKE $1
         OR numer_inwentarzowy ILIKE $1
         OR numer_seryjny ILIKE $1
         OR service_tag ILIKE $1
         OR dzial ILIKE $1
         OR lokalizacja ILIKE $1
         OR glowny_uzytkownik ILIKE $1
         OR osoba_odpowiedzialna ILIKE $1
         OR miejsce_uzytkowania ILIKE $1
         OR uwagi ILIKE $1
    `;

    // Wykonanie zapytania z parametrem search
    const result = await pool.query(query, [`%${search}%`]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Nie znaleziono wyników." });
    }

    res.json(result.rows); // Zwróć wyniki wyszukiwania
  } catch (error) {
    console.error("Błąd podczas wyszukiwania urządzeń:", error);
    res
      .status(500)
      .json({ error: "Wystąpił błąd podczas wyszukiwania urządzeń." });
  }
});

// Endpoint do logowania użytkowników
app.post("/api/login", async (req, res) => {
  const { login, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE login = $1", [
      login,
    ]);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Sprawdzanie, czy konto jest aktywowane
      if (!user.is_active) {
        return res
          .status(403)
          .json({ success: false, message: "Konto nie zostało aktywowane." });
      }

      // Porównanie hasła
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        // Generowanie tokenu JWT
        const token = jwt.sign({ id: user.id, login: user.login }, SECRET_KEY, {
          expiresIn: "1h",
        });

        res.json({ success: true, token }); // Zwróć token
      } else {
        res
          .status(401)
          .json({ success: false, message: "Nieprawidłowe hasło." });
      }
    } else {
      res
        .status(401)
        .json({ success: false, message: "Użytkownik nie został znaleziony." });
    }
  } catch (err) {
    console.error("Błąd serwera:", err);
    res.status(500).json({ success: false, message: "Wystąpił błąd serwera." });
  }
});

// Endpoint do pobierania kategorii
app.get("/api/kategorie", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM kategorie");
    res.json(result.rows); // Zwróć wszystkie kategorie
  } catch (error) {
    console.error("Błąd przy pobieraniu kategorii:", error);
    res
      .status(500)
      .json({ error: "Wystąpił błąd podczas pobierania kategorii." });
  }
});

// Nowy endpoint do dodawania urządzenia do dynamicznie wybranej tabeli
app.post("/api/addDevice", async (req, res) => {
  const {
    marka,
    model,
    kategoria_nazwa, // Nazwa kategorii
    numer_inwentarzowy,
    numer_seryjny,
    service_tag,
    dzial,
    lokalizacja,
    glowny_uzytkownik,
    osoba_odpowiedzialna,
    miejsce_uzytkowania,
    uwagi,
  } = req.body;

  // Transliteracja nazwy kategorii do nazwy tabeli
  const tableName = transliterateToTableName(kategoria_nazwa);

  try {
    // Sprawdzenie, czy tabela istnieje, a jeśli nie, jej utworzenie
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id SERIAL PRIMARY KEY,
        marka TEXT,
        model TEXT,
        numer_inwentarzowy TEXT,
        numer_seryjny TEXT,
        service_tag TEXT,
        dzial TEXT,
        lokalizacja TEXT,
        glowny_uzytkownik TEXT,
        osoba_odpowiedzialna TEXT,
        miejsce_uzytkowania TEXT,
        uwagi TEXT
      );
    `);

    // Dodanie urządzenia do odpowiedniej tabeli
    await pool.query(
      `
      INSERT INTO ${tableName} (marka, model, numer_inwentarzowy, numer_seryjny, service_tag, dzial, lokalizacja, glowny_uzytkownik, osoba_odpowiedzialna, miejsce_uzytkowania, uwagi)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
    `,
      [
        marka,
        model,
        numer_inwentarzowy,
        numer_seryjny,
        service_tag,
        dzial,
        lokalizacja,
        glowny_uzytkownik,
        osoba_odpowiedzialna,
        miejsce_uzytkowania,
        uwagi,
      ]
    );

    res.status(200).json({ message: "Urządzenie dodane pomyślnie!" });
  } catch (error) {
    console.error("Błąd przy dodawaniu urządzenia:", error);
    res
      .status(500)
      .json({ error: "Wystąpił błąd podczas dodawania urządzenia." });
  }
});

// Uruchomienie serwera
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
