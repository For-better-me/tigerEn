<template>
  <div class="song_info" v-if="infoContent">
    <div class="wrap">
      <!-- <img src="imgPre+infoContent.img" alt=""> -->
      <img src="https://up.enterdesk.com/edpic/e5/d5/e0/e5d5e04f5f054f69fa6d182fa891f147.jpg" alt>
      <div class="audio">
        <div class="btn-play" @click="startPlayOrPause()">
          <img src="../../assets/img/icon-play.png" style="background: #fff;" v-if='!audio.playing'>
          <img src="../../assets/img/btn-pause.png" style="background: #FC5E64;" v-else>
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
          src="http://m10.music.126.net/20190514195745/3d7e1a57f82d1fd38225d0c699d9c959/ymusic/276d/1fe7/c384/bcdabbe9afbfb34fe5324d3a423206be.mp3"></audio>
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
  duration:number = 269;
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