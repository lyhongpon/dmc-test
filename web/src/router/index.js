import { createRouter, createWebHashHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout";
import auth from "@/middleware/auth";

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
        meta: {
          middleware: [auth],
        },
      },
      {
        path: "/customers",
        name: "Customer",
        component: () => import("@/views/Customer.vue"),
        meta: {
          middleware: [auth],
        },
      },
      {
        path: "/lookup-customer",
        name: "LookupCustomer",
        component: () => import("@/views/LookupCustomer.vue"),
        meta: {
          middleware: [auth],
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index, 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

export default router;
