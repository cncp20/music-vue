<template>
    <div class="headbar">
        <div class="search">
            <input type="text" placeholder="音乐/歌手" @click="showSearch()" v-model="searchText" @keydown.13="search(searchText)" />
            <span class="iconfont icon-cancle" v-if="isSearchPageShow" @click="hideSearch()"></span>
        </div>
        <div class="search-page" v-if="isSearchPageShow">
            <div class="search-list" v-if="searchArr.length != 0">
                <div class="song-info" v-for="(item, index) in searchArr" key="index" @click="pushToPlayListAndPlay(item)">
                    <p class="title">{{item.songname}}</p>
                    <p class="subtitle">{{item.singer[0].name}}</p>
                </div>
            </div>
            <div class="search-history" v-if="searchArr.length == 0">
                <p>搜索记录</p>
                <div v-for="(item, index) in searchHis" key="index" @click="search(item)">
                    {{item}}
                    <i @click.stop="delHistory(index)">X</i>
                </div>
            </div>
        </div>
        <div class="nav">
            <router-link to="/recommend" tag="span" active-class="active">推荐</router-link>
            <router-link to="/rank" tag="span" active-class="active">排行榜</router-link>
            <router-link to="/sheet" tag="span" active-class="active">MV</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isSearchPageShow: false,
            searchText: "",
            searchArr: [],
            searchHis: []
        }
    },
    methods: {
        showSearch() {
            this.isSearchPageShow = true;
        },
        hideSearch() {
            this.isSearchPageShow = false;
            this.searchText = "";
            this.searchArr = [];
        },
        search(txt) {
            if(txt == "") return;
            this.$http.jsonp("https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?format=jsonp&n=20&w=" + txt , {
                jsonp: "jsonpCallback"
            }).then((data) => {
                this.searchArr = data.body.data.song.list;
                // this.albumImg = data.body.data.album.itemlist[0].mid;
            });
            for (var i = 0; i < this.searchHis.length; i++) {
                var element = this.searchHis[i];
                if(element == txt) {
                    return;
                }
            }
            let newArr = this.searchHis;
            newArr.push(txt);
            this.searchHistory = newArr;
            localStorage.searchHistory = JSON.stringify(newArr);
        },
        pushToPlayListAndPlay(item) {
            this.$store.dispatch("pushToPlayListAndPlay", {
                "id": item.songid,
                "name": item.songname,
                "author": item.singer[0].name,
                "src": "http://ws.stream.qqmusic.qq.com/" + item.songid + ".m4a?fromtag=46",
                "musicImgSrc": "http://y.gtimg.cn/music/photo_new/T002R300x300M000" + item.albummid + ".jpg?max_age=2592000"
            });
        },
        delHistory(index) {
            this.searchHis.splice(index, 1);
            localStorage.searchHistory = JSON.stringify(this.searchHis);
        }
    },
    mounted() {
        this.searchHis = localStorage.searchHistory ? JSON.parse(localStorage.searchHistory) : [];
    }
}
</script>

<style lang="scss">
.headbar {
    width: 100%;
    .search {
        height: 3.8rem;
        background: #CE3D3E;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 2rem;
        input {
            flex: 1;
            height: 2.6rem;
            background: #eee url("/src/assets/search.png") no-repeat 1rem center;
            background-size: 2rem 2rem;
            border-radius: 5px;
            font-size: 1.2rem;
            outline: none;
            padding: 0 3.4rem;
            box-sizing: border-box;
        }
        .icon-cancle {
            font-size: 1.8rem;
            margin-left: 0.7rem;
        }
    }
    .search-page {
        overflow: auto;
        width: 100%;
        position: fixed;
        left: 0;
        top: 3.8rem;
        right: 0;
        bottom: 3.5rem;
        background: #fff;
        z-index: 9;
        .search-list {
            .song-info {
                padding: 0.8rem;
                height: 3rem;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                border-bottom: 1px #ccc solid;
                .title {
                    font-size: 1rem;
                }
                .subtitle {
                    font-size: 0.8rem;
                    color: #999;
                }
            }
        }
        .search-history {
            p {
                padding: 1rem;
                font-size: 1.2rem;
                border-bottom: 1px #999 solid;
            }
            div {
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
    .nav {
        display: flex;
        height: 2.5rem;
        line-height: 2.5rem;
        span {
            flex: 1;
            font-size: 1.1rem;
            text-align: center;
            box-sizing: border-box;
            &.active {
                border-bottom: 3px #CE3D3E solid;
            }
        }
    }
}
</style>
