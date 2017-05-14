<template>
  <div class="footerbar">
    <div class="ctrl" @click="showDetail()">
      <img :src="song.musicImgSrc" class="music-img" />
      <div class="music-info">
        <p class="name">{{song.name}}</p>
        <p class="signer">{{song.author}}</p>
      </div>
      <div class="music-ctrl">
        <span class="iconfont icon-list" @click.stop="togglePlayList()"></span>
        <span :class="[isPlaying ? 'iconfont icon-pause' : 'iconfont icon-play']" @click.stop="toggleMusic()"></span>
        <span @click.stop="next()" class="iconfont icon-next"></span>
      </div>
    </div>
    <div class="play-list-mask" v-if="isPlayListShow" @click="togglePlayList()">
      <div class="play-list-opa"></div>
      <p>播放列表</p>
      <ul class="play-list">
        <li v-for="(item, index) in playList" key="index" @click="changeMusic(index)">
          {{item.name}}
          <i @click.stop="delMusicFromList(index)">X</i>
        </li>
      </ul>
    </div>
    <detail v-if="isDetailShow" v-on:hideDetail="hideDetail()"></detail>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import detail from "./detail.vue";
import base from "../assets/js/base64.js";
export default {
  data() {
    return {
      isPlayListShow: false,
      isDetailShow: false
    }
  },
  methods: {
    togglePlayList() {
      if (this.isPlayListShow) {
        this.isPlayListShow = false;
      } else {
        this.isPlayListShow = true;
      }
    },
    toggleMusic() {
      this.$store.dispatch("toggleMusic");
    },
    next() {
      this.$store.dispatch("next");
    },
    delMusicFromList(i) {
      this.$store.dispatch("delFromPlayList", i);
    },
    changeMusic(i) {
      this.$store.dispatch("changeMusic", i);
    },
    showDetail() {
      this.isDetailShow = true;
      this.$store.dispatch("changeLyricState");
      this.$http.jsonp("https://api.darlin.me/music/lyric/" + this.$store.state.song.id + "/")
        .then((data) => {
          var str = new base().decode(data.body.lyric);  
          this.$store.dispatch("setLyric", str);
          this.$store.dispatch("changeLyricState");
        })
    },
    hideDetail() {
      this.isDetailShow = false;
    }
  },
  computed: mapGetters(["isPlaying", "song", "playList"]),
  components: {
    detail
  }
}
</script>

<style lang="scss">
.footerbar {
  width: 100%;
  height: 3.5rem;
  background: #fff;
  .ctrl {
    opacity: 0.9;
    display: flex;
    align-items: center;
    .music-img {
      width: 3.5rem;
      height: 3.5rem;
      margin-right: 1rem;
    }
    .music-info {
      width: 45%;
      height: 3rem;
      ;
      display: flex;
      overflow: hidden;
      flex-direction: column;
      justify-content: space-around;
      p {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &.name {
          font-size: 1.2rem;
        }
        &.signer {
          font-size: 0.8rem;
          color: #666;
        }
      }
    }
    .music-ctrl {
      display: flex;
      span {
        display: block;
        color: #CE3D3E;
        font-size: 2.5rem;
        margin: 0 0.2rem;
      }
    }
  }

  .play-list-mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 3.5rem;
    z-index: 10;
    display: flex;
    flex-direction: column;
    .play-list-opa {
      flex: 1;
      opacity: 0.7;
      background: #000;
    }
    p {
      font-size: 1.5rem;
      padding: 1rem 10px;
      background: #fff;
      border-bottom: 1px #999 solid;
    }
    .play-list {
      max-height: 15rem;
      overflow: auto;
      background: #fff;
      li {
        font-size: 1rem;
        padding: 1rem 10px;
        border-bottom: 1px #999 solid;
        display: flex;
        justify-content: space-between;
        i {
          font-style: normal;
        }
      }
    }
  }
}
</style>