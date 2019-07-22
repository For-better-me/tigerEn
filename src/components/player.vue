<template>
    <div class="player">
        <div class="audio">
            <div class="btn-play" @click="startPlayOrPause()">
            <!-- <img  v-if='audio.waiting' src="https://img.zcool.cn/community/01ad615cbc7158a801208f8b299bb0.gif" alt=""> -->
            <svg  v-if='!audio.playing' t="1562830592228" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5521"><path d="M874.9 571.1L217.4 950.8C171.8 977 115 944.2 115 891.6V132.4c0-52.5 56.9-85.4 102.4-59.1l657.5 379.6c45.5 26.3 45.5 91.9 0 118.2z" fill="#525252" p-id="5522"></path></svg>
            <svg  v-if='audio.playing' t="1562830771777" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6256"><path d="M303.431427 882.78857422H210.73428344c-27.80914307 0-46.34857177-18.53942872-46.34857177-46.34857178V187.55999756c0-27.80914307 18.53942872-46.34857177 46.34857177-46.34857178h92.69714356c27.80914307 0 46.34857177 18.53942872 46.34857178 46.34857178v648.88000488c0 27.80914307-18.53942872 46.34857177-46.34857178 46.34857178zM813.26571656 882.78857422h-92.69714356c-27.80914307 0-46.34857177-18.53942872-46.34857178-46.34857178V187.55999756c0-27.80914307 18.53942872-46.34857177 46.34857178-46.34857178h92.69714356c27.80914307 0 46.34857177 18.53942872 46.34857177 46.34857178v648.88000488c0 27.80914307-18.53942872 46.34857177-46.34857177 46.34857178z" fill="#525252" p-id="6257"></path></svg>
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
    duration:number = 0;
    srcAudio:string = '';
    currentTime:number = 0;
    audio: any = {
        playing: false,
        waiting: false,
    };
    // prop
    @MyProp({required:true}) src!:string ;
    @MyProp({required:true}) time!:number
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.srcAudio = this.src
      this.duration = this.$util.formatDuration(this.time)
     
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
    this.$emit('stopAll');
    (this.$refs.audio as HTMLAudioElement).play();
  }
  pause() {
    (this.$refs.audio as HTMLAudioElement).pause();
  }
  onError(res: any) {
    this.audio.playing = false;
    console.log(res);
  }
  // 当音频开始等待
  onWaiting(res: any) {
    console.log(res);
    this.audio.waiting = true
  }
  updateTime(e:any){
     this.currentTime = e.target.currentTime
   
  }
  // 当音频开始播放
  onPlay(res: any) {
    this.audio.playing = true;
    this.audio.waiting = false
    console.log(res);
  }
  onPause(res: any) {
    this.audio.playing = false;
    this.audio.waiting = false;
    console.log(res);
  }
  onEnd(res: any) {
    this.audio.playing = false;
    this.audio.waiting = false;
    (this.$refs.audio as HTMLAudioElement).currentTime = 0
    this.currentTime = 0
  }
  percentChange(percent:number){
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
  .audio{
      height:30px;
      margin: 15px 0;
      display: flex;
      align-items: center;
      .btn-play{
          width: 26px;
          height: 26px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 10px;
          flex-shrink: 0;
          .icon{
            width: 86%;
            height: 86%;
          }
          img{
              width: 100%;
              border-radius: 50%;
          }
      }
      p{
          font-size: 16px;
          padding-right:5px;
          color: #666;
      }
      .slider_wrap{
          width: 215px;
          margin: 0 10px;
      }
  }
  
</style>