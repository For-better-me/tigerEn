<template>
  <div class="song_info" v-if="infoContent">
    <div class="wrap">
      <!-- <img src="imgPre+infoContent.img" alt=""> -->
      <img :src="imgPre+infoContent.img" alt>
      <div class="audio">
        <div class="btn-play" @click="startPlayOrPause()">
          <!-- <svg  v-if='!audio.playing' t="1562830592228" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5521"><path d="M874.9 571.1L217.4 950.8C171.8 977 115 944.2 115 891.6V132.4c0-52.5 56.9-85.4 102.4-59.1l657.5 379.6c45.5 26.3 45.5 91.9 0 118.2z" fill="#525252" p-id="5522"></path></svg>
          <svg  v-if='audio.playing' t="1562830771777" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6256"><path d="M303.431427 882.78857422H210.73428344c-27.80914307 0-46.34857177-18.53942872-46.34857177-46.34857178V187.55999756c0-27.80914307 18.53942872-46.34857177 46.34857177-46.34857178h92.69714356c27.80914307 0 46.34857177 18.53942872 46.34857178 46.34857178v648.88000488c0 27.80914307-18.53942872 46.34857177-46.34857178 46.34857178zM813.26571656 882.78857422h-92.69714356c-27.80914307 0-46.34857177-18.53942872-46.34857178-46.34857178V187.55999756c0-27.80914307 18.53942872-46.34857177 46.34857178-46.34857178h92.69714356c27.80914307 0 46.34857177 18.53942872 46.34857177 46.34857178v648.88000488c0 27.80914307-18.53942872 46.34857177-46.34857177 46.34857178z" fill="#525252" p-id="6257"></path></svg>
             -->
          <img src="../../assets/img/icon-play2.png" style="background: #fff;" v-if='!audio.playing'>
          <img src="../../assets/img/btn-pause.png" style="background: #ff9051;" v-else>
        </div>
        <p>{{format(currentTime)}}</p>
        <div class="slider_wrap">
          <slider :percent="percent" @percentChange='percentChange'></slider>
        </div>
        <p>{{format(duration)}}</p>
        <audio
          ref="audio"
          @play="onPlay"
          @error="onError"
          @waiting="onWaiting"
          @timeupdate="updateTime"
          @pause="onPause"
          @ended="onEnd"
          :src="imgPre+infoContent.music"></audio>
      </div>
      <div class="info">
        <h4>{{infoContent.title}}</h4>
        <p>{{infoContent.time}}</p>
        <div class="con" v-html="infoContent.text"></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import AbstractBaseVue, { MyComponent, MyMixins } from "@/util/AbstractBaseVue";
import { SongApi } from "@/api/feature";
import Slider from "@/components/slider.vue";
@MyComponent({
  components: { Slider }
})
export default class SongInfo extends AbstractBaseVue {   
  duration:number = 0;
  currentTime:number = 0;
  infoContent: any = true; //详情页面得内容
  audio: any = {
    playing: false,
    waiting: true,
    playCount: 0
  };
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {}
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init();
  }
//   computed
  get percent():number{
    return this.currentTime/this.duration
  }
  // methods
  init() {
    let id = this.$route.params.id;
    let data = { id };
    SongApi.detail(data).then(res => {
      this.infoContent = res.data;
      this.duration = this.$util.formatDuration(res.data.duration_time)
    });
  }
  startPlayOrPause() {
    return this.audio.playing ? this.pause() : this.play();
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
  updateTime(e:any){
     this.currentTime = e.target.currentTime
   
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
    (this.$refs.audio as HTMLAudioElement).currentTime = 0
  }
  percentChange(percent:number){
    console.log(percent,'percent')
      const currentTime = this.duration * percent;
      (this.$refs.audio as HTMLAudioElement).currentTime = currentTime
       
  }
  format(interval:number) {
    interval = interval | 0
    const minute = interval / 60 | 0
    const second = this._pad(interval % 60)
    return `${minute}:${second}`
  }
  _pad(num:string|number, n = 2) {
    let len = num.toString().length
    while (len < n) {
      num = '0' + num
      len++
    }
    return num
  }
}
</script>
<style lang='less' scoped>
@import url("../../assets/css/home/info.less"); //@import url(); 引入公共css类
</style>