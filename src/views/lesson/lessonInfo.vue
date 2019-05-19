<template>
  <div class="lesson_info">
    <img class='lesson_poster' src="../../assets/img/info.png" alt="">
    <div class="common_box">
      <div class="common_tit">One time</div>
      <div class="common_con words">
        <ul>
          <li>
            <img src alt>
            <div class="text">
              <h4>手指</h4>
              <p>finger</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="common_box module_con">
      <div class="common_tit">关键句型</div>
      <p>固儿歌特别适合孩子的英语启蒙，初期我们建议每周学习一首。本周的“One Little Finger”旋律很简单，适合在不同场景里运用，比如穿衣服、洗澡、挠痒痒等~</p>
      <div class="target">
          <div class="tit">
              <img src="" alt="">
              <p>本周目标</p>
          </div>
          <div class="target_info">
              <p>固儿歌特别适合孩子的英语启蒙，初孩子的英语启蒙，初期我们建议每周学习一首。</p>
          </div>
      </div>
        <player
          src='http://m10.music.126.net/20190517224256/a3a788c9150fc336f26967e31fd21694/ymusic/76b4/dcbb/0a65/9198b18815ee8ce42ae368ae29276f78.mp3'
         
          ></player>
          <player
          src='http://m10.music.126.net/20190517223841/bd8ed816c4f88b6d8a9d2140071394a3/ymusic/683a/f9d9/d013/e64a3aa2581c0f08de0f9a6fbe0b81f9.mp3'
         
          ></player>
      <div class="common_con">
        <div class="module_item item_video">
            <p class="guide">固儿歌特别适合孩子的英语启蒙，初期我们建议每周学习一首。</p>
            <img src="../../assets/img/pic-info.png" alt="">
           <video src="http://service.ivydad.com/tools/upload/2164f4fe-7cc1-171f-dc11-13a4dec5f7be.mp4"
            poster="http://service.ivydad.com/tools/upload/b4289d81-4f7d-0ad5-669c-f6980289ad1e.jpg" 
            preload="meta" controls="controls" loop="loop" 
            x5-video-player-type="h5" x5-video-player-fullscreen="true">
            您的设备不支持HTML5播放器
            </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
import Player from '@/components/player.vue'
import { LessonApi } from "@/api/lesson";
@MyComponent({
  components: {Player}
})
export default class LessonInfo extends AbstractBaseVue {
  mounted() {}
}
</script>
<style lang='less' scoped>
@import url("../../assets/css/lesson/info.less");
</style>