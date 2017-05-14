<template>
  <div id="app" class="app">
    <audio ref="audio" :src="song.src" :autoplay="isPlaying"></audio>
    <headbar></headbar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <footerbar></footerbar>
  </div>
</template>

<script>
import headbar from "./components/headbar.vue";
import footerbar from "./components/footerbar.vue";
import {mapGetters} from "vuex";
export default {
  name: 'app',
  data() {
    return {
      
    }
  },
  components: {
    headbar, footerbar
  },
  computed:mapGetters(["song", "isPlaying"]),
  mounted() {
    this.$store.dispatch("addToDom", this.$refs.audio);
    this.$refs.audio.addEventListener("ended", () => {
      this.$store.dispatch("next");
    })
  }
}
</script>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
