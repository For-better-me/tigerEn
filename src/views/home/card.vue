<template>
  <div class="word_card">
    <div class="word_show" ref="test">
      <img :src='imgPre+currentWord.img' alt>
      <h4>{{currentWord.title}}</h4>
      <p>{{currentWord.english_title}}</p>

      <audio
        @play="onPlay"
        @error="onError"
        @waiting="onWaiting"
        @pause="onPause"
        @ended="onEnd"
        :src="imgPre+currentWord.music"
        ref="audio"
        id="audio"
      ></audio>
    </div>
    <div class="btn_control">
      <div class="btn prev" @click="prev()">
        <img src="../../assets/img/arrow1.png" alt>
      </div>
      <div class="btn play" @click="startPlayOrPause()">
        <img src="../../assets/img/btn-play.png" v-if='!audio.playing' alt>
        <img src="../../assets/img/btn-pause.png" v-else alt>
      </div>
      <div class="btn next" @click="next()">
        <img src="../../assets/img/arrow2.png" alt>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent, MyWatch } from "@/util/AbstractBaseVue";
import {WordApi} from '@/api/feature'
@MyComponent({
  components: {}
})
export default class WordCard extends AbstractBaseVue {
  //    data
  audioList: object[] = [];
  wordsTotle: number = 3;
  indexAudio: number = 0;
  currentWord: any = {};
  initAudioOpts: any = {
    playing: false,
    waiting: true,
    playCount: 0
  };
  audio: any = this.initAudioOpts;
  MAXPLAYCOUNT: number = 3;

  //    methods
  init(){
      WordApi.list().then(res=>{
          this.audioList = res.data;
          this.currentWord = res.data[0];
          this.wordsTotle = res.data.length-1;
      })
  }
  startPlayOrPause() {
    return this.audio.playing ? this.pause() : this.play();
  }
  prev() {
    if (this.indexAudio > 0) {
      this.indexAudio--;
    }

    console.log(this.indexAudio);
  }
  next() {
    if (this.indexAudio < this.wordsTotle) {
      this.indexAudio++;
    }
    console.log(this.indexAudio);
  }
  play() {
    (this.$refs.audio as HTMLAudioElement).play();
  }
  pause() {
    (this.$refs.audio as HTMLAudioElement).pause();
  }
  onError(res: any) {
    this.audio.waiting = true;
    console.log(res);
  }
  // 当音频开始等待
  onWaiting(res: any) {
    console.log(res);
  }
  // 当音频开始播放
  onPlay(res: any) {
    this.audio.playing = true;
    console.log(res);
  }
  onPause(res: any) {
    this.audio.playing = false;
    console.log(res);
  }
  onEnd(res: any) {
    this.audio.playCount++;
    if (this.audio.playCount <= this.MAXPLAYCOUNT) {
      this.play();
    }
  }

  // watch
  @MyWatch("indexAudio")
  ageChange(newVal: number, oldVal: number) {
    this.pause();
    this.currentWord = this.audioList[newVal];
    this.audio = this.initAudioOpts;
    setTimeout(() => {
      this.play();
    }, 1000);
  }

//   生命周期
    created(){
        this.init()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url("../../assets/css/home/wordCard.less");
</style>
