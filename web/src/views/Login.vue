<script setup>
import { ref } from "vue";
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { apolloClient, onLogin } from "@/plugins/apollo-client.js";

const username = ref("");
const password = ref("");

const {
  mutate: login,
  error,
  onDone,
} = useMutation(gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      access_token
      user {
        id
        name
        email
      }
    }
  }
`);

const authStore = useAuthStore();
const router = useRouter();
onDone((result) => {
  if (result.data.login?.access_token) {
    authStore.loggedIn = true;
    authStore.user = result.data.login.user;

    onLogin(apolloClient, result.data.login.access_token);

    // redirect to dashboard
    router.push({ name: "Dashboard" });
  }
});
</script>

<template>
  <div id="login-page">
    <CForm
      style="width: 350px"
      @submit="login({ input: { username, password } })"
    >
      <CAlert v-if="error" color="danger">
        Incorrect email and password.</CAlert
      >
      <div class="mb-3">
        <CFormInput
          v-model="username"
          type="email"
          id="email"
          placeholder="Email"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <CFormInput
          v-model="password"
          type="password"
          id="password"
          placeholder="Password"
        />
      </div>
      <CButton type="submit" color="dark" shape="btn-pill" class="w-100 mb-1">
        Login
      </CButton>
      <div class="text-center">
        <router-link :to="{ name: 'Register' }" class="text-decoration-none">
          <small>Register an account</small>
        </router-link>
      </div>
    </CForm>
  </div>
</template>

<style>
#login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f1fbff;
}
</style>
