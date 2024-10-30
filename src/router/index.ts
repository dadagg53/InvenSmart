import { createRouter, createWebHistory } from "vue-router";
import Auth from "../auth.js";
import Register from "../components/register.vue";
import AdminPanel from "../components/adminpanel.vue";
import Login from "../views/login.vue";
import Menu from "../views/menu.vue";
import Kalendarz from "../views/kalendarz.vue";
import Srodki_trwale from "../views/srodki_trwale/srodki_trwale.vue";
import Dodaj from "../views/srodki_trwale/dodaj.vue";
import Dodano_urzadzenie from "../views/srodki_trwale/dodano_urzadzenie.vue";
import Znajdz from "../views/srodki_trwale/znajdz.vue";
import Znalezione_urzadzenie from "../views/srodki_trwale/znalezione_urzadzenie.vue";
import Lista_urzadzen from "../views/srodki_trwale/lista_urzadzen.vue";
import Wyszukiwarka_urzadzenia from "../views/srodki_trwale/wyszukiwarka_urzadzenia.vue";
import Drukuj_barcode from "../views/srodki_trwale/drukuj_barcode.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/admin_panel",
    name: "admin_panel",
    component: AdminPanel,
    meta: { requiresAuth: true }, // Ochrona trasy
  },
  {
    path: "/menu",
    name: "menu",
    component: Menu,
    meta: { requiresAuth: true }, // Ochrona trasy
  },
  {
    path: "/kalendarz",
    name: "kalendarz",
    component: Kalendarz,
    meta: { requiresAuth: true }, // Ochrona trasy
  },
  {
    path: "/srodki_trwale",
    name: "srodki_trwale",
    component: Srodki_trwale,
    meta: { requiresAuth: true }, // Ochrona trasy
  },
  {
    path: "/dodaj",
    name: "dodaj",
    component: Dodaj,
    meta: { requiresAuth: true }, // Ochrona trasy
  },
  {
    path: "/dodano_urzadzenie",
    name: "dodano_urzadzenie",
    component: Dodano_urzadzenie,
    meta: { requiresAuth: true }, // Ochrona trasy
    props: true,
  },
  {
    path: "/znajdz",
    name: "znajdz",
    component: Znajdz,
    meta: { requiresAuth: true }, // Ochrona trasy
  },
  {
    path: "/znalezione_urzadzenie",
    name: "znalezione_urzadzenie",
    component: Znalezione_urzadzenie,
    meta: { requiresAuth: true }, // Ochrona trasy
  },
  {
    path: "/wyszukiwarka_urzadzenia",
    name: "wyszukiwarka_urzadzenia",
    component: Wyszukiwarka_urzadzenia,
    meta: { requiresAuth: true }, // Ochrona trasy
  },
  {
    path: "/lista_urzadzen",
    name: "lista_urzadzen",
    component: Lista_urzadzen,
    meta: { requiresAuth: true }, // Ochrona trasy
  },
  {
    path: "/drukuj_barcode",
    name: "drukuj_barcode",
    component: Drukuj_barcode,
    meta: { requiresAuth: true }, // Ochrona trasy
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Dodaj guard do sprawdzania autoryzacji
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !Auth.isAuthenticated()) {
    next("/"); // Jeśli użytkownik nie jest zalogowany, przekierowuje na stronę logowania
  } else {
    next();
  }
});

export default router;
