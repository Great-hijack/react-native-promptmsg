
# react-native-promptmsg

[中文文档](./README_zh.md)

[![npm version](https://badge.fury.io/js/react-native-promptmsg.svg)](https://badge.fury.io/js/react-native-promptmsg)
![npm](https://img.shields.io/npm/dm/react-native-promptmsg)
![GitHub](https://img.shields.io/github/license/RysisLiang/react-native-promptmsg)

> This is an ios-style prompt dialog by react-native and support both Android and iOS.

> Already integrated dependency `react-native-root-siblings`

![](media/alert_demo_1.gif)

### Install

```bash
$ npm install --save react-native-promptmsg
```
or
```bash
$ npm install --save https://github.com/RysisLiang/react-native-promptmsg.git
```

### method and properties

##### AlertMsg.alert(data:Object, buttons:Array): RootSiblings

properties

- data
    - title:（required）
    - content:（optional）
- buttons（optional）
    - text
    - press
    - renderItem: custom a single button


##### AlertMsg.alertByRender(func:Function): RootSiblings

- func:（optional）

##### AlertMsg.close(rs:RootSiblings): void

- rs:（optional）

## Usage

##### default dialog of ios-style

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

##### custom a single button

Clicked actions need to be passed along with the component.

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

##### custom overall dialog of style

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

---

**MIT Licensed**