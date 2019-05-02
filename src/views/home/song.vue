<template>
  <div class="common_feature wrap">
      <scroll-page @pullingUp='loadMore'  :scrollData='list'>
         <div slot='content'>
             <item-song v-for='item in list' :key='item.id' :item = 'item' @infoEvent='toDetail'></item-song>
             <!-- //千万记住 给子组件传值时，属性是: 方法是@，切记切记！！！
             //@ziFunctionName=fuFunctionName,千万不要加（），会自动触发的！！！！ -->
         </div>
      </scroll-page>
    
    
  </div>
</template>

<script lang="ts">///ts === lang='ts'
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
import itemSong from '@/components/baseSongPic.vue'
import {FeatureMinix} from "@/util/mixins";
import {SongApi} from '@/api/feature'
//ts一定要加@component
@MyComponent({
  components:{itemSong}
})
export default class Song extends AbstractBaseVue.Mixins(FeatureMinix) {
  toDetail(id:number|string){
    this.$router.push('/songInfo/'+id)
  }
  created(){
	  this.getList(SongApi.list)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import url('../../assets/css/home/common_feature.less');
    
</style>
