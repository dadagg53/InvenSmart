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

// Endpoint do dodawania urządzenia
app.post("/api/urzadzenia", async (req, res) => {
  const {
    marka,
    model,
    kategoria, // Używamy nazwy kategorii
    numer_seryjny,
    service_tag,
    dzial,
    lokalizacja,
    glowny_uzytkownik,
    osoba_odpowiedzialna,
    miejsce_uzytkowania,
    uwagi,
  } = req.body;

  try {
    // Ustalamy prefix DI w zależności od kategorii
    const categoryPrefix = {
      komputery: "k", // użyj nazwy kategorii
      monitory: "m",
      drukarki: "d",
      inne: "i",
    };

    // Uzyskujemy i aktualizujemy ostatni numer dla danej kategorii
    const categoryResult = await pool.query(
      "UPDATE kategorie_numeracja SET ostatni_numer = ostatni_numer + 1 WHERE kategoria = $1 RETURNING ostatni_numer",
      [kategoria] // Użyj nazwy kategorii
    );

    // Sprawdzanie, czy kategoria istnieje
    if (categoryResult.rowCount === 0) {
      return res.status(400).json({ error: "Kategoria nie istnieje." });
    }

    const newNumber = categoryResult.rows[0].ostatni_numer;

    // Generujemy numer DI w odpowiednim formacie
    const diNumber = `di-${categoryPrefix[kategoria]}-${newNumber}`;

    // Dodajemy urządzenie do bazy
    const result = await pool.query(
      "INSERT INTO urzadzenia (marka, model, kategoria, numer_inwentarzowy, numer_seryjny, service_tag, dzial, lokalizacja, glowny_uzytkownik, osoba_odpowiedzialna, miejsce_uzytkowania, uwagi) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id",
      [
        marka,
        model,
        kategoria, // Używamy kategoria
        diNumber, // Używamy nowego numeru jako numeru inwentarzowego
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

    res.status(201).json({ message: "Urządzenie dodane pomyślnie!", diNumber });
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
