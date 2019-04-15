<template>
  <div class="common_feature">
    <item-song></item-song>
    <item-song></item-song>
    <item-song></item-song>
    <item-song></item-song>
    <item-gif text='动画'></item-gif>
    <item-gif text='动画'></item-gif>
    <item-lesson></item-lesson>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import itemSong from '@/components/baseSongPic.vue'
import itemGif from '@/components/baseLesson.vue'
import itemLesson from '@/components/baseRecordL.vue'
@Component({
  components:{itemSong,itemGif,itemLesson}
})
export default class Song extends Vue {
  @Prop() private index!: number;
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import url('../../assets/css/home/songPic.less');
    
</style>
