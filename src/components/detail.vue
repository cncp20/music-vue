<template>
    <div class="detail">
        <img :src="song.musicImgSrc" />
        <p class="detail-title">
            <i class="iconfont icon-bottom" @click="hideSelf()"></i>
            {{song.name}}
        </p>
        <!--<div class="lyric">
                    {{isLyricOk ? lyric : "loading..."}}
                </div>-->
        <div class="img">
            <img :src="song.musicImgSrc" />
        </div>
        <div class="progress">
            <div class="seek">
                <div class="bar" :style="{ left: left + '%' }"></div>
            </div>
            <span class="curr">{{formatTime(currTime)}}</span>
            <span class="dura">{{formatTime(duration)}}</span>
        </div>
        <div class="detail-ctrl">
            <span class="iconfont icon-left" @click="prev()"></span>
            <span :class="[isPlaying ? 'iconfont icon-pause' : 'iconfont icon-play']" @click.stop="toggleMusic()"></span>
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
            left: 0
        }
    },
    methods: {
        hideSelf() {
            this.$emit("hideDetail");
        },
        setCurrTime() {
            this.$store.dispatch("setCurrTime");
            this.left = this.$store.state.currTime / this.$store.state.duration * 100;
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
        toggleMusic() {
            this.$store.dispatch("toggleMusic");
        },
        getLyc() {
            this.$store.dispatch("changeLyricState");
            this.$http.jsonp("https://api.darlin.me/music/lyric/" + this.$store.state.song.id + "/")
                .then((data) => {
                    var str = new base().decode(data.body.lyric);
                    this.$store.dispatch("setLyric", str);
                    this.$store.dispatch("changeLyricState");
                })
        },
        formatTime(time) {
            let t = parseInt(time);
            let min = parseInt(t / 60);
            let sec = t % 60;
            sec = sec < 10 ? "0" + sec : sec;
            return min + ":" + sec;
        }
    },
    computed: mapGetters(["lyric", "isLyricOk", "isPlaying", "duration", "currTime", "song"]),
    watch: {
        isPlaying() {
            // console.log(1);
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
    &>img {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 16;
        width: 100%;
        height: 100%;
        -webkit-filter: blur(80px);
        -moz-filter: blur(80px);
        -ms-filter: blur(80px);
        filter: blur(80px);
    }
    .detail-title {
        height: 3rem;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        z-index: 20;
        .icon-bottom {
            font-size: 2rem;
            margin: 0 1rem;
        }
    }
    .lyric {
        flex: 1;
        overflow: auto;
    }
    .img {
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 20;
        img {
            width: 80%;
            height: 60%;
        }
    }
    .progress {
        position: relative;
        background: #222;
        width: 100%;
        height: 5px;
        z-index: 20;
        .seek {
            width: 96%;
            position: relative;
            .bar {
                width: 15px;
                height: 15px;
                border-radius: 10px;
                background: #399;
                margin-top: -5px;
                position: absolute;
            }
        }
        .curr {
            position: absolute;
            top: 10px;
            font-size: 1rem;
        }
        .dura {
            position: absolute;
            right: 0;
            top: 10px;
            font-size: 1rem;
        }
    }
    .detail-ctrl {
        z-index: 20;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 5rem;
        color: #CE3D3E;
        margin: 3rem 0;
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
