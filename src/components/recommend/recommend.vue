<template>
  <div class="recommend">
    <swiper :options="swiperOption" ref="mySwiper" class="swiper">
      <!-- slides -->
      <swiper-slide v-for="(banner, index) in banners" key="index" class="item"><img :src="banner.pic"  @click="jump(banner)"/></swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="hot">
      <h1>热门歌单</h1>
      <div class="hot-item" v-for="(item, index) in hotdiss" key="index" @click="openSongs(index)">
        <div class="cover">
          <img :src="item.imgurl"/>
        </div>
        <p>{{item.dissname}}</p>
        <span>{{item.author}}</span>
      </div>
  
      <songs v-if="showSongs" v-on:hideChild="hideChild()"></songs>
    </div>
  </div>
</template>

<script>
import songs from "../songs.vue";
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data() {
    return {
      hotdiss: [],
      showSongs: false,
      banners: [],
      swiperOption: {
          autoplay: 3000,
          direction : 'horizontal',
          grabCursor : true,
          setWrapperSize :true,
          autoHeight: true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          mousewheelControl : true,
          observeParents:true,
        }
    }
  },
  methods: {
    openSongs(index) {
      let dissid = this.hotdiss[index].dissid;
      this.showSongs = true;
      this.$store.dispatch("changeLoadState");
      this.$http.jsonp("https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&new_format=1&pic=500&disstid=" + dissid + "&type=1&json=1&utf8=1&onlysong=0&nosign=1&_=1494421310362", { jsonp: "jsonpCallback" })
        .then((data) => {
          this.$store.dispatch("changeLoadState");
          this.$store.dispatch("changeSongsList", data.body.cdlist);
        })
    },
    hideChild() {
      this.showSongs = false;
    },
    jump(item) {
      if(item.jumpurl == "") return;
      window.open(item.jumpurl);
    }
  },
  mounted() {
    this.$http.jsonp("https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg?format=jsonp&tpl=v12&page=other&rnd=0&g_tk=1494339127304&loginUin=0&hostUin=0&inCharset=utf8&outCharset=GB2312&notice=0&platform=yqq&needNewCode=0", { jsonp: "jsonpCallback" })
      .then((data) => {
        this.hotdiss = data.body.data.hotdiss.list;
        this.banners = data.body.data.focus;
      });
  },
  components: {
    songs, swiper, swiperSlide
  }
}
</script>

<style lang="scss">
.recommend {
  flex: 1;
  overflow: auto;
  width: 100%;
  .swiper {
    height: 10rem;
    width: 100%;
    .item {
      width: 100%;
      height: 10rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .hot {
    width: 100%;
    h1 {
      text-align: center;
      font-size: 1.5rem;
      margin: 1rem 0;
      clear: both;
    }
    .hot-item {
      width: 50%;
      float: left;
      box-sizing: border-box;
      padding: 4px;
      .cover {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p,
      span {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 5px 0;
        font-size: 14px;
      }
      span {
        color: #666;
      }
    }
  }
}
</style>