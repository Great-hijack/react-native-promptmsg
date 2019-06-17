
# react-native-promptmsg

[中文文档](./README_zh.md)

### Install

~~`$ npm install --save react-native-promptmsg `~~

or

`$ npm install --save https://github.com/RysisLiang/react-native-promptmsg.git`

TODO




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
  