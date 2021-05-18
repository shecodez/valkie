<template>
  <div>
    <h1>HomePage</h1>
    <User v-slot:user="{ user }">
      <div v-if="user"><Profile :user="user" /></div>
      <Login v-else />
    </User>
  </div>
</template>

<script>
import Login from "./Login";
import User from "./User";
import Profile from "./Profile";

export default {
  components: {
    Login,
    User,
    Profile,
  },
};
</script>

<style></style>
