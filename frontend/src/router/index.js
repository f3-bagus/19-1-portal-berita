import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import NewsPage from "../views/NewsPage.vue";
import EditProfile from "../views/EditProfile.vue";
import ContactUs from "../views/ContactUs.vue";
import SavedNews from "../views/SavedNews.vue";
import Contributor from "../views/Contributor.vue";
import AddNews from "../views/AddNews.vue";
import Admin from "../views/Admin.vue";
import ManageUser from "../views/ManageUser.vue";

const routes = [
  {
    path: "/",
    name: "LandingPage",
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
    path: "/edit-profile",
    name: "EditProfile",
    component: EditProfile,
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
  {
    path: "/news/:id",
    name: "News",
    component: NewsPage,
    props: true,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/contact-us",
    name: "ContactUs",
    component: ContactUs,
  },
  {
    path: "/saved-news",
    name: "SavedNews",
    component: SavedNews,
  },
  {
    path: "/contributor",
    name: "Contributor",
    component: Contributor,
  },
  {
    path: "/addnews",
    name: "AddNews",
    component: AddNews,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/manageUser",
    name: "ManageUser",
    component: ManageUser,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
