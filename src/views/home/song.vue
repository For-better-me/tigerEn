<template>
  <div class="common_feature wrap">
      <scroll-page @pullingUp='loadMore'  :scrollData='list'>
         <div slot='content'>
             <item-song v-for='item in list' :key='item.id' :item = 'item'></item-song>
         </div>
      </scroll-page>
    
    
  </div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
import itemSong from '@/components/baseSongPic.vue'
import {FeatureMinix} from "@/util/mixins";
import {SongApi} from '@/api/feature'
@MyComponent({
  components:{itemSong}
})
export default class Song extends AbstractBaseVue.Mixins(FeatureMinix) {
  created(){
	  this.getList(SongApi.list)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import url('../../assets/css/home/common_feature.less');
    
</style>
