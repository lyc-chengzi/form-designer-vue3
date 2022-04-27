## 将json文件渲染成最终效果

### dynamicRenderer -> 动态渲染，直接将结构渲染到页面上，不生成静态文件

```
import DynamicRenderer from "../renderer/dynamicRenderer";
import data from "./demo1.data";
render(): VNode {
  return (
    <div id="cms_demo1">
      <dynamic-renderer json={data}></dynamic-renderer>
    </div>
  );
}
```


