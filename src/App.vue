<template>
  <div id="app">
    <header>
      <h1>Valkie (Vue walkie talkie)</h1>
      <p>Realtime voice chat messenger</p>
    </header>

    <main class="content">
      <router-view></router-view>
    </main>
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
