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
      <button class="button" @click="register">Register</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>

      <RouterLink to="/">
        <button class="button">Posiadasz konto? Zaloguj się.</button>
      </RouterLink>
    </div>
  </container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/register",
          {
            login: this.username,
            password: this.password,
          }
        );
        if (response.data.success) {
          this.successMessage = "Registration successful!";
          this.errorMessage = "";
        } else {
          this.errorMessage = response.data.message;
          this.successMessage = "";
        }
      } catch (error) {
        this.errorMessage = "An error occurred during registration";
        this.successMessage = "";
        console.error(error);
      }
    },
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

.success {
  color: green;
  margin-top: 10px;
}
</style>
