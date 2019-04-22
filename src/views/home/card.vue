<template>
  <div class="word_card">
      <div class="word_show" ref='test'>
        <img src="../../assets/img/pic_card.png" alt="">
        <h4>{{currentWord.cn}}</h4>
        <p>{{currentWord.en}}</p>
        
        <audio src="" ref='audio' @play='onPlay' id='audio'></audio>
      </div>
      <div class="btn_control">
        <div class="btn prev"><img src="../../assets/img/arrow1.png" alt=""></div>
        <div class="btn play" @click="play()"><img src="../../assets/img/btn-play.png" alt=""></div>
        <div class="btn next"><img src="../../assets/img/arrow2.png" alt=""></div>
      </div>
    
    
  </div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
@MyComponent({
  components:{}
})
export default class WordCard extends AbstractBaseVue {
   
   audioList:object[]=[
     {
        cn:'狗',
        en:'Dog',
        src:'http://sc1.111ttt.cn:8282/2017/1/11m/11/304112002072.m4a?tflag=1546606800&pin=97bb2268ae26c20fe093fd5b0f04be80#.mp3',
        img:'../../assets/img/pic_card.png'
     },
     {
        cn:'猫',
        en:'Cat',
        src:'http://sc1.111ttt.cn:8282/2018/1/03m/13/396131227447.m4a?tflag=1546606800&pin=97bb2268ae26c20fe093fd5b0f04be80#.mp3',
        img:'../../assets/img/pic_card.png'
     },
     {
        cn:'鱼',
        en:'Fish',
        src:'http://sc1.111ttt.cn:8282/2017/1/05m/09/298092204432.m4a?tflag=1546606800&pin=97bb2268ae26c20fe093fd5b0f04be80#.mp3',
        img:'../../assets/img/pic_card.png'
     },
     {
        cn:'苹果',
        en:'Apple',
        src:'http://m10.music.126.net/20190422194802/1faa2200311ee90cfd8634ecb7f64bd3/ymusic/76b4/dcbb/0a65/9198b18815ee8ce42ae368ae29276f78.mp3',
        img:'../../assets/img/pic_card.png'
     }
   ]
   currentWord:any=this.audioList[0]
   play(){
      (this.$refs.audio as HTMLAudioElement).play()
    //  let audio:any = document.getElementById('audio')
    // //  audio.width()
     console.log(this.$refs,(this.$refs.audio as HTMLAudioElement).src)
    
   }
   onPlay(){
     console.log(this)
   }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import url('../../assets/css/home/wordCard.less');
    
</style>
