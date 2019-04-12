<template>
  <div class="hello">
    <h1 @click="add">{{ msg }}</h1>
    <p>{{aaa}}</p>
    <cube-button @click="showToastTime0">Toast - time 0</cube-button>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  aaa = 'zhangwenjie'
  showToastTime0() {
      const toast = this.$createToast({
        time: 1000,
        txt: 'Toast time 1s'
      })
      toast.show()
  }
  add(x:number){
    let self = this;
    this.aaa = 'w'
    const toast = this.$util.showLoad(this)
    console.log(toast)
    toast.show()
    // this.$createToast({
    //     txt: 'Timeout',
    //     time: 1000,
    //     $events: {
    //         timeout: () => {
    //             console.log('Timeout')
    //         }
    //     }
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
