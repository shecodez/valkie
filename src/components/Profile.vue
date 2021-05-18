<template>
  <div>
    <h3>Logged-in as {{ user.uid }}</h3>
    <button @click="auth.signOut()">Sign Out</button>
  </div>
</template>

<script>
import { auth } from "../firebase";

export default {
  props: ["user"],
  data() {
    return {
      auth,
    };
  },
};
</script>
