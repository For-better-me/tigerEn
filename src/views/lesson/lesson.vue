<template>
  <div class="lesson">
    <scroll-page @pullingUp='loadMore'>
      <div slot="content">
        <item-lesson></item-lesson>
      </div>
      
    </scroll-page>
    
    <tab index='2'></tab>
  </div>
</template>

<script lang="ts">
import AbstractBaseVue,{MyComponent} from "@/util/AbstractBaseVue";
import tab from "@/components/tab.vue";
import itemLesson from '@/components/baseRecordL.vue'
@MyComponent({
  components: {
    tab,itemLesson
  }
})
export default class lesson extends AbstractBaseVue {
  list: object[] = [];
  totalPage:number = 0
  limit:number =  1
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
    LessonApi.hotLesson(data).then(res=>{
      console.log(this)
      if(page == 1){
        this.list = res.data
        this.totalPage = res.total_page
      } else{
        this.list = this.list.concat(res.data)
      }
      console.log(this.list,333333333,res)
      
    })
  }
  mounted(){
    // this.$http({
    //   url:'Payment/purchase',
    //   data:{curriculum_id:18}
    // }).then((res:any)=>{
    //     console.log(res)
    // }).catch((err:any)=>{
    //   console.log(err)
    // })
    // let url = window.location.href
    // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0e81c3bee622d60&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
  }
}
</script>
<style>
</style>

