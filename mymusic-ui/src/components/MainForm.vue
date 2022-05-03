<template>
  <div>
  <p class="headphones"> &#127911;</p>
  <div>
  <p class="track_info">{{ now_play }}</p>
  <button class="btn" @click="dislike">&#128078;</button>
  <button class="btn" @click="prev">&#x23EA;</button>
  <button v-if="!playback" class="btn" @click="start">&#x25B6;</button>
  <button v-if="playback" class="btn" @click="stop">&#9209;</button>
  <button class="btn" @click="next">&#x23E9;</button>
  <button class="btn" @click="like">&#128077;</button>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MainForm',
  props: {
  },
  computed: {
    ...mapState({
      playback: 'playback',
      now_play: 'now_play',
    })
  },
}
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
