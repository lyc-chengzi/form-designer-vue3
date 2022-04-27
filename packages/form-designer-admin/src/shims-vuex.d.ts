import { ComponentCustomProperties } from 'vue';
import { IDesignerComponent } from 'form-designer-types/interface/designer'
import { message } from 'ant-design-vue';
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  interface State {
    count: number
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
    $clipboard: any;
    $message: message;
    $default_componentList: IDesignerComponent[]
  }
}