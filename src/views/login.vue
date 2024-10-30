<template>
  <container class="content">
    <header>
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/logo.jpg"
        width="125"
        height="125"
      />
    </header>
    <div class="form-container">
      <div class="input-container">
        <input
          type="text"
          v-model="username"
          class="input-field"
          placeholder="Username"
        />
      </div>
      <div class="input-container">
        <input
          type="password"
          v-model="password"
          class="input-field"
          placeholder="Password"
        />
      </div>
      <button class="button" @click="login">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <RouterLink to="/register">
        <button class="button">Nie posiadasz konta? Zarejestruj się.</button>
      </RouterLink>
    </div>
  </container>
</template>

<script>
import axios from "axios";
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:3000/api/login", {
          login: this.username,
          password: this.password,
        });
        console.log("Response from server:", response.data);
        if (response.data.success) {
          // Zapisz token w localStorage
          localStorage.setItem("authToken", response.data.token); // Upewnij się, że serwer zwraca token
          localStorage.setItem("username", this.username);
          this.$router.push("/menu");
        } else {
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          this.errorMessage = "Konto nie zostało aktywowane.";
        } else {
          this.errorMessage = "Wystąpił błąd podczas logowania";
        }
        console.error("Login error:", error);
      }
    },
  },
  components: {
    RouterLink,
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-container {
  margin-bottom: 10px;
}

.input-field {
  width: 200px;
  padding: 10px;
}

.button {
  padding: 10px 20px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
