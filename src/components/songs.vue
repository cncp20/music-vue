<template>
    <div class="songs">
        <p class="songs-title">
            <i class="iconfont icon-back" @click="hideSelf()"></i>
            歌曲列表
        </p>
        <h2 class="iconfont icon-iconloading-copy" v-if="isLoading"></h2>
        <div class="songs-list" v-if="!isLoading">
            <img :src="songsList[0].logo" class="logo"/>
            <p class="dissname">{{songsList[0].dissname}}</p>
            <div class="song-item" v-for="(item, index) in songsList[0].songlist" key="index" @click="pushToPlayListAndPlay(item)">
                <span>{{index + 1 }}</span>
                <div class="song-info">
                    <p class="title">{{item.title}}</p>
                    <p class="subtitle">{{item.singer[0].title}}</p>
                </div>
                <!--<i class="iconfont icon-menu"></i>-->
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        data() {
            return {

            }
        },
        methods: {
            hideSelf() {
                this.$emit("hideChild");
            },
            pushToPlayListAndPlay(item) {
                this.$store.dispatch("pushToPlayListAndPlay",{
                    "id": item.id,
                    "name": item.title,
                    "author": item.singer[0].title,
                    "src": "http://ws.stream.qqmusic.qq.com/"+ item.id +".m4a?fromtag=46",
                    "musicImgSrc": "http://y.gtimg.cn/music/photo_new/T002R300x300M000" + item.album.mid + ".jpg?max_age=2592000"
                } );
            }
        },
        computed:mapGetters(["songsList", "isLoading"])
    }
</script>

<style lang="scss">
.songs {
    position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
    right: 0;
    bottom: 3.5rem;
    background: #fff;
    .songs-title {
        height: 3rem;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        .icon-back {
            font-size: 2rem;
            margin:0 1rem;
        }
    }
    .icon-iconloading-copy {
        font-size: 10rem;
        text-align: center;
        padding-top: 5rem;
    }
    .songs-list {
        position: fixed;
        left: 0;
        top: 3rem;
        right: 0;
        bottom: 3.5rem;
        overflow: auto;
        align-items: center;
        .logo {
            width: 100%;
            margin-top: -3rem;
        }
        .dissname {
            font-size: 1.2rem;
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            border-bottom: 1px #ccc solid;
            height: 3rem;
            line-height: 3rem;
            padding: 0 1rem;
            margin-top: -3rem;
            opacity: 0.8;
            background: #fff;
        }
        .song-item {
            display: flex;
            padding: 0.8rem 0;
            border-bottom: 1px #eee solid;
            margin: 10px;
            span {
                display: block;
                font-size: 0.8rem;
                width: 1.2rem;
                height: 3rem;
                line-height: 3rem;
                text-align: center;
            }
            .song-info {
                width: 80%;
                margin-left: 1rem;
                height: 3rem;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .title {
                    font-size: 1rem;
                }
                .subtitle {
                    font-size: 0.8rem;
                    color: #999;
                }
            }
            .icon-menu {
                display: flex;
                height: 3rem;
                line-height: 3rem;
                font-size: 2rem;
            }
        }
    }
}
</style>

