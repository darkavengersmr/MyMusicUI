<template>
  <div>
    <p class="headphones">&#127911;</p>
    <div>
      <p class="track_info">{{ now_play }}</p>
      <button class="btn" @click="dislike">
        <img src="../assets/dislike.png" width="36" />
      </button>
      <button class="btn" @click="next">
        <img src="../assets/prev.png" width="36" />
      </button>
      <button v-if="!playback" class="btn" @click="play">
        <img src="../assets/play.png" width="36" />
      </button>
      <button v-if="playback" class="btn" @click="stop">
        <img src="../assets/stop.png" width="36" />
      </button>
      <button class="btn" @click="next">
        <img src="../assets/next.png" width="36" />
      </button>
      <button class="btn" @click="like">
        <img src="../assets/like.png" width="36" />
      </button>
      <!-- &#128078; &#x23EA; &#x25B6; &#9209; &#x23E9; &#128077; -->
    </div>
    <div>
      <button
        v-bind:class="{ btn: true, filter: true, genres: mode == 'genres' }"
        @click="getGenres"
      >
        Жанры
      </button>
      <button
        v-bind:class="{ btn: true, filter: true, years: mode == 'years' }"
        @click="getYears"
      >
        Эпохи
      </button>
      <button
        v-bind:class="{ btn: true, filter: true, moods: mode == 'moods' }"
        @click="getMoods"
      >
        Настроения
      </button>
      <button
        v-bind:class="{ btn: true, filter: true, favorites: mode == 'favorites' }"
        @click="getFavorites"
      >
        Избранное
      </button>
    </div>

    <div class="map" v-if="mode == 'genres'">
      <div class="list">
        <div v-for="(item, idx) in genres" :key="idx">
          <div class="item_genres" @click="setFilter({ mode:'genre', item: item })">
              {{item}}
          </div>
        </div>
      </div>
    </div>

    <div class="map" v-if="mode == 'years'">
      <div class="list">
        <div v-for="(item, idx) in years" :key="idx">
          <div class="item_years" @click="setFilter({ mode:'year', item: item })">
              {{item}}-е
          </div>
        </div>
      </div>
    </div>

    <div class="map" v-if="mode == 'moods'">
      <div class="list">
        <div v-for="(item, idx) in moods" :key="idx">
          <div class="item_moods">
              {{ item }}
          </div>
        </div>
      </div>
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
  props: {},
  data() {
    return {
      myStream: "",
      mode: null,
    };
  },
  computed: {
    ...mapState({
      auth: "auth",
      playback: "playback",
      now_play: "now_play",      
      genres: "genres",
      artists_by_genre: "artists_by_genre",
      years: "years",
      moods: "moods",
    }),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
      controlPlayback: "controlPlayback",
      getObj: "getObj",
      createObj: "createObj",
      confirmNowPlay: "confirmNowPlay",
    }),
    play() {
      this.controlPlayback({
        token: this.auth.token,
        operation: "play",
      });
      function my2(context) {
        context.myStream = "/stream_" + context.auth.username + ".ogg";
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
      this.myStream = "";
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
    getGenres() {
      this.mode = "genres";
      this.getObj({
        url: "/filter",
        storepoint: "setGenres",
        params: { mode: "genres", limit_tracks: 100 },
      });
    },
    getArtistsByGenre(genre) {
      this.mode = "artists_by_genre";
      this.getObj({
        url: "/filter",
        storepoint: "setArtistsByGenre",
        params: { mode: "artists_by_genre", genre: genre },
      });
    },
    getYears() {
      this.mode = "years";
      this.getObj({
        url: "/filter",
        storepoint: "setYears",
        params: { mode: "years", limit_tracks: 10 },
      });
    },
    getMoods() {
      this.mode = "moods";
    },
    getFavorites() {
      this.mode = "favorites";          
    },
    setFilter({mode, item}) {
      this.mode = null;
      let params = { mode: mode };
      params[mode] = item;
      this.createObj({
        url: "/filter",        
        params: params,
      });
      if (this.playback) {
        this.next();
      }
      else {
        this.play();
      }
    },
  },
  mounted() {
    this.$sse.create({url: '/now_play?user='+this.auth.username})
  .on('', (msg) => this.confirmNowPlay({ now_play: msg }))
  .connect()
  .catch((err) => console.error('Failed make initial connection:', err));
  },
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

.btn.filter {
  background: black;
  color: white;
  font-size: 14px;
  margin: 20px 0px 20px 0px;
  padding: 0rem 0.4rem;
  font-weight: 700;
}

.btn.filter.genres {
  background: rgb(0, 128, 0);
}

.btn.filter.years {
  background: rgb(0, 0, 255);
}

.btn.filter.moods {
  background: rgb(139, 0, 255);
}

.btn.filter.favorites {
  background: rgb(255, 165, 0);
}

.track_info {
  background: black;
  color: white;
  font-size: 16px;
  margin: 10px 0px 10px 0px;
}

.map {
  display: flex;
  justify-content: center;
}

.list {
  display: flex;
  flex-wrap: wrap;
  width: 320px;
  justify-content: space-around;
  align-items: center;
}

.item_genres {
  background: rgb(0, 128, 0);
  color: white;
  padding: 8px;
  font-size: 16px;
  margin: 2px 1px 2px 1px;
  border-radius: 8px;
  transition: all 2s;
}

.item_years {
  background: rgb(0, 0, 255);
  color: white;
  padding: 8px;
  font-size: 16px;
  margin: 2px 1px 2px 1px;
  border-radius: 8px;
  transition: all 2s;
}

.item_moods {
  background: rgb(139, 0, 255);
  color: white;
  padding: 8px;
  font-size: 16px;
  margin: 2px 1px 2px 1px;
  border-radius: 8px;
  transition: all 2s;
}

</style>
