<template>
    <div class='song_info'></div>
</template>

<script>

import AbstractBaseVue, { MyComponent,MyMixins } from "@/util/AbstractBaseVue";
export default class Info extends AbstractBaseVue{
    //生命周期 - 创建完成（可以访问当前this实例）
    // infoContent:string = ''//详情页面得内容
    created() {

    }
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.init()
    }
    // methods
    
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