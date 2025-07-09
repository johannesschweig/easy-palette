import "./assets/main.css";
import { createPinia } from 'pinia'
import { createApp } from "vue";
import App from "./App.vue";
import { updateFaviconFromURL } from "./utils";

const pinia = createPinia()
const app = createApp(App)

updateFaviconFromURL()

app.use(pinia)
app.mount('#app')