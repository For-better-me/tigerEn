<template>
    <div class='featrue_info'></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Component, Prop, Vue } from 'vue-property-decorator';
export default class Info extends Vue{
    //生命周期 - 创建完成（可以访问当前this实例）
    // infoContent:string = ''//详情页面得内容
    created() {

    }
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.init()
    }
    // methods
    init(){
        let type = this.$route.query.type;//type:1song；2picture；3cartoon；4word
        let id = this.$route.query.type
        switch (type) {
            case 1:{
                break;
            }
            case 2:{
                break;
            }
            case 3:{
                break;
            }
            default:
                break; 
           
        }
    }
    songInfo(id){

    }
    imgInfo(id){

    }
    cartoonInfo(id){

    }
    songViews(id){

    }
    imgViews(id){

    }
    cartoonViews(id){

    }
    
}
</script>
<style lang='less' scoped>
    @import url("../../assets/css/home/info.less");//@import url(); 引入公共css类

</style>