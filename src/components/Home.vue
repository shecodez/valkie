<template>
  <div>
    <h1>HomePage</h1>
    <User v-slot:user="{ user }">
      <div v-if="user">
        <Profile :user="user" />
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
