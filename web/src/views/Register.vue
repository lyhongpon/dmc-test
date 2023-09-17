<script setup>
import { ref } from "vue";
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { apolloClient, onLogin } from "@/plugins/apollo-client.js";

const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");

const {
  mutate: register,
  error,
  onDone,
} = useMutation(gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      tokens {
        access_token
        user {
          id
          name
          email
        }
      }
      status
    }
  }
`);

const authStore = useAuthStore();
const router = useRouter();
onDone((result) => {
  if (result.data.register.status === "SUCCESS") {
    authStore.loggedIn = true;
    authStore.user = result.data.register.tokens.user;

    onLogin(apolloClient, result.data.register.tokens.access_token);

    // redirect to dashboard
    return router.push({ name: "Dashboard" });
  }
});
</script>

<template>
  <div id="register-page">
    <CForm
      style="width: 380px"
      @submit="
        register({
          input: {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        })
      "
    >
      <CAlert v-if="error" color="danger">
        Cannot register your account.</CAlert
      >
      <div class="mb-3">
        <CFormInput
          v-model="name"
          type="text"
          id="name"
          placeholder="Name"
          aria-describedby="nameHelp"
        />
      </div>
      <div class="mb-3">
        <CFormInput
          v-model="email"
          type="email"
          id="email"
          placeholder="Email"
          aria-describedby="emailHelp"
        />
      </div>
      <CRow>
        <CCol :sm="6">
          <div class="mb-3">
            <CFormInput
              v-model="password"
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>
        </CCol>
        <CCol :sm="6">
          <div class="mb-3">
            <div class="mb-3">
              <CFormInput
                v-model="passwordConfirmation"
                type="password"
                id="password_confirmation"
                placeholder="Confirm Password"
              />
            </div>
          </div>
        </CCol>
      </CRow>

      <CButton type="submit" color="dark" class="w-100 mb-1">
        Create Account
      </CButton>
    </CForm>
  </div>
</template>

<style>
#register-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f1fbff;
}
</style>
