<template>
  <div id="app">
    <header>
      <h1>Valkie (Vue walkie talkie)</h1>
      <p>Realtime voice chat messenger</p>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
import { auth } from "./firebase";

console.log(auth);

export default {
  name: "App",
  components: {},
};
</script>

<style></style>
