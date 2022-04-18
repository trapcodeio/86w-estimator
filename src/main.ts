import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./tailwind.css";
import "./scss/main.scss";

const app = createApp(App);

app.use(router);
app.mount("#app");
