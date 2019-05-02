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
        <p>{{currentTime}}</p>
        <div class="slider_wrap">
          <slider :percent="percent" @percentChange='percentChange'></slider>
        </div>
        <p>{{duration}}</p>
        <audio
          ref="audio"
          @play="onPlay"
          @error="onError"
          @waiting="onWaiting"
          @pause="onPause"
          @ended="onEnd"
          src="http://m10.music.126.net/20190502172457/243fc446f6f2320c448d0989b7b9075c/ymusic/76b4/dcbb/0a65/9198b18815ee8ce42ae368ae29276f78.mp3"></audio>
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
export default class SongInfo extends Vue {
  percent: number = 0;
  duration:number = 120;
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
  get currentTime(): number {
    let time = this.percent*this.duration/100
    return time
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
  // 当音频开始播放
  onPlay(res: any) {
    this.audio.playing = true;
    console.log(res);
  }
  onPause(res: any) {
    this.audio.playing = false;
    console.log(res);
  }
  onEnd(res: any) {}
  percentChange(percent:number){
      this.percent = percent/100
      console.log(percent)
  }
}
</script>
<style lang='less' scoped>
@import url("../../assets/css/home/info.less"); //@import url(); 引入公共css类
</style>