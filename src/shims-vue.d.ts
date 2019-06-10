declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'canvas2image'{/////////ts
  const canvas2image: any;
  export default canvas2image;
}
declare module 'vue-clipboard2'{/////////ts
  const vueClipboard: any;
  export default vueClipboard;
}
// import Vue from 'vue'
// declare module 'vue/types/vue' {
//     // 可以使用 `VueConstructor` 接口
//     // 来声明全局属性
//     // 可以使用 `Vue` 接口
//     // 来声明实例
//     interface Vue {
//       $util: any;
      
//     }
    
// }
