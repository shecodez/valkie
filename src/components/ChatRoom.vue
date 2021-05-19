<template>
  <main>
    <h3>Welcome to ChatRoom {{ chatId }}</h3>
    <User #user="{ user }">
      <div v-if="user">
        <ul>
          <li v-for="message of messages" :key="message.id">
            <ChatMessage
              :message="message"
              :isOwner="user.uid === message.sender"
            />
          </li>
        </ul>

        <input type="text" v-model="newMessageText" class="input" />
        <button
          :disabled="!newMessageText || isLoading"
          class="button is-success"
          type="text"
          @click="addMessage(user.uid)"
        >
          Send Message
        </button>
      </div>
    </User>
  </main>
</template>

<script>
import { db } from "../firebase";

import User from "./User.vue";
import ChatMessage from "./ChatMessage";

export default {
  components: { User, ChatMessage },
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

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-width: 500px;
  background-color: #efefef;
  padding: 10px;
  border-radius: 0;
}
li {
  display: flex;
}
</style>
