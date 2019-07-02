<template>
  <div class="about_us">
      <div class="contact_info" v-if="contactInfo">
          <div v-html='contactInfo'>

          </div>
      </div>
    
  </div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent,MyAction,MyGetter} from "@/util/AbstractBaseVue";
import {otherApi} from '@/api/other'
@MyComponent({
  components: {
   
  }
})
export default class Person extends AbstractBaseVue {
  contactInfo:any = null;
  @MyAction('GetUserInfo') public getUserInfo!: any
  mounted(){
      this.getContact()
  }
  getContact(){
      otherApi.getAboutUs().then(res=>{
          this.contactInfo = res.data;
      })
  }
    
}
</script>
<style <style lang="less" scoped>
    .contact_info{
        padding:15px;
    }
</style>

