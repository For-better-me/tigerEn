<template>
    <div class="common_gif">
        <img src="../assets/img/bg_pic.png" alt="">
        <p>小白兔小白兔~白又白</p>
        <span>{{text}}</span>
    </div>
</template>

<script lang="ts">
import AbstractBaseVueMixins,{MyComponent,MyProp} from "@/util/AbstractBaseVue";
import tab from "@/components/tab.vue";
@MyComponent({
  components: {
    tab
  }
})
export default class lesson extends AbstractBaseVueMixins {
    @MyProp() private text!: string;
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import url('../assets/css/common/common.less');
    .common_gif{
        width: 100%;
        height: 150px;
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        margin-bottom: 15px;
        img{
            width: 100%;
        }
        p{
            font-size: 14px;
            color: #fff;
            position: absolute;
            right: 15px;
            bottom: 15px;
        }
        span{
            font-size: 10px;
            color: #fff;
            width: 30px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            position: absolute;
            right: 20px;
            top: 20px;
            background: #FC5E64;
            border-radius: 2px;
        }
    }
    
</style>
