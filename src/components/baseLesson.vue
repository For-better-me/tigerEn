<template>
    <div class="common_gif" @click="goDetail(item.id,item.is_begins)">
        <img :src="imgPre+item.img" alt="">
        <div class='lead'>
            <h4>{{item.title}}</h4>
            <p>{{getDate(item.begins_time)}}开课</p>
            <span>去试听</span>
        </div>
        
        
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
    goDetail(id:string|number,is_begins:string|number){
        this.$emit('infoEvent',id,is_begins)
    }
    getDate(val:any){
        if(val){
            // val = parseInt(val) * 1000;
            // val = new Date(val);
            // val = this.$util.formatDate(val,'-')
            let date = val.split('-')
            return `${date[0]}月${date[1]}日`
        }
        
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
        .lead{
            padding: 0.3rem;
            color: #fff;
            position: absolute;
            left: 0.3rem;
            top: 0.6rem;
            h4{
                font-size: 22px;
                font-weight: 600;
            }
            p{
                font-size:14px;
                margin-top: 15px;
                margin-bottom: 10px;
            }
            span{
                font-size: 12px;
            }
        }
        
    }
    
</style>
