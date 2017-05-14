const actions = {
    addToDom({commit, state}, payload) {
        commit("addToDom", payload);
    },
    next({commit, state}) {
        let newIndex = state.currIndex;
        if(newIndex >= state.playList.length - 1) {
            newIndex = 0;
        }else {
            newIndex++;
        }
        commit("changeMusic", newIndex);
    },
    prev({commit, state}) {
        let newIndex = state.currIndex;
        if(newIndex <= 0) {
            newIndex = state.playList.length - 1;
        }else {
            newIndex--;
        }
        commit("changeMusic", newIndex);
    },
    toggleMusic({commit, state}) {
        if(state.isPlaying) {
            commit("pause");
        }else {
            commit("play");
        }
    },
    changeSongsList({commit, state}, payload) {
        commit("changeSongsList", payload);
    },
    changeRankList({commit, state}, payload) {
        commit("changeRankList", payload);
    },
    changeLoadState({commit, state}) {
        if(state.isLoading) {
            commit("done");
        }else {
            commit("loading");
        }
    },
    pushToPlayListAndPlay({commit, state}, payload) {
        //防止重复添加列表
        for (var i = 0; i < state.playList.length; i++) {
            var element = state.playList[i];
            if(element.id == payload.id) {
                commit("changeMusic", i);
                return;
            }
        }
        commit("pushToPlayList", payload);
        commit("changeMusic", state.playList.length - 1);
    },
    delFromPlayList({commit, state}, payload) {
        commit("delFromPlayList", payload);
    },
    changeMusic({commit, state}, payload) {
        commit("changeMusic", payload);
    },
    setLyric({commit, state}, payload) {
        commit("setLyric", payload);
    },
    changeLyricState({commit, state}) {
        commit("changeLyricState");
    },
    setCurrTime({commit, state}) {
        commit("setCurrTime",state.audioDom.currentTime);
    }
}

export default actions;