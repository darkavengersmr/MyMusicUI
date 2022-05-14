<template>
  <div>    
    <div v-if="playback">
      <img src="../assets/tape.gif" width="240" />    
    </div>
    <div v-if="!playback">
      <img src="../assets/tape.jpg" width="240" />
    </div>
    <div>
      <p class="track_info">{{ now_play }}</p>
      <button class="btn" @click="sendLike('dislike')">
        <img v-if="like!='dislike'" src="../assets/dislike.png" width="36" />
        <img v-if="like=='dislike'" src="../assets/dislike_active.png" width="36" />
      </button>
      <button class="btn" @click="prev">
        <img src="../assets/prev.png" width="36" />
      </button>
      <button v-if="!playback" class="btn" @click="play">
        <img src="../assets/play.png" width="36" />
      </button>
      <button v-if="playback && interact" class="btn" @click="stop">
        <img src="../assets/stop.png" width="36" />
      </button>
      <button v-if="playback && !interact" class="btn" @click="play">
        <img src="../assets/unmute.png" width="36" />
      </button>
      <button class="btn" @click="next">
        <img src="../assets/next.png" width="36" />
      </button>
      <button class="btn" @click="sendLike('like')">
        <img v-if="like!='like'" src="../assets/like.png" width="36" />
        <img v-if="like=='like'" src="../assets/like_active.png" width="36" />
      </button>
      <!-- &#128078; &#x23EA; &#x25B6; &#9209; &#x23E9; &#128077; -->
    </div>
    <div>
      <button
        v-bind:class="{ btn: true, filter: true, genres: filters.mode == 'genre' && !prefs_active }"
        @click="getGenres"
      >
        Жанры
      </button>
      <button
        v-bind:class="{ btn: true, filter: true, years: filters.mode == 'year' && !prefs_active}"
        @click="getYears"
      >
        Эпохи
      </button>
      <button
        v-bind:class="{ btn: true, filter: true, moods: filters.mode == 'mood' && !prefs_active}"
        @click="getMoods"
      >
        Настроения
      </button>
      <button
        v-bind:class="{ btn: true, filter: true, favorites: filters.mode == 'favorite' && !prefs_active}"
        @click="getFavorites"
      >
        Избранное
      </button>
      <button
        v-bind:class="{ btn: true, filter: true, prefs: prefs_active }"
        @click="getPrefs()"
      >
        &#9881;
      </button>
      
    </div>

    <div class="map" v-if="filters.mode == 'genre' && !prefs_active">
      <div class="list">
        <div v-for="(item, idx) in genres" :key="idx">
          <div v-if="item!==filters.genre" class="item_genres" @click="setFilter({ mode:'genre', item: item })">
              {{item}}
          </div>
          <div v-if="item==filters.genre" class="item_genres_active">
              {{item}}
          </div>
        </div>
      </div>
    </div>

    <div class="map" v-if="filters.mode == 'year' && !prefs_active">
      <div class="list">
        <div v-for="(item, idx) in years" :key="idx">
          <div v-if="item!==filters.year" class="item_years" @click="setFilter({ mode:'year', item: item })">
              {{item}}-е
          </div>
          <div v-if="item==filters.year" class="item_years_active">
              {{item}}-е
          </div>
        </div>
      </div>
    </div>

    <div class="map" v-if="filters.mode == 'mood' && !prefs_active">
      <div class="list">
        <div v-for="(item, idx) in moods" :key="idx">
          <div v-if="item!==filters.mood" class="item_moods" @click="setFilter({ mode:'mood', item: item })">
              {{ item }}
          </div>
          <div v-if="item==filters.mood" class="item_moods_active">
              {{ item }}
          </div>
        </div>
      </div>
    </div>

    <div class="map" v-if="filters.mode == 'favorite' && !prefs_active">
      <div class="list">
        <div v-for="(item, idx) in favorites" :key="idx">
          <div v-if="item!==filters.favorite" class="item_favorites" @click="setFilter({ mode:'favorite', item: item })">
              {{ item }}
          </div>
          <div v-if="item==filters.favorite" class="item_favorites_active">
              {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <PrefsForm v-if="prefs_active"></PrefsForm>
  <StreamReceiver ref="stream_receiver"/>
</template>

<script>
import StreamReceiver from "./StreamReceiver.vue";
import PrefsForm from "./PrefsForm.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "MainForm",
  props: {},
  data() {
    return {
      interact: false,
      prefs_active: false
    };
  },
  computed: {
    ...mapState({
      auth: "auth",
      prefs: "prefs",
      playback: "playback",
      filters: "filters",
      now_play: "now_play",      
      genres: "genres",
      artists_by_genre: "artists_by_genre",
      years: "years",
      moods: "moods",
      favorites: "favorites",
      like: "like",
    }),
  },
  methods: {
    ...mapMutations({
      setNowPlay: "setNowPlay",
      setLike: "setLike",
      setFilters: "setFilters",
    }),
    ...mapActions({
      controlPlayback: "controlPlayback",
      getObj: "getObj",
      createObj: "createObj",
      confirmNowPlay: "confirmNowPlay",
    }),
    play() {
      this.interact = true;
      this.controlPlayback({
        token: this.auth.token,
        operation: "play",
      });
      this.$refs.stream_receiver.play();
    },
    stop() {
      this.setNowPlay("Поймай свою волну");            
      this.$refs.stream_receiver.stop();
      this.controlPlayback({
        token: this.auth.token,
        operation: "stop",
      });
      //this.$refs.stream_receiver.stopSound(); 
    },
    next() {
      this.$refs.stream_receiver.stop();
      if (this.prefs.radio_effect) {
      this.$refs.stream_receiver.startSound();
      }
            
      this.controlPlayback({
        token: this.auth.token,
        operation: "stop",
      });

      function play(context) {
        context.controlPlayback({
        token: context.auth.token,
        operation: "play",
      });
      }
      
      function next(context) {
        context.$refs.stream_receiver.next();
      }      

      setTimeout(() => play(this), 500);
      setTimeout(() => next(this), 1300);
    },
    prev() {    
      this.controlPlayback({
        token: this.auth.token,
        operation: "prev",
      });
    },
    getGenres() {
      this.prefs_active = false;
      this.setFilters({...this.filters, mode: "genre"});
      this.getObj({
        url: "/filter",
        storepoint: "setGenres",
        params: { mode: "genres", limit_tracks: 100 },
      });
    },
    getArtistsByGenre(genre) {
      this.setFilters({...this.filters, mode: "artists_by_genre"});
      this.getObj({
        url: "/filter",
        storepoint: "setArtistsByGenre",
        params: { mode: "artists_by_genre", genre: genre },
      });
    },
    getYears() {
      this.prefs_active = false;
      this.setFilters({...this.filters, mode: "year"});
      this.getObj({
        url: "/filter",
        storepoint: "setYears",
        params: { mode: "years", limit_tracks: 10 },
      });
    },
    getMoods() {
      this.prefs_active = false;
      this.setFilters({...this.filters, mode: "mood"});      
    },
    getFavorites() {
      this.prefs_active = false;
      this.setFilters({...this.filters, mode: "favorite"});          
    },
    getPrefs() {
      this.prefs_active = !this.prefs_active;      
    },
    setFilter({mode, item}) {
      let filter = {mode: mode};
      filter[mode] = item;
      this.setFilters({...filter});
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
    sendLike(like) {
      if (this.like == like) {
        this.setLike("neutral")
      }
      else {
        this.setLike(like)
      }
      let params = { feedback: like };      
      this.createObj({
        url: "/feedback",        
        params: params,
      });
    },
  },
  mounted() {
    this.$sse.create({url: '/now_play?user='+this.auth.username})
    .on('', (msg) => this.confirmNowPlay({ now_play: msg }))
    .connect()
    .catch((err) => console.error('Failed make initial connection:', err));
  },
    components: {
    StreamReceiver,
    PrefsForm
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

.btn.filter.prefs {
  background: rgb(255, 0, 0);
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

.item_genres_active {
  background: rgb(0, 64, 0);
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

.item_years_active {
  background: rgb(0, 0, 128);
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

.item_moods_active {
  background: rgb(74, 0, 134);
  color: white;
  padding: 8px;
  font-size: 16px;
  margin: 2px 1px 2px 1px;
  border-radius: 8px;
  transition: all 2s;
}

.item_favorites {
  background: rgb(255, 165, 0);
  color: white;
  padding: 8px;
  font-size: 16px;
  margin: 2px 1px 2px 1px;
  border-radius: 8px;
  transition: all 2s;
}

.item_favorites_active {
  background: rgb(136, 88, 0);
  color: white;
  padding: 8px;
  font-size: 16px;
  margin: 2px 1px 2px 1px;
  border-radius: 8px;
  transition: all 2s;
}

</style>
