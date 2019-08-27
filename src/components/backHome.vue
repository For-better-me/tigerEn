<template>
  <div class="back_home" @click="$router.push('/')">
    <img  src="../assets/img/back_home.png" alt="" >
  </div>
</template>


<script lang="ts">
import AbstractBaseVue, { MyComponent, MyAction,MyWatch } from "@/util/AbstractBaseVue";
@MyComponent({
  components: {}
})
export default class BackHome extends AbstractBaseVue {


}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .back_home{
        position: fixed;
        right: 20px;
        bottom: 33px;
        width: 50px;
        height: 50px;
        background: #fff;
        border-radius: 100%;
        text-align: center;
        box-shadow: 0 0 10px 2px #dcdcdc;
        z-index: 9;
        img{
            width: 70%;
            margin: 14% auto;
        }
    }
</style>
