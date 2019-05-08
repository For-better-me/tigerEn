<template>
  <div class="no_data">
    <img src="../assets/img/bg_draw.png" alt="">
    <p>{{tipText}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NoData extends Vue {
  @Prop() private tipText!: string;
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import url('../assets/css/common/common.less');
    .no_data{
        img{
            width: 100px;
            margin: 0 auto;
        }
        p{
            font-size:16px;
            color:#999;
            text-align: center;
            margin-top: 20px;
        }
    }
</style>
