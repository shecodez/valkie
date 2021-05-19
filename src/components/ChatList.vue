<template>
  <div>
    <ul>
      <li v-for="chat of chats" :key="chat.id">
        <router-link :to="{ name: 'chatroom', params: { id: chat.id } }">
          {{ chat.id }}
        </router-link>
      </li>
    </ul>

    <button @click="createChatRoom()" class="button">
      Create New Chat Room
    </button>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  props: ["uid"],
  data() {
    return {
      chats: [],
    };
  },
  firestore() {
    return {
      chats: db.collection("chats").where("owner", "==", this.uid),
    };
  },
  methods: {
    async createChatRoom() {
      const newChat = await db.collection("chats").add({
        members: [this.uid],
        owner: this.uid,
        createdAt: Date.now(),
      });

      console.log(newChat);
    },
  },
};
</script>

<style></style>
