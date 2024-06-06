import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";

const routes = [
  {
    path: "/",
    name: "Landing Page",
    component: LandingPage,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
