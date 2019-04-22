<template>
  <div class="common_feature">
      <scroll-page @pullingUp='loadMore'>
         <div slot='content'>
            <item-song></item-song>
         </div>
      </scroll-page>
    
    
  </div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
import itemSong from '@/components/baseSongPic.vue'
@MyComponent({
  components:{itemSong}
})
export default class Song extends AbstractBaseVue {
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
