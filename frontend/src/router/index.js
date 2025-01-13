import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Catalog from "@/components/Catalog.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/catalog",
    name: "Catalog",
    component: Catalog,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
