<template>
    <div class="common_gif" @click="goDetail(item.url)">
        <img :src="imgPre+item.img" alt="">
        <p>{{item.title}}</p>
        <!-- <span>{{text}}</span> -->
    </div>
</template>

<script lang="ts">
import AbstractBaseVueMixins,{MyComponent,MyProp} from "@/util/AbstractBaseVue";
@MyComponent({
  components: {}
})
export default class lesson extends AbstractBaseVueMixins {
    @MyProp() private text!: string;
    @MyProp() private item!: any;
    @MyProp({required:false,type:Function}) infoEvent!: ()=>{};
    goDetail(url:string|number){
        this.$emit('infoEvent',url)
    }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import url('../assets/css/common/common.less');
    .common_gif{
        width: 100%;
        height: 55vw;
        border-radius: 18px;
        position: relative;
        overflow: hidden;
        margin-bottom: 8vw;
        box-shadow: 0 0 4vw 1.46667vw #ddd;
        img{
            width: 100%;
            height: 100%;
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
