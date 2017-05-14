<template>
  <div class="rank">
    <div class="rank-item" v-for="(item, index) in rankList" key="index" @click="openSongs(index)">
      <img :src="item.picUrl"/>
      <div class="rank-info">
        <p>{{item.topTitle}}</p>
        <p v-for="it in item.songList">{{it.songname}}--{{it.singername}}</p>
      </div>
    </div>
    <ranklist v-if="showSongs" v-on:hideChild="hideChild()"></ranklist>
  </div>
</template>

<script>
import ranklist from "../ranklist.vue";
export default {
  data() {
    return {
      rankList:[],
      showSongs: false,
    }
  },
  methods: {
    openSongs(index) {
      let topid = this.rankList[index].id;
      this.showSongs = true;
      this.$store.dispatch("changeLoadState");
      this.$http.jsonp("https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=" + topid, { jsonp: "jsonpCallback" })
        .then((data) => {
          this.$store.dispatch("changeLoadState");
          this.$store.dispatch("changeRankList", data.body);
        })
    },
    hideChild() {
      this.showSongs = false;
    }
  },
  components: {
    ranklist
  },
  mounted() {
    this.$http.jsonp("https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?format=jsonp&g_tk=5381&uin=0&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1494659839430", { jsonp: "jsonpCallback" })
      .then((data) => {
        this.rankList = data.body.data.topList;
      })
  }
}
</script>

<style lang="scss">
.rank {
  flex: 1;
  overflow: auto;
  .rank-item {
    display: flex;
    background: #eee;
    margin: 10px;
    align-items: center;
    padding: 10px;
    img {
      width: 5rem;
      height: 5rem;
      margin: 0 10px;
    }
    .rank-info {
      height: 5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>