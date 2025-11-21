import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import App from "./App.vue";
import router from "./router";

// Define your custom theme
const customTheme = {
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    primary: "#1976D2",
    "primary-darken-1": "#1565C0",
    secondary: "#424242",
    "secondary-darken-1": "#1D1D1D",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme,
    },
  },
  defaults: {
    global: {
      color: "primary", // sets primary as the default for all components that support color
    },
  },
});

const app = createApp(App);

app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount("#app");
