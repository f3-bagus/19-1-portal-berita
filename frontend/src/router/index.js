import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import NewsPage from "../views/NewsPage.vue";
import ContactUs from "../views/ContactUs.vue";
import SavedNews from "../views/SavedNews.vue";
import Contributor from "../views/contributor/Contributor.vue";
import AddNews from "../views/contributor/AddNews.vue";
import Admin from "../views/admin/Admin.vue";
import ManageUser from "../views/admin/ManageUser.vue";
import ManageAuthor from "../views/admin/ManageAuthor.vue";
import ManageCategory from "../views/admin/ManageCategory.vue";
import ManageNews from "../views/admin/ManageNews.vue";
import EditProfilePage from "../views/EditProfilePage.vue";
import ManageMessages from "../views/admin/ManageMessages.vue";
import ContributorProfile from "../views/contributor/Profile.vue";
import CategoryNews from "../views/CategoryNews.vue";
import Notification from "../views/Notification.vue";
import EditProfileAuthor from "../views/contributor/EditProfile.vue"

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
    component: EditProfilePage,
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
    path: "/category/:id",
    name: "CategoryNews",
    component: CategoryNews,
  },
  {
    path: "/notification",
    name: "Notification",
    component: Notification,
  },
  {
    path: "/contributor",
    name: "Contributor",
    component: Contributor,
    meta: { requiresAuth: true, role: "author" },
  },
  {
    path: "/add-news",
    name: "AddNews",
    component: AddNews,
    meta: { requiresAuth: true, role: "author" },
  },
  {
    path: "/author-profile",
    name: "ContributorProfile",
    component: ContributorProfile,
    meta: { requiresAuth: true, role: "author" },
  },
  {
    path: "/edit-profile-author",
    name: "EditProfileAuthor",
    component: EditProfileAuthor,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/manage-user",
    name: "ManageUser",
    component: ManageUser,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/manage-author",
    name: "ManageAuthor",
    component: ManageAuthor,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/manage-category",
    name: "ManageCategory",
    component: ManageCategory,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/manage-news",
    name: "ManageNews",
    component: ManageNews,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/manage-messages",
    name: "ManageMessages",
    component: ManageMessages,
    meta: { requiresAuth: true, role: "admin" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const userRole = localStorage.getItem("userRole");

  if (requiresAuth && !userRole) {
    next({ name: "Login" });
  } else if (requiresAuth && to.meta.role !== userRole) {
    next({ name: "LandingPage" });
  } else {
    next();
  }
});

export default router;
