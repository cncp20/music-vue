<template>
  <div class="sheet">
    <div class="mv" v-for="(item, index) in mvs" key="index" @click="openMV(item)">
      <img :src="item.picurl" />
      <div class="mv-info">
        <p>{{item.mvtitle}}</p>
        <p>{{item.singer_name}}</p>
        <p>{{item.pub_date}}</p>
        <p>{{item.mvdesc}}</p>
      </div>
    </div>
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      mvs: []
    }
  },
  methods: {
    openMV(item) {
      window.open("https://y.qq.com/n/yqq/mv/v/" + item.vid + ".html");
    }
  },
  mounted() {
    this.$http.jsonp("https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg?format=jsonp&tpl=v12&page=other&rnd=0&g_tk=1494339127304&loginUin=0&hostUin=0&inCharset=utf8&outCharset=GB2312&notice=0&platform=yqq&needNewCode=0", { jsonp: "jsonpCallback" })
      .then((data) => {
        this.mvs = data.body.data.shoubomv.all;
      });
  }
}
</script>

<style lang="scss">
.sheet {
  flex: 1;
  overflow: auto;
  width: 100%;
  .mv {
    display: flex;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    border-bottom: 1px #ccc solid;
    img {
      width: 12rem;
      height: 8rem;
    }
    .mv-info {
      display: flex;
      flex-direction: column;
      height: 8rem;
      justify-content: space-between;
      margin-left: 1rem;
      flex: 1;
      overflow: hidden;
      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>

