<template>
  <div class="message" :class="{ 'from-user': isOwner }">
    <p>{{ message.text }}</p>
    <span class="sender">from uid: {{ message.sender }}</span>
  </div>
</template>

<script>
export default {
  props: ["message", "isOwner"],
};
</script>

<style>
.message {
  background-color: #e6a2c9;
  color: black;
  margin-left: 10px;
  margin-right: auto;
  border-radius: 5px;
  padding: 12px;
  display: inline-flex;
  flex-direction: column;
}
.from-user {
  background-color: #bbb;
  margin-right: 10px;
  margin-left: auto;
}
.sender {
  font-size: 0.8rem;
}
</style>
