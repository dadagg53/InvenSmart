export default {
  isAuthenticated() {
    return !!localStorage.getItem("authToken"); // Sprawdza, czy token jest zapisany
  },
  getToken() {
    return localStorage.getItem("authToken"); // Możesz zmienić tę metodę, aby zwracała dane użytkownika
  },
  getUserData() {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1])); // Dekodowanie tokena JWT
      return payload; // Zwraca dane użytkownika (np. login)
    }
    return null;
  },
};
