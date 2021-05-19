<template>
  <div class="section">
    <h3>Welcome to ChatRoom {{ chatId }}</h3>

    <router-link to="/">Home</router-link>

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
        <hr />

        <h5>Record Audio</h5>
        <button v-if="!recorder" @click="record()" class="button is-info">
          Record Voice
        </button>
        <button v-else @click="stop()" class="button is-danger">Stop</button>
        <p v-if="errorMessage" class="has-text-danger">{{ errorMessage }}</p>

        <audio v-if="newAudio" :src="newAudioURL"></audio>
        <hr />

        <input
          type="text"
          v-model="newMessageText"
          class="input"
          placeholder="Enter message"
        />

        <button
          :disabled="(!newMessageText && !newAudio) || isLoading"
          class="send-btn button is-success"
          type="text"
          @click="addMessage(user.uid)"
        >
          Send
        </button>
      </div>
      <Login v-else />
    </User>
  </div>
</template>

<script>
import { db, storage } from "../firebase";

import User from "./User.vue";
import ChatMessage from "./ChatMessage";
import Login from "./Login";

export default {
  components: {
    User,
    ChatMessage,
    Login,
  },
  data() {
    return {
      messages: [],

      newMessageText: "",

      newAudio: null,
      recorder: null,

      isLoading: false,
      errorMessage: "",
    };
  },
  computed: {
    chatId() {
      return this.$route.params.id;
    },
    messagesCollection() {
      return db.doc(`chats/${this.chatId}`).collection("messages");
    },
    newAudioURL() {
      return URL.createObjectURL(this.newAudio);
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

      let audioURL = null;

      const { id: messageId } = this.messagesCollection.doc();

      if (this.newAudio) {
        const storageRef = storage
          .ref("chats")
          .child(this.chatId)
          .child(`${messageId}.wav`);

        await storageRef.put(this.newAudio); // .on(); cb for progress pause or cancel

        audioURL = await storageRef.getDownloadURL();
      }

      await this.messagesCollection.doc(messageId).set({
        text: this.newMessageText,
        sender: uid,
        createdAt: Date.now(),
        audioURL,
      });

      this.isLoading = false;
      this.newMessageText = "";
      this.newAudio = null;
    },

    async record() {
      this.newAudio = null;

      this.errorMessage = "";

      let stream = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
      } catch (error) {
        this.errorMessage = error.message;
        return;
      }

      const options = { mimeType: "audio/webm" };
      const recordedChunks = [];
      this.recorder = new MediaRecorder(stream, options);

      this.recorder.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      });

      this.recorder.addEventListener("stop", () => {
        this.newAudio = new Blob(recordedChunks);
        console.log(this.newAudio);
      });

      this.recorder.start();
    },

    async stop() {
      this.recorder.stop();
      this.recorder = null;
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

.send-btn {
  margin-top: 10px;
}
</style>
