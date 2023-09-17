import { useAuthStore } from "@/store/auth";

export default function auth({ next }) {
  const store = useAuthStore();
  if (!store.isLoggedIn) {
    return next({ name: "Login" });
  }

  return next();
}
