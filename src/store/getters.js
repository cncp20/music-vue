const getters = {
    isPlaying(state) {
        return state.isPlaying;
    },
    song(state) {
        return state.song;
    },
    songsList(state) {
        return state.songsList;
    },
    rankList(state) {
        return state.rankList;
    },
    isLoading(state) {
        return state.isLoading;
    },
    playList(state) {
        return state.playList;
    },
    lyric(state) {
        return state.lyric;
    },
    isLyricOk(state) {
        return state.isLyricOk;
    },
    duration(state) {
        return state.duration;
    },
    currTime(state) {
        return state.currTime;
    }
}

export default getters;