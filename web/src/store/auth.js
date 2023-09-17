import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({ loggedIn: false, user: null }),
  getters: {
    isLoggedIn: (state) => state.loggedIn,
  },
});
