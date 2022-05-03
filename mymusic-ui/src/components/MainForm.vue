<template>
  <div>
    <p class="headphones">&#127911;</p>
    <div>
      <p class="track_info">{{ now_play }}</p>
      <button class="btn" @click="dislike"><img src="../assets/dislike.png" width="36"></button>
      <button class="btn" @click="next"><img src="../assets/prev.png" width="36"></button>
      <button v-if="!playback" class="btn" @click="play"><img src="../assets/play.png" width="36"></button>
      <button v-if="playback" class="btn" @click="stop"><img src="../assets/stop.png" width="36"></button>
      <button class="btn" @click="next"><img src="../assets/next.png" width="36"></button>
      <button class="btn" @click="like"><img src="../assets/like.png" width="36"></button>
      <!-- &#128078; &#x23EA; &#x25B6; &#9209; &#x23E9; &#128077; -->
    </div>
  </div>
  <audio
    :src="myStream"
    ref="audioPlayer"
    type="audio/ogg"
    preload="auto"
  ></audio>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "MainForm",
  props: {    
  },
  data() {
    return {
      myStream: "",   
    };
  },
  computed: {
    ...mapState({
      auth: "auth",
      playback: "playback",
      now_play: "now_play",
    }),
  },
  methods: {
    ...mapMutations({      
    }),
    ...mapActions({
      controlPlayback: "controlPlayback",
    }),
    play() {      
      this.controlPlayback({
        token: this.auth.token,
        operation: "play",
      });
      function my2(context) {        
        context.myStream = "http://192.168.32.64:8000/stream_" + context.auth.username + ".ogg";
      }
      function my(context) {        
        context.$refs.audioPlayer.load();      
        context.$refs.audioPlayer.play(); 
      }
      setTimeout(() => my2(this), 800);
      setTimeout(() => my(this), 1000);
    },
    stop() {
      const { audioPlayer } = this.$refs;
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      this.myStream = '';   
      this.controlPlayback({
        token: this.auth.token,
        operation: "stop",
      });
    },
    next() {
      if (this.playback) {
        this.controlPlayback({
          token: this.auth.token,
          operation: "next",
        });
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.headphones {
  margin: 0px 0px 0px 0px;
  font-size: 128px;
}

.btn {
  background: black;
  font-size: 24px;
  margin: 10px 0px 20px 0px;
}

.track_info {
  background: black;
  color: white;
  font-size: 16px;
  margin: 10px 0px 10px 0px;
}
</style>
