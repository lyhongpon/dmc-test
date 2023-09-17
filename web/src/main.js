import { createApp, provide, h } from "vue";
import App from "@/App.vue";
import router from "@/router";
import CoreuiVue from "@coreui/vue";
import CIcon from "@coreui/icons-vue";
import { iconsSet as icons } from "@/assets/icons";
import { createPinia } from "pinia";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "./plugins/apollo-client.js";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(CoreuiVue);

app.provide("icons", icons);
app.component("CIcon", CIcon);

app.mount("#app");
