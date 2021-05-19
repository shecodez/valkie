<template>
  <div id="app">
    <header>
      <h1>Valkie (Vue walkie talkie)</h1>
      <p>Realtime voice chat messenger</p>
    </header>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
header {
  text-align: center;
}
button,
input {
  margin-bottom: 10px;
}
</style>
