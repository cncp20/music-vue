const state = {
    audioDom: "",
    currIndex: 0,
    isPlaying: false,
    song: {
        "id": 108963136,
        "name": "成都",
        "author": "赵雷",
        "src": "http://m2.music.126.net/7o5D4dA6271VktgawcbZFA==/18665309393829604.mp3",
        "musicImgSrc": "http://p4.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg"
    },
    playList: [{
            "id": 108963136,
            "name": "成都",
            "author": "赵雷",
            "src": "http://m2.music.126.net/7o5D4dA6271VktgawcbZFA==/18665309393829604.mp3",
            "musicImgSrc": "http://p4.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg"
        },
        {
            "id": 104784071,
            "name": "咱们屯里人(粤语版)",
            "author": "未知",
            "src": "http://m2.music.126.net/XbGWv4O15b0c1-w4pCtwgA==/3300733908037356.mp3",
            "musicImgSrc": "http://omratag7g.bkt.clouddn.com/%E5%A4%8F%E6%B4%9B%E7%89%B9%E7%83%A6%E6%81%BC.jpg"
        },
        {
            "id": 104780794,
            "name": "七月上",
            "author": "未知",
            "src": "http://m2.music.126.net/K1SFXCvWf8BO9VEpSvx2ew==/7967061257205150.mp",
            "musicImgSrc": "http://p3.music.126.net/9kZl6NRj3HxmQQ8DqTjZ4Q==/17729624997966923.jpg"
        }
    ],
    songsList:[],
    isLoading:false,
    lyric:"",
    isLyricOk: true,
    duration:0,
    currTime:0,
    rankList:{}
}

export default state;