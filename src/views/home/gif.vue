<template>
  <div class="common_feature">
      <scroll-page @pullingUp='loadMore'>
         <div slot='content' class='wrap'>
             <item-gif text='动画' v-for='item in list' :key='item.id' :item = 'item'></item-gif>
         </div>
      </scroll-page>
    
  </div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent,MyMixins} from "@/util/AbstractBaseVue";
import itemGif from '@/components/baseLesson.vue'
import {CartoonApi} from '@/api/feature'
import {FeatureMinix} from "@/util/mixins";
@MyComponent({
  components:{itemGif}
})
export default class Song extends AbstractBaseVue.Mixins(FeatureMinix)  {
    // data

  created(){
	  this.getList(CartoonApi.list)
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import url('../../assets/css/home/common_feature.less');
    
</style>
