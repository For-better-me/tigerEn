import {
  Vue,
  Component, Mixins,
  Emit, Model,
  Inject, Provide,
  Prop, Watch,
} from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class'; // TODO 使用类型化的vuex
import scrollPage from "@/components/scrollPage.vue";
export default class AbstractBaseVue extends Vue {
  
  public static readonly Mixins = Mixins;
  
}
export {
  // TIP 特殊化命名的Component模块，方便引入
  Component as MyComponent,
  Mixins as MyMixins,
  Provide as MyProvide,
  Inject as MyInject,
  Model as MyModel,
  Prop as MyProp,
  Watch as MyWatch,
  Emit as MyEmit,

  // TIP 特殊化命名的 Vuex类型工具。
  Action as MyAction,
  Getter as MyGetter,
  Mutation as MyMutation,

  // // TIP 原生Vue
  // Vue as OriginVue,
};