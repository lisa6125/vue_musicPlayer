let vm = new Vue({
  el: "#app",
  data: {
    index: 0,
    music: [
      {
        artist: "Kevin MacLeod",
        name: "Bright_Wish",
        src: "./music/Bright_Wish.mp3",
        imgSrc: "./picture/8C9Evy.png",
      },
      {
        artist: "Kevin MacLeod",
        name: "Carny_s_Dance",
        src: "./music/Carny_s_Dance.mp3",
        imgSrc: "./picture/mZdA12.png",
      },
      {
        artist: "Riot",
        name: "A_Long_Cold_Sting",
        src: "./music/A_Long_Cold_Sting.mp3",
        imgSrc:
          "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1047&q=80",
      },
      {
        artist: "John Deley and the 41 Players",
        name: "Almost_a_Year_Ago_Sting",
        src: "./music/Almost_a_Year_Ago_Sting.mp3",
        imgSrc:
          "https://images.unsplash.com/photo-1500762728065-466b7a170c96?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      },
      {
        artist: "Riot",
        name: "Bomber_Sting",
        src: "./music/Bomber_Sting.mp3",
        imgSrc:
          "https://images.unsplash.com/photo-1579521368384-d7fb00ac080f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
      },
      {
        artist: "The 126ers",
        name: "On_My_Way_Home_Sting",
        src: "./music/On_My_Way_Home_Sting.mp3",
        imgSrc:
          "https://images.unsplash.com/photo-1579550752291-74213f625700?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
      },
      {
        artist: "The U.S. Marine Corps Band",
        name: "Dinner_Chimes",
        src: "./music/Dinner_Chimes.mp3",
        imgSrc:
          "https://images.unsplash.com/photo-1579489667799-0f49a083efc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
      },
      {
        artist: "John Deley and the 41 Players",
        name: "Dixie_Outlandish_Sting",
        src: "./music/Dixie_Outlandish_Sting.mp3",
        imgSrc:
          "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      },
      {
        artist: "Riot",
        name: "One_Step_Closer",
        src: "./music/One_Step_Closer.mp3",
        imgSrc:
          "https://images.unsplash.com/photo-1578605002661-69450a97476d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
      },
      {
        artist: "John Deley and the 41 Players",
        name: "Minor_Mush_Sting",
        src: "./music/Minor_Mush_Sting.mp3",
        imgSrc:
          "https://images.unsplash.com/photo-1578283862070-85ed5daa8c9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=281&q=80",
      },
    ],
    originalMusic: [],
    MusicPlayStatus: false, //??????????????????
    loopStatus: 0, //0=?????????, 1=??????????????????, 2=????????????
    isShuffle: false,
    currentTime: 0,
    durationTime: 0,
    touch: false,
    followPage: false, //????????????followPage
    playListPage: false, //????????????playListPage
    AD: 0,
    VIP: false,
  },
  computed: {
    //????????????
    nowSong() {
      return this.music[this.index].src;
    },
    //????????????
    nowPlaying() {
      let audio = document.querySelector("audio");
      return audio;
    },
    showVudio() {
      var canvas = document.querySelector("#canvas");
      var audio = document.querySelector("audio");
      var vudio = new Vudio(audio, canvas, {
        accuracy: 256,
        width: 800,
        height: 600,
        waveform: {
          maxHeight: 120,
          // horizontalAlign: 'right',
          color: ["#fff", "#fff", " #fff", "#ffffff79", "#ffffff00"],
        },
      });
      return vudio;
    },
    //??????????????????,?????????:???
    currentMusic() {
      if (this.currentTime >= 60) {
        let min = Math.floor(this.currentTime / 60);
        let sec = this.currentTime % 60;
        return `${min}:${sec}`;
      } else {
        let sec = this.currentTime;
        if (this.currentTime >= 10) {
          return `00:${sec}`;
        } else {
          return `00:0${sec}`;
        }
      }
    },
    //????????????????????????,?????????:???
    timeLeftMusic() {
      if (!this.durationTime) {
        return "00:00";
      }
      if (this.durationTime - this.currentTime >= 60) {
        let min = Math.floor((this.durationTime - this.currentTime) / 60);
        let sec = Math.floor((this.durationTime - this.currentTime) % 60);
        return `${min}:${sec}`;
      } else {
        let sec = Math.floor(this.durationTime - this.currentTime);
        if (Math.floor(this.durationTime - this.currentTime) >= 10) {
          return `00:${sec}`;
        } else {
          return `00:0${sec}`;
        }
      }
    },
    //???????????????
    progressMusic() {
      let progress = (this.currentTime / this.durationTime) * 100 || 0;
      return progress;
    },
  },
  methods: {
    changePlaying() {
      if (!this.MusicPlayStatus) {
        // ??????????????????????????????
        this.nowPlaying.play();
        this.MusicPlayStatus = true;
        this.showVudio.dance();
      } else {
        // ????????????
        this.nowPlaying.pause();
        this.MusicPlayStatus = false;
      }
    },
    changeSong(num) {
      if (this.MusicPlayStatus) {
        //??????????????????
        this.index += num;
        this.nowPlaying.autoplay = true; //?????????????????????????????????setTimeout 0???
        this.nowPlaying.play();
        this.MusicPlayStatus = true;
      } else {
        this.nowPlaying.autoplay = false;
        this.index += num;
      }
      this.index = this.index % this.music.length;
      if (this.index < 0 && num == -1) {
        this.index += this.music.length;
      }
      this.changeBg();
    },
    changeBg() {
      let mainbg = document.querySelector(".main");
      let followbg = document.querySelector(".follow_card");
      mainbg.style.backgroundImage = `url(${this.music[this.index].imgSrc})`;
      followbg.style.backgroundImage = `url(${this.music[this.index].imgSrc})`;
    },
    changePlayListPage() {
      this.playListPage = !this.playListPage;
    },
    changeIndex(num) {
      this.index = num;
      this.changeBg();
      this.changeSong(0);
    },
    catchTime() {
      // ???audio????????????????????????
      this.durationTime = Math.floor(this.nowPlaying.duration);
      this.currentTime = Math.floor(this.nowPlaying.currentTime);
      this.timerBar();
    },
    timerBar() {
      let bar = document.querySelector(".song_bar_timer");
      let barBtn = document.querySelector(".song_bar_btn");
      bar.style.width = `${this.progressMusic}%`;
      barBtn.style.left = `${this.progressMusic}%`;
    },
    clickBarTmie(e) {
      //??????.song_bar_timer ??????????????????????????????currentTime
      //????????????????????????.song_bar_timer??????????????????
      //??????????????????????????????????????????????????? currentTime
      if (!this.nowPlaying.currentTime) return;
      let bar = document.querySelector(".song_bar");
      let target = e.offsetX;
      this.nowPlaying.currentTime = Math.floor(
        (target / bar.offsetWidth) * this.durationTime
      );
    },
    // ???????????????
    moveBar(e) {
      //??????????????????
      //?????????????????????
      this.MusicPlayStatus = false;
      this.nowPlaying.pause();
      if (!this.nowPlaying.currentTime) return;
      let bar = document.querySelector(".song_bar");
      //e.touches[0].pageX ??????????????????????????????????????????
      let target = e.touches[0].pageX - bar.offsetLeft; // bar.offsetLeft ???BAR?????????????????????
      this.nowPlaying.currentTime = Math.floor(
        (target / bar.offsetWidth) * this.durationTime
      );
      this.MusicPlayStatus = true;
      this.nowPlaying.play();
    },
    //?????????????????????,??????????????????
    changeLoop() {
      //loop ??????????????????????????????????????????
      if (this.loopStatus === 0 && !this.isShuffle) {
        this.nowPlaying.pause();
        this.MusicPlayStatus = false;
        //??????????????????
      } else if (this.loopStatus === 1) {
        this.changeSong(1);
        //????????????
      } else {
        this.changeSong(0);
      }
    },
    //?????????????????????,?????????????????????????????????????????????
    handleShuffle() {
      if (this.isShuffle && this.loopStatus === 0) {
        let i = Math.floor(Math.random() * this.music.length);
        this.changeIndex(i);
      }
    },
    //??????????????????????????????
    judgeShuffle() {
      if (
        (this.loopStatus === 1 || this.loopStatus === 2) &&
        this.isShuffle === false
      ) {
        this.loopStatus = 0;
        this.isShuffle = true;
      } else {
        this.isShuffle = !this.isShuffle;
      }
    },
    closeFollow(status) {
      this.followPage = status
    }
  },
  mounted() {
    this.changeBg();
  },
});
