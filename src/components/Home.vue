<template>
  <div>
    <h1>HomePage</h1>
    <User v-slot:user="{ user }">
      <div v-if="user">Logged-in as {{ user.uid }}</div>
      <Login v-else />
    </User>
  </div>
</template>

<script>
import Login from "./Login";
import User from "./User";

export default {
  components: {
    Login,
    User,
  },
};
</script>

<style></style>
