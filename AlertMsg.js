import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import AlertFrame from "./src/AlertFrame";


let _lastAlertRS = null;
let _alertDomRef = null;

/**
 * Alert dialog like ios-style of core class
 */
export default class AlertMsg extends React.Component {

    /**
     * alert dialog. use default dialog of like ios-style.
     * @param message m.title; m.content
     * @param actions （array）botton actions
     * @returns {RootSiblings}
     */
    static alert = (message, actions = []) => {
        if (_lastAlertRS) {
            AlertMsg.close(_lastAlertRS);
        }
        _lastAlertRS = new RootSiblings(
            // It may be modified to be replaceable later...
            <AlertFrame
                message={message}
                actions={actions}
                ref={(eleRef) => _alertDomRef = eleRef}
            />
        );
        return _lastAlertRS;
    };

    /**
     * close dialog
     * @param obj AlertMsg.alert`s result
     */
    static close = (obj) => {
        if (obj instanceof RootSiblings) {
            AlertMsg.destroy(obj);
        } else if (_lastAlertRS instanceof RootSiblings) {
            _alertDomRef._hide({
                after: () => AlertMsg.destroy(_lastAlertRS)
            });
        } else {
            console.log(`AlertMsg.close() : the type of obj is not RootSiblings`);
        }
    };

    /**
     * alert dialog. use dialog of custom elements
     * @param fun react-native element
     * @returns {RootSiblings}
     */
    static alertByRender = (fun) => {
        if (_lastAlertRS) {
            AlertMsg.close(_lastAlertRS);
        }
        _lastAlertRS = new RootSiblings(
            <AlertFrame
                dialogItem={() => fun()} // In v0.2.0+ not recommended
                ref={(eleRef) => _alertDomRef = eleRef}
            />
        );
        return _lastAlertRS;
    };

    /**
     * destroy RootSiblings object
     * @param obj
     */
    static destroy = (obj) => {
        try {
            if (obj instanceof RootSiblings) {
                obj.destroy();
            } else if (_lastAlertRS instanceof RootSiblings) {
                _lastAlertRS.destroy();
                _lastAlertRS = null;
                _alertDomRef = null;
            }
        } catch (e) {
            console.log(`AlertMsg.destroy() error : ${e}`);
        }
    };

    constructor() {
        super(...arguments);
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