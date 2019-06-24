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
                dialogItem={() => fun()}
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
            _alertDomRef._hide();
        } else {
            console.warn('AlertMsg.close() : The type of obj is not RootSiblings');
        }
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
            } else {
                throw 'The type of object or _lastAlertRS is not RootSiblings';
            }
        } catch (e) {
            console.error(`AlertMsg.destroy() error : ${e}`);
        } finally {
            _lastAlertRS = null;
            _alertDomRef = null;
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