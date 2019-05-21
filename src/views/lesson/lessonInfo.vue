<template>
  <div class="lesson_info" v-if="detail">
    <img class="lesson_poster" src="../../assets/img/info.png" alt>
    <div class="common_box">
      <div class="common_tit">One time</div>
      <div v-for="item in detail.text" :key="item.id">
        <div class="common_item" v-if="item.type == 1">
          <div class="common_con words">
            <ul>
              <li v-for="(word,i) in item.text" :key="i">
                <img :src="imgPre+word.word_img" alt>
                <div class="text">
                  <h4>{{word.word_title}}</h4>
                  <p>{{word.word_eng_title}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="common_item item_text" v-if="item.type == 2">
          <p>{{item.desc}}</p>
          <p>本地占位--固儿歌特别适合孩子的英语启蒙，初期我们建议每周学习一首。本周的“One Little Finger”旋律很简单，适合在不同场景里运用，比如穿衣服、洗澡、挠痒痒等~</p>
        </div>
        <div class="common_item" v-if="item.type == 3">
          <img :src="imgPre+item.img" alt>
        </div>
        <div class="common_item" v-if="item.type == 4">
          <div class="misic" v-for='(music,j) in item.text' :key='j'>
            <player
              :src="imgPre+music.music_file"
              :time='music.music_time'
              @stopAll = 'stopAll'
              ref='player'
            ></player>
          </div>
        </div>
        <div class="common_item" v-if="item.type == 5">
          <div class="video" v-for='(video,k) in item.text' :key='k'>
            <video
            :src="imgPre+video.video_file"
            :poster="imgPre+video.video_img"
            preload="meta"
            controls="controls"
            loop="loop"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
          >您的设备不支持HTML5播放器</video>
          </div>
          
        </div>
      </div>
    </div>

    <!-- <div class="common_box module_con">
      <div class="common_tit">关键句型</div>
      <div class="target">
        <div class="tit">
          <img src alt>
          <p>本周目标</p>
        </div>
        <div class="target_info">
          <p>固儿歌特别适合孩子的英语启蒙，初孩子的英语启蒙，初期我们建议每周学习一首。</p>
        </div>
      </div>
      <player
        src="http://m10.music.126.net/20190517224256/a3a788c9150fc336f26967e31fd21694/ymusic/76b4/dcbb/0a65/9198b18815ee8ce42ae368ae29276f78.mp3"
      ></player>
      <player
        src="http://m10.music.126.net/20190517223841/bd8ed816c4f88b6d8a9d2140071394a3/ymusic/683a/f9d9/d013/e64a3aa2581c0f08de0f9a6fbe0b81f9.mp3"
      ></player>
      <div class="common_con">
        <div class="module_item item_video">
          <p class="guide">固儿歌特别适合孩子的英语启蒙，初期我们建议每周学习一首。</p>
          <img src="../../assets/img/pic-info.png" alt>
          <video
            src="http://service.ivydad.com/tools/upload/2164f4fe-7cc1-171f-dc11-13a4dec5f7be.mp4"
            poster="http://service.ivydad.com/tools/upload/b4289d81-4f7d-0ad5-669c-f6980289ad1e.jpg"
            preload="meta"
            controls="controls"
            loop="loop"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
          >您的设备不支持HTML5播放器</video>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script lang='ts'>
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
import Player from "@/components/player.vue";
import { LessonApi } from "@/api/lesson";
@MyComponent({
  components: { Player }
})
export default class LessonInfo extends AbstractBaseVue {
  detail: any = null;
  mounted() {
    this.init();
    console.log(this)
  }
  init() {
    let type: number = parseInt(this.$route.params.type);
    let id = this.$route.params.id;
    console.log(type, id, this.$route.params);
    let params = {};
    if (type == 3) {
      params = { days_id: id };
    } else {
      params = { id };
    }
    LessonApi.lessonInfo(type, params).then(res => {
      this.detail = res.data;
    });
  }
  stopAll(){
    let arrPlayer = this.$refs.player;
    (arrPlayer as any[]).forEach((player)=>{
       (player.$refs.audio as HTMLAudioElement).pause()
    })
    console.log(this,typeof(arrPlayer))
    // for(let i = 0;i<arrPlayer.length;i++){

    // }
      
    
  }
}
</script>
<style lang='less' scoped>
@import url("../../assets/css/lesson/info.less");

</style>