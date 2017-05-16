const mutations = {
    addToDom(state, payload) {
        state.audioDom = payload;
    },
    next(state, payload) {
        state.currIndex = payload;
    },
    pause(state) {
        state.audioDom.pause();
        state.isPlaying = false;
    },
    play(state) {
        state.audioDom.play();
        state.isPlaying = true;
    },
    changeMusic(state, index) {
        state.currIndex = index;
        state.song.id = state.playList[index].id;
        state.song.name = state.playList[index].name;
        state.song.author = state.playList[index].author;
        state.song.src = state.playList[index].src;
        state.song.musicImgSrc = state.playList[index].musicImgSrc;
    },
    changeSongsList(state, payload) {
        state.songsList = payload;
    },
    changeRankList(state, payload) {
        state.rankList = payload;
    },
    done(state) {
        state.isLoading = false;
    },
    loading(state) {
        state.isLoading = true;
    },
    pushToPlayList(state, payload) {
        state.playList.push(payload);
    },
    delFromPlayList(state, payload) {
        state.playList.splice(payload, 1);
    },
    setLyric(state, payload) {
        state.lyric = payload;
    },
    changeLyricState(state) {
        if(state.isLyricOk) {
            state.isLyricOk = false;
        }else {
            state.isLyricOk = true;
        }
    },
    setCurrTime(state, payload) {
        state.currTime = payload;
    },
    setDuration(state, payload) {
        state.duration = payload;
    }
}

export default mutations;