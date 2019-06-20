
# react-native-promptmsg

[中文文档](./README_zh.md)

[![npm version](https://badge.fury.io/js/react-native-promptmsg.svg)](https://badge.fury.io/js/react-native-promptmsg)

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

##### AlertMsg.alert(data:Object, btnNames:Array, btnActions:Array): RootSiblings

TODO ...

## Usage
```javascript
import AlertMsg from 'react-native-promptmsg';

AlertMsg.alert(
  {
      title: 'Title',
      content: 'Alert SHOW'
  },
  ['OK', 'Cancel'], 
  [
      () => {
        // to do somethings ...
      }
  ]
);
```

---

**MIT Licensed**