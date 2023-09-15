import { createRouter, createWebHashHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout";

const routes = [
  {
    path: "/",
    name: "Home",
    component: DefaultLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard.vue"),
      },
      {
        path: "/customers",
        name: "Customer",
        component: () => import("@/views/Customer.vue"),
      },
      {
        path: "/purchases",
        name: "Purchase",
        component: () => import("@/views/Purchase.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
