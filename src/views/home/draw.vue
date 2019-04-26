<template>
  <div class="common_feature">
      <scroll-page @pullingUp='loadMore'>
         <div slot='content'>
            <item-song v-for='item in list' :key='item.id' :item = 'item'></item-song>
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
export default class Song extends AbstractBaseVue.Mixins(FeatureMinix) {
// export default class Song extends AbstractBaseVue {
  // data
  // list:any[] = []
  // totalPage:number = 0
  // limit:number =  5
  // page:number = 1
  // loadMore(scroll:any) {
  //     if(this.page<this.totalPage){
  //       this.page++
  //       this.getList(this.page)
  //     } else{
  //       scroll.forceUpdate();
  //     }
      
  // }
  // getList(page:number = 1,limit:number=this.limit){
  //   let data = {page,limit}
  //   PictureApi.list(data).then((res:any)=>{
  //     if(page == 1){
  //       this.list = res.data.list
  //       this.totalPage = res.data.total_page
  //     } else{
  //       this.list = this.list.concat(res.data.list)
  //     }
      
  //   })
  // }
  // minix

  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import url('../../assets/css/home/common_feature.less');
    
</style>
