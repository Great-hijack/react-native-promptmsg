import {
    Dimensions,
    NativeModules,
    Platform
} from 'react-native';

const {height, width} = Dimensions.get('window');
const qmmInterface = NativeModules.SelfGoodsRCTController; // ios
const Global = {
    os: Platform.OS,
    osVersion: Platform.Version,
    width: width,
    height: height,
    qmmInterface: qmmInterface
};

export {Global};