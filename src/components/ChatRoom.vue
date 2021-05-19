<template>
  <main>
    <h3>Welcome to ChatRoom {{ chatId }}</h3>
    <User #user="{ user }">
      <ul>
        <li v-for="message of messages" :key="message.id">
          {{ message.text }}
        </li>
      </ul>

      <input type="text" v-model="newMessageText" class="input" />
      <button
        :disabled="!newMessageText || isLoading"
        class="button is-success"
        @click="addMessage(user.uid)"
      >
        Send Message
      </button>
    </User>
  </main>
</template>

<script>
import User from "./User.vue";
import { db } from "../firebase";

export default {
  components: { User },
  data() {
    return {
      newMessageText: "",

      isLoading: false,
    };
  },
  computed: {
    chatId() {
      return this.$route.params.id;
    },
    messagesCollection() {
      return db.doc(`chats/${this.chatId}`).collection("messages");
    },
  },
  firestore() {
    return {
      messages: this.messagesCollection.orderBy("createdAt").limitToLast(10),
    };
  },
  methods: {
    async addMessage(uid) {
      this.isLoading = true;

      const { id: messageId } = this.messagesCollection.doc();

      await this.messagesCollection.doc(messageId).set({
        text: this.newMessageText,
        sender: uid,
        createdAt: Date.now(),
      });

      this.isLoading = false;
      this.newMessageText = "";
    },
  },
};
</script>

<style></style>
