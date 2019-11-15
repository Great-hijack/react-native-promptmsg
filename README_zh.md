
# react-native-promptmsg

[![npm version](https://badge.fury.io/js/react-native-promptmsg.svg)](https://badge.fury.io/js/react-native-promptmsg)
![npm](https://img.shields.io/npm/dm/react-native-promptmsg)
![GitHub](https://img.shields.io/github/license/RysisLiang/react-native-promptmsg)

> 使用 react-native 实现的类似iOS上原生的提示对话框样式，支持安卓和iOS。

> 依赖 `react-native-root-siblings`

![](media/alert_demo_1.gif)

### 安装

以下两种方式

```bash
$ npm install --save react-native-promptmsg
```
或者
```bash
$ npm install --save https://github.com/RysisLiang/react-native-promptmsg.git
```

### 方法和属性

##### AlertMsg.alert(data:Object, buttons:Array): RootSiblings

显示提示窗（根据传入的参数内容），并返回一个 RootSiblings 类型的对象。

属性

- data
    - title: 标题（必传）
    - content: 提示内容（可选）
- buttons（可选）
    - text: 按钮名称
    - press: 按钮动作
    - renderItem: 自定义按钮的组件（按钮动作可以需直接写入组件中）

注意

- 按钮个数不同样式不同。
    - 1个：横向显示一个按钮；
    - 2个：横向显示两个按钮；
    - 3个以上：竖排显示多个按钮，最后一个自动添加特殊样式。

- 不传的时候，按钮默认效果都是取消。

##### AlertMsg.alertByRender(func:Function): RootSiblings

属性

- func:（必传）一个返回渲染 react-native 的标签元素结果的函数。按钮的动作关闭需要手动在 finally 里指定。


##### AlertMsg.close(rs:RootSiblings): void

属性

- rs:（可选）如果传入了 RootSiblings 对象则将其关闭并释放。如果不传该参数，则会默认找到上次创建且并未释放的实例。


### 如何使用

##### 默认的提示框样式

第二个参数不传时或者个数小于2，只有 `OK` 按钮。

```javascript
import AlertMsg from 'react-native-promptmsg';

AlertMsg.alert(
    {
        title: 'Alert 1',
        content: 'content 111111'
    },
    [
        {
            text: 'OK',
            press: () => Alert.alert("ok success")
        },
        {
            text: 'Cancel',
        },
    ],
);
```

##### 修改某个按钮的样式

通过 renderItem 参数来覆盖默认的组件，但是点击的动作需要跟随组件一同传入，所以也无需传递 press 参数。

```javascript
import AlertMsg from 'react-native-promptmsg';

AlertMsg.alert(
    {
        title: 'Alert 2',
        content: 'content 222222'
    },
    [
        {
            text: 'OK',
            press: () => Alert.alert("ok success", 'abcdef')
        },
        {
            text: 'Test1',
            renderItem: () =>
                <View style={{
                    backgroundColor: '#b0dcd9',
                    borderTopWidth: 0.5,
                    borderTopColor: '#ebebeb'
                }}>
                    <TouchableOpacity activeOpacity={0.7}
                                    style={{backgroundColor: '#9fffc1'}}
                                    onPress={() => {
                                        try {
                                            // do somethings ...
                                        } finally {
                                            AlertMsg.close(); // must be close!
                                        }
                                    }}>
                          <View style={{
                              height: 104,
                              justifyContent: 'center',
                              alignItems: 'center'
                          }}>
                              <Text style={{fontSize: 16, color: 'red'}}>Custom button</Text>
                          </View>
                    </TouchableOpacity>
                </View>
        },
        {
            text: 'Cancel',
        },
    ],
);
```

##### 自定义整个提示对话框

完全的自定义提示对话框

```javascript
import AlertMsg from 'react-native-promptmsg';

AlertMsg.alertByRender(() =>
  <View style={{
      width: 180,
      height: 150,
      backgroundColor: '#b0dcd9',
  }}>
      <TouchableOpacity activeOpacity={0.7}
                        style={{backgroundColor: '#9fffc1'}}
                        onPress={() => {
                            try {
                                // do somethings ...
                            } finally {
                                AlertMsg.close(); // must be close!
                            }
                        }}>
          <View style={{
              height: 150,
              justifyContent: 'center',
              alignItems: 'center'
          }}>
              <Text style={{fontSize: 16, color: 'red'}}>
                  Custom dialog
              </Text>
          </View>
      </TouchableOpacity>
  </View>
)
```

### 更新日志

- v0.2.0 接口参数调整，不予之前版本兼容，需要做一些调整；
- v0.1.1 一个基础功能版本；

---

**MIT Licensed**