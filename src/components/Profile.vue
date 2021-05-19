<template>
  <div>
    <span>Logged-in as {{ user.uid }}</span>
    <button @click="auth.signOut()" class="button">Sign Out</button>
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
