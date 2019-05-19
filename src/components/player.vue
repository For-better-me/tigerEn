<template>
    <div class="player">
        <div class="audio">
            <div class="btn-play" @click="startPlayOrPause()">
            <img src="../assets/img/icon-play.png" style="background: #fff;" v-if='!audio.playing'>
            <img src="../assets/img/btn-pause.png" style="background: #FC5E64;" v-else>
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
            :src='srcAudio'></audio>
            </div>
    </div>
</template>

<script lang='ts'>
import Vue from "vue";
import AbstractBaseVue, { MyComponent, MyMixins,MyProp } from "@/util/AbstractBaseVue";
import Slider from "@/components/slider.vue";
@MyComponent({
  components: { Slider }
})
export default class Player extends AbstractBaseVue {   
    duration:number = 269;
    srcAudio:string = '';
    currentTime:number = 0;
    audio: any = {
        playing: false,
        waiting: true,
    };
    // prop
    @MyProp({required:true}) src!:string ;
    // @MyProp({required:true}) duration!:number
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.srcAudio = this.src
      console.log(this.srcAudio)
    }
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
    
    }
//   computed
  get percent():number{
    return this.currentTime/this.duration
  }
  // methods

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
     console.log(e.target.currentTime)
   
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
    this.audio.playing = false;
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
@import url("../assets/css/home/info.less"); //@import url(); 引入公共css类
</style>