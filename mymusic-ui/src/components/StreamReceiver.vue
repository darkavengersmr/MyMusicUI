<template>
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
  props: {},
  data() {
    return {
      myStream: "",
      myPlayer: null,
      mySample: null,
      mode: null,
    };
  },
  computed: {
    ...mapState({
        auth: "auth",
        prefs: "prefs",
    }),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
    }),
    play() {    
      function url(context) {        
        context.myStream = "/stream_" + context.auth.username + ".ogg";
      }
      function play(context) {        
        context.myPlayer.load();
        context.myPlayer.play();        
      }
      setTimeout(() => url(this), 800);
      setTimeout(() => play(this), 1000);
    },
    stop() {
      this.myPlayer.pause();
      this.myPlayer.currentTime = 0;
      this.myStream = "";
    },
    next() {
      function url(context) {
        context.myStream = "/stream_" + context.auth.username + ".ogg";        
      }
      function start(context) {        
        context.myPlayer.load();
        if (context.prefs.radio_effect) {
          context.stopSound();
        }
        context.myPlayer.play();        
      }
      url(this);
      setTimeout(() => start(this), 1500);
    },
    startSound() {      
      this.mySample.currentTime = Math.random() * 20;      
      this.mySample.play();            
    },
    stopSound() {
      this.mySample.pause();
    },
  },
  mounted() {
    this.mySample = new Audio(require('@/music/radio_effect.mp3'));
    this.mySample.loop = true;
    this.mySample.load();
    const { audioPlayer } = this.$refs;
    this.myPlayer = audioPlayer;
    if (this.prefs.radio_effect) {
      this.myPlayer.oncanplay = this.stopSound;
      this.myPlayer.addEventListener('waiting', this.startSound);      
    }    
  },
};
</script>


