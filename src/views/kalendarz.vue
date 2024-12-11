<template>
  <Header />
  <div class="content">
    <vue-cal
      class="vuecal--blue-theme"
      locale="pl"
      ref="calendar"
      @cell-click="handleCellClick"
      @event-click="editEvent"
    ></vue-cal>
    <button @click="openEventForm" class="add-event-btn">
      Dodaj wydarzenie
    </button>

    <div v-if="showEventForm" class="event-form-overlay">
      <div class="event-form">
        <h3>{{ currentEvent ? "Edytuj wydarzenie" : "Dodaj wydarzenie" }}</h3>
        <form @submit.prevent="addEvent">
          <label for="eventTitle">Tytuł wydarzenia</label>
          <input
            v-model="newEvent.title"
            id="eventTitle"
            type="text"
            required
          />

          <label for="eventDate">Data wydarzenia</label>
          <input v-model="newEvent.date" id="eventDate" type="date" required />

          <label for="eventStartTime">Godzina rozpoczęcia</label>
          <input
            v-model="newEvent.startTime"
            id="eventStartTime"
            type="time"
            required
          />

          <label for="eventEndTime">Godzina zakończenia</label>
          <input
            v-model="newEvent.endTime"
            id="eventEndTime"
            type="time"
            required
          />

          <label for="eventDescription">Opis</label>
          <textarea
            v-model="newEvent.description"
            id="eventDescription"
            rows="4"
          ></textarea>

          <button type="submit" :disabled="isSubmitting">
            Zapisz wydarzenie
          </button>
          <button type="button" @click="closeEventForm">Anuluj</button>
          <button type="button" @click="deleteEvent" v-if="currentEvent">
            Usuń wydarzenie
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import Header from "../components/Header.vue";
import axios from "axios";

export default {
  components: {
    Header,
    VueCal,
  },
  data() {
    return {
      showEventForm: false,
      newEvent: {
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        description: "",
      },
      currentEvent: null,
      isSubmitting: false,
    };
  },
  methods: {
    openEventForm() {
      this.showEventForm = true;
      this.resetEventForm();
    },

    closeEventForm() {
      this.showEventForm = false;
      this.resetEventForm();
    },

    resetEventForm() {
      this.newEvent = {
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        description: "",
      };
      this.currentEvent = null;
    },

    handleCellClick(date) {
      this.newEvent.date = date.toISOString().split("T")[0];
      this.openEventForm();
    },

    editEvent(event) {
      this.newEvent = {
        title: event.title,
        date: event.start.toISOString().split("T")[0],
        startTime: event.start.toTimeString().split(" ")[0].substring(0, 5),
        endTime: event.end.toTimeString().split(" ")[0].substring(0, 5),
        description: event.description || "",
      };
      this.currentEvent = event;
      this.showEventForm = true;
    },

    async addEvent() {
      try {
        this.isSubmitting = true;

        const startDate = new Date(
          `${this.newEvent.date}T${this.newEvent.startTime}`
        );
        const endDate = new Date(
          `${this.newEvent.date}T${this.newEvent.endTime}`
        );

        if (isNaN(startDate) || isNaN(endDate)) {
          throw new Error("Błąd daty lub godziny");
        }

        const eventData = {
          title: this.newEvent.title,
          start: startDate,
          end: endDate,
          description: this.newEvent.description,
        };

        if (this.currentEvent) {
          // Edytowanie istniejącego wydarzenia
          await axios.put(
            `http://localhost:3000/api/events/${this.currentEvent.id}`,
            eventData
          );
          Object.assign(this.currentEvent, eventData);
          if (this.$refs.calendar) {
            this.$refs.calendar.updateEvent(this.currentEvent);
          }
        } else {
          // Dodawanie nowego wydarzenia
          const response = await axios.post(
            "http://localhost:3000/api/events",
            eventData
          );
          if (this.$refs.calendar) {
            this.$refs.calendar.addEvent({
              ...eventData,
              id: response.data.id,
            });
          }
        }

        this.resetEventForm();
        this.closeEventForm();
      } catch (error) {
        console.error("Błąd przy dodawaniu wydarzenia:", error);
        alert("Wystąpił błąd przy dodawaniu wydarzenia.");
      } finally {
        this.isSubmitting = false;
      }
    },

    deleteEvent() {
      if (this.currentEvent) {
        axios
          .delete(`http://localhost:3000/api/events/${this.currentEvent.id}`)
          .then(() => {
            if (this.$refs.calendar) {
              this.$refs.calendar.deleteEvent(this.currentEvent);
            }
            this.resetEventForm();
            this.closeEventForm();
          })
          .catch((error) => {
            console.error("Błąd przy usuwaniu wydarzenia:", error);
            alert("Wystąpił błąd przy usuwaniu wydarzenia.");
          });
      }
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
  position: relative;
}

.vuecal {
  width: 100vw;
  height: 100%;
}

.add-event-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 15px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.add-event-btn:hover {
  background-color: #0056b3;
}

.event-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.event-form {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.event-form h3 {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.event-form label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.event-form input,
.event-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.event-form button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.event-form button[type="button"] {
  background-color: #ccc;
}

.event-form button:hover {
  background-color: #0056b3;
}

.event-form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
