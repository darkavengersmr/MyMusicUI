<template>
  <div class="card">
      <div class="checkbox" @click="setRadioEffect">
        <input type="checkbox" v-model="prefs.radio_effect"/> 
        Звук настройки на радиостанцию
      </div>
      <div class="checkbox" @click="setNormalize">
        <input type="checkbox" v-model="prefs.normalize"/> 
        Нормализация громкости
      </div>
      <div class="checkbox" @click="setExternalPlayer">
        <input type="checkbox" v-model="prefs.external_player"/> 
        Играть на внешнее приложение
      </div>
      <div class="checkbox" @click="setQuality">
        <input type="range" min="0" max="10" step="1" v-model="prefs.quality">
        Качество звука
      </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {      
  },
  emits: [],
  data() {
    return {      
    };
  },
  computed: {
    ...mapState({
        prefs: "prefs",
    }),
  },
  methods: {
    ...mapMutations({
        setPrefs: "setPrefs",
    }),
    setRadioEffect() {      
      this.setPrefs({...this.prefs, radio_effect: !this.prefs.radio_effect});      
    },
    setNormalize() {      
      this.setPrefs({...this.prefs, normalize: !this.prefs.normalize});
      console.log(this.prefs)      
    },
    setExternalPlayer() {      
      this.setPrefs({...this.prefs, external_player: !this.prefs.external_player});      
    },
    setQuality() {
      this.setPrefs({...this.prefs, quality: this.prefs.quality});      
    },
  },
};
</script>

<style scoped>

.card {
    
}

.checkbox {
    width: 320px;
    font-size: 10;
    text-align: left;
    margin: 0px 0px 10px 20px; 
}

</style>
