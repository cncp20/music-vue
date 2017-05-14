<template>
    <div class="detail">
        <p class="detail-title">
            <i class="iconfont icon-bottom" @click="hideSelf()"></i>
            歌曲
        </p>
        <div class="lyric">
            {{isLyricOk ? lyric : "loading..."}}
        </div>
        <h1>{{currTime}}--{{duration}}</h1>
        <div class="detail-ctrl">
            <span class="iconfont icon-left" @click="prev()"></span>
            <span :class="[isPlaying ? 'iconfont icon-pause' : 'iconfont icon-play']" @click.stop="setCurrTime()"></span>
            <span class="iconfont icon-next" @click="next()"></span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import base from "../assets/js/base64.js";
export default {
    data() {
        return {

        }
    },
    methods: {
        hideSelf() {
            this.$emit("hideDetail");
        },
        setCurrTime() {
            this.$store.dispatch("setCurrTime");
            setTimeout(() => {
                this.setCurrTime();
            }, 1000);
        },
        next() {
            this.$store.dispatch("next");
            this.getLyc();
        },
        prev() {
            this.$store.dispatch("prev");
            this.getLyc();
        },
        getLyc() {
            this.$store.dispatch("changeLyricState");
            this.$http.jsonp("https://api.darlin.me/music/lyric/" + this.$store.state.song.id + "/")
                .then((data) => {
                    var str = new base().decode(data.body.lyric);
                    this.$store.dispatch("setLyric", str);
                    this.$store.dispatch("changeLyricState");
                })
        }
    },
    computed: mapGetters(["lyric", "isLyricOk", "isPlaying", "duration", "currTime", "song"]),
    watch: {
        isPlaying() {
            console.log(1);
        }
    },
    mounted() {
        setTimeout(() => {
            this.setCurrTime();
        }, 0);
    }
}
</script>

<style lang="scss">
.detail {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    z-index: 15;
    display: flex;
    flex-direction: column;
    .detail-title {
        height: 3rem;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        .icon-bottom {
            font-size: 2rem;
            margin: 0 1rem;
        }
    }
    .lyric {
        flex: 1;
        overflow: auto;
    }
    .detail-ctrl {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 5rem;
        background: #eee;
        color: #CE3D3E;
        span {
            font-size: 4rem;
            &.icon-left {
                font-weight: 700;
                font-size: 3.6rem;
            }
        }
    }
}
</style>
