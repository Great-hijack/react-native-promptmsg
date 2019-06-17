import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import AlertStyleOfIOS from "./src/AlertStyleOfIOS";


let _lastAlertRS = null;

/**
 * 在安卓平台上提供与ios原生类似的提示框
 */
export default class AlertMsg extends React.Component {

    /**
     * 弹出弹出窗口
     * @param message m.title:标题; m.content:内容
     * @param options （array）选项名称
     * @param actions （array）选项动作
     * @returns {RootSiblings}
     */
    static alert = (message, options = ['确定'], actions = []) => {
        if (_lastAlertRS) {
            AlertMsg.close(_lastAlertRS);
        }
        _lastAlertRS = new RootSiblings(
            <AlertStyleOfIOS
                refClose={() => AlertMsg.close(_lastAlertRS)}
                message={message}
                options={options}
                actions={actions}
            />
        );
        return _lastAlertRS;
    };

    /**
     * 关闭弹出窗口
     * @param alertRS
     */
    static close = (alertRS) => {
        if (alertRS instanceof RootSiblings) {
            alertRS.destroy();
        } else {
            console.log(`AlertMsg.close : the type of alertRS is not RootSiblings`);
        }
    };

    constructor() {
        super(...arguments);
        this.state = {
            // windowHeight: window.height,
            // keyboardScreenY: window.height
        };
    }

    // componentWillMount = () => {
    //     this._toast = new RootSiblings(<ToastContainer
    //         {...this.props}
    //         duration={0}
    //     />);
    // };
    //
    // componentWillReceiveProps = nextProps => {
    //     this._toast.update(<ToastContainer
    //         {...nextProps}
    //         duration={0}
    //     />);
    // };
    //
    // componentWillUnmount = () => {
    //     this._toast.destroy();
    // };

    render() {
        return null;
    }
}