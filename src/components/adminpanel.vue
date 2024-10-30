<template>
  <div class="admin-panel">
    <h1>Admin Panel</h1>
    <div class="user-list">
      <ul>
        <li v-for="user in users" :key="user.id" class="user-item">
          <div class="user-info">
            <div class="login-container">
              <span class="login">{{ user.login }}</span>
            </div>
            <span
              :class="{
                'status-active': user.is_active,
                'status-inactive': !user.is_active,
              }"
            >
              {{ user.is_active ? "Active" : "Inactive" }}
            </span>
          </div>
          <div class="actions">
            <button
              v-if="!user.is_active"
              @click="activateUser(user.id)"
              class="activate-button"
            >
              Activate
            </button>
            <button
              v-if="user.is_active"
              @click="deactivateUser(user.id)"
              class="deactivate-button"
            >
              Deactivate
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        this.users = response.data.users;
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    },
    async activateUser(userId) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/activate",
          {
            userId,
          }
        );
        if (response.data.success) {
          this.fetchUsers(); // Refresh the list of users
        }
      } catch (error) {
        console.error("Failed to activate user:", error);
      }
    },
    async deactivateUser(userId) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/deactivate",
          {
            userId,
          }
        );
        if (response.data.success) {
          this.fetchUsers(); // Refresh the list of users
        }
      } catch (error) {
        console.error("Failed to deactivate user:", error);
      }
    },
  },
};
</script>

<style scoped>
.admin-panel {
  background-color: #2d2d2d;
  color: #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  margin: 20px auto;
}

h1 {
  font-family: "JetBrains Mono", monospace;
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  color: #e0e0e0;
}

.user-list {
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.user-item {
  background-color: #3c3c3c;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.user-item:hover {
  background-color: #4d4d4d;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.login-container {
  background-color: #4d4d4d;
  padding: 8px 12px;
  border-radius: 5px;
  margin-bottom: 8px;
}

.login {
  font-size: 16px;
  color: #e0e0e0;
}

.status-active {
  color: #28a745;
  font-weight: bold;
  background-color: rgba(40, 167, 69, 0.2); /* Light green background */
  padding: 5px 10px;
  border-radius: 5px;
}

.status-inactive {
  color: #dc3545;
  font-weight: bold;
  background-color: rgba(220, 53, 69, 0.2); /* Light red background */
  padding: 5px 10px;
  border-radius: 5px;
}

.actions {
  display: flex;
  gap: 10px;
}

.activate-button,
.deactivate-button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.activate-button {
  background-color: #007bff;
  color: #fff;
}

.activate-button:hover {
  background-color: #0056b3;
}

.deactivate-button {
  background-color: #dc3545;
  color: #fff;
}

.deactivate-button:hover {
  background-color: #c82333;
}

.activate-button:active,
.deactivate-button:active {
  transform: scale(0.98);
}
</style>
