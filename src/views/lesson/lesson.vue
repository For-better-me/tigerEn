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
  loadMore(scroll:any) {
    // 模拟更新数据
      
      scroll.forceUpdate();
  }
  mounted(){
    this.$http({
      url:'Payment/purchase',
      data:{curriculum_id:18}
    }).then((res:any)=>{
        console.log(res)
    }).catch((err:any)=>{
      console.log(err)
    })
  }
}
</script>
<style>
</style>

