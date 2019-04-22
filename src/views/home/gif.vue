<template>
  <div class="common_feature">
      <scroll-page @pullingUp='loadMore'>
         <div slot='content'>
             <item-gif text='动画'></item-gif>
             <item-gif text='动画'></item-gif>
             <item-gif text='动画'></item-gif>
             <item-gif text='动画'></item-gif>
             <item-gif text='动画'></item-gif>
             <item-gif text='动画'></item-gif>
             <item-gif text='动画'></item-gif>
             <item-gif text='动画'></item-gif>
             <item-gif text='动画'></item-gif>
             <item-gif text='动画'></item-gif>
             <item-gif text='动画'></item-gif>
             <item-gif text='动画'></item-gif>
         </div>
      </scroll-page>
    
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import itemGif from '@/components/baseLesson.vue'
@Component({
  components:{itemGif}
})
export default class Song extends Vue {
  loadMore(scroll:any) {
    // 模拟更新数据
      
      scroll.forceUpdate();
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import url('../../assets/css/home/common_feature.less');
    
</style>
