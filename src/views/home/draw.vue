<template>
  <div class="common_feature">
      <scroll-page @pullingUp='loadMore'   :scrollData='list'>
         <div slot='content'>
            <item-song v-for='item in list' :key='item.id' :item = 'item' @infoEvent='toDetail'></item-song>
         </div>
      </scroll-page>
    
    
  </div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent,MyMixins} from "@/util/AbstractBaseVue";
import {FeatureMinix} from "@/util/mixins";
import itemSong from '@/components/baseSongPic.vue'
import {PictureApi} from '@/api/feature'
@MyComponent({
  components:{itemSong}
})
export default class Draw extends AbstractBaseVue.Mixins(FeatureMinix) {

  created(){
	  this.getList(PictureApi.list)
  }
  toDetail(id:number|string){
    this.$router.push('/drawInfo/'+id)
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import url('../../assets/css/home/common_feature.less');
    
</style>
