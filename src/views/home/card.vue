<template>
  <div class="word_card">
      <div class="word_show" ref='test'>
        <img src="../../assets/img/pic_card.png" alt="">
        <h4>{{currentWord.cn}}</h4>
        <p>{{currentWord.en}}</p>
        
        <audio 
		 	@play="onPlay"
			@error="onError"
			@waiting="onWaiting"
			@pause="onPause"
			@ended="onEnd"
			:src="currentWord.src" ref='audio' id='audio'></audio>
      </div>
      <div class="btn_control">
        <div class="btn prev" @click="prev()"><img src="../../assets/img/arrow1.png" alt=""></div>
        <div class="btn play" @click="startPlayOrPause()"><img src="../../assets/img/btn-play.png" alt=""></div>
        <div class="btn next" @click="next()"><img src="../../assets/img/arrow2.png" alt=""></div>
      </div>
    
    
  </div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent,MyWatch } from "@/util/AbstractBaseVue";
@MyComponent({
  components:{}
})
export default class WordCard extends AbstractBaseVue {
//    data
	audioList:object[]=[
		{
			cn:'狗',
			en:'Dog',
			src:'http://fs.open.kugou.com/d80877f5b799bc3163e98a89153ad617/5cbead59/G158/M03/0E/11/3g0DAFyoGJmIW4kIAA4t9oLYYzkAAAWtQIhJdUADi4O900.mp3',
			img:'../../assets/img/pic_card.png'
		},
		{
			cn:'猫',
			en:'Cat',
			src:'http://fs.open.kugou.com/df46fb7acd03d027c46461a08a187c72/5cbeaf67/G011/M01/04/07/q4YBAFUKm0mIKPB1AAFljUQ7v3QAAA0EwPF75kAAWWl501.mp3',
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
			src:'http://m10.music.126.net/20190423143428/b42f2ce2cdd7ee0ad76d9157cecacfa5/ymusic/76b4/dcbb/0a65/9198b18815ee8ce42ae368ae29276f78.mp3',
			img:'../../assets/img/pic_card.png'
		}
	]
	wordsTotle:number = 3
	indexAudio:number=0
	currentWord:any=this.audioList[this.indexAudio]
	initAudioOpts:any = {
		playing:false,
		waiting:true,
		playCount:0
	}
	audio:any = this.initAudioOpts
	MAXPLAYCOUNT:number = 3

//    methods
   startPlayOrPause(){
      return this.audio.playing ? this.pause() : this.play()
   }
   prev(){
	   if(this.indexAudio>0){
		   this.indexAudio--
	   }
	   
	   console.log(this.indexAudio)
   }
   next(){
	   if(this.indexAudio<this.wordsTotle){
		   this.indexAudio++
	   }
	   console.log(this.indexAudio)
   }
   play(){
	   (this.$refs.audio as HTMLAudioElement).play()
   }
   pause(){
	   (this.$refs.audio as HTMLAudioElement).pause()
   }
   onError(res:any) {
	  this.audio.waiting = true
	  console.log(res)
    }
    // 当音频开始等待
    onWaiting(res:any) {
      console.log(res)
    }
    // 当音频开始播放
    onPlay(res:any) {
      this.audio.playing = true
      console.log(res)
	}
	onPause(res:any) {
      this.audio.playing = false
      console.log(res)
	}
	onEnd(res:any){
	   this.audio.playCount++
	   if(this.audio.playCount<=this.MAXPLAYCOUNT){
		   this.play()
	   }
	}
	
	// watch
	@MyWatch('indexAudio')
	ageChange(newVal:number,oldVal:number){
		this.pause()
		this.currentWord = this.audioList[newVal]
		this.audio = this.initAudioOpts
		setTimeout(() => {
			this.play()
		}, 1000);
    }

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import url('../../assets/css/home/wordCard.less');
    
</style>
