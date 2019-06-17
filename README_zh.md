
# react-native-promptmsg

> 一个主要在Android提供的类似IOS上原生提示窗样式的提示窗。其在IOS和Android上均能达到预期的显示效果。

> 组件主要依赖 `react-native-root-siblings`

### 安装

以下两种方式

~~`$ npm install --save react-native-promptmsg`~~

2019-06-17：有一些问题导致npm安装暂不好使。

或者

`$ npm install --save https://github.com/RysisLiang/react-native-promptmsg.git`

### 方法和属性

##### AlertMsg.alert(data:Object, btnNames:Array, btnActions:Array): RootSiblings

显示提示窗（根据传入的参数内容），并返回一个 RootSiblings 类型的对象。

属性

1. data.title: 对应的是提示框的标题

2. data.content: 备注内容（可选）

3. btnNames: 按钮的名称。其中提示框的显示样式就是根据名称的个数来判断的。
    1. 1个：默认是‘确认’，只会显示一个按钮；
    2. 2个：横向显示连个按钮；
    3. 多个：竖排显示多个按钮，最后一个自动添加特殊样式。

4. btnActions: btnNames 和 btnActions 根据 index 一一对应。不传的时候，按钮默认效果都是取消。

##### AlertMsg.close(rs:RootSiblings): void

关闭提示窗（在你需要强制外部关闭时使用，一般情况不需要使用），传入alert获得对象。


### 如何使用
```javascript
import AlertMsg from 'react-native-promptmsg';

// 在你需要的位置
AlertMsg.alert(
  {
      title: '提示1',
      content: 'AlertIOS2 SHOW'
  },
  ['确定', '取消'], 
  [
      () => {
        // to do somethings ...
      }
  ]
);
```
  