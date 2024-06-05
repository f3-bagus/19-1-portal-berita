import { createApp } from "vue";
import "./style.css";
import App from "./views/App.vue";
import router from "./router";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

createApp(App).use(router).mount("#app");
