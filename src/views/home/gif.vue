<template>
  <div class="common_feature">
      <scroll-page @pullingUp='loadMore'>
         <div slot='content'>
             <item-gif text='动画' v-for='item in list' :key='item.id' :item = 'item'></item-gif>
         </div>
      </scroll-page>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import itemGif from '@/components/baseLesson.vue'
import {CartoonApi} from '@/api/feature'
@Component({
  components:{itemGif}
})
export default class Song extends Vue {
    // data
  list:any[] = []
  totalPage:number = 0
  limit:number =  5
  page:number = 1
  loadMore(scroll:any) {
      if(this.page<this.totalPage){
        this.page++
        this.getList(this.page)
      } else{
        scroll.forceUpdate();
      }
      
  }
  getList(page:number = 1,limit:number=this.limit){
    let data = {page,limit}
    CartoonApi.list(data).then(res=>{
      if(page == 1){
        this.list = res.data.list
        this.totalPage = res.data.total_page
      } else{
        this.list = this.list.concat(res.data.list)
      }
      
    })
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import url('../../assets/css/home/common_feature.less');
    
</style>
