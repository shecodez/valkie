<template>
  <aside class="section">
    <h3>Sign In Anonymously</h3>
    <button @click="auth.signInAnonymously()" class="button">Sign In</button>

    <div v-if="isNewUser">
      <h3>Sign Up for a New Account</h3>
      <a href="#" @click="isNewUser = false">Returning User?</a>
    </div>
    <div v-else>
      <h3>Sign In with Email</h3>
      <a href="#" @click="isNewUser = true">Need an Account?</a>
    </div>

    <label for="email">Email</label><br />
    <input v-model="email" type="email" placeholder="email" class="input" />

    <label for="password">Password</label><br />
    <input
      v-model="password"
      type="password"
      placeholder="password"
      class="input"
    />

    <button
      @click="signInOrCreateUser()"
      class="button is-info"
      :class="{ 'is-loading': isLoading }"
    >
      {{ isNewUser ? "Sign Up" : "Login" }}
    </button>

    <p v-if="errorMessage" class="has-text-danger">{{ errorMessage }}</p>
  </aside>
</template>

<script>
import { auth } from "../firebase";

export default {
  data() {
    return {
      auth,

      isNewUser: false,
      email: "",
      password: "",

      isLoading: false,
      errorMessage: "",
    };
  },

  methods: {
    async signInOrCreateUser() {
      this.isLoading = true;
      this.errorMessage = "";

      try {
        if (this.isNewUser) {
          await auth.createUserWithEmailAndPassword(this.email, this.password);
        } else {
          await auth.signInWithEmailAndPassword(this.email, this.password);
        }
      } catch (error) {
        this.errorMessage = error.message;
      }

      this.isLoading = false;
    },
  },
};
</script>

<style></style>
