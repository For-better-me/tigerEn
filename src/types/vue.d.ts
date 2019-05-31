import Vue, { VueConstructor } from 'vue'
import {ForceUpdate} from './index'
declare module 'vue/types/vue' {
    // 可以使用 `VueConstructor` 接口
    // 来声明全局属性
    // 可以使用 `Vue` 接口
    // 来声明实例
    interface Vue {
      $util: any,
      $http:any,
      
    }
    
}


