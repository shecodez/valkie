<template>
  <div class="section">
    <h1>HomePage</h1>
    <User v-slot:user="{ user }">
      <div v-if="user">
        <h3>User Profile</h3>
        <Profile :user="user" />

        <h3>My Chat Rooms</h3>
        <ChatList :uid="user.uid" />
      </div>
      <Login v-else />
    </User>
  </div>
</template>

<script>
import Login from "./Login";
import User from "./User";
import Profile from "./Profile";
import ChatList from "./ChatList";

export default {
  components: {
    Login,
    User,
    Profile,
    ChatList,
  },
};
</script>

<style></style>
