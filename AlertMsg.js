import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import AlertStyleOfIOS from "./src/AlertStyleOfIOS";


let _lastAlertRS = null;

/**
 * Alert dialog like ios-style of core class
 */
export default class AlertMsg extends React.Component {

    /**
     * alert dialog
     * @param message m.title; m.content
     * @param options （array）botton names
     * @param actions （array）botton actions
     * @returns {RootSiblings}
     */
    static alert = (message, options = ['OK'], actions = []) => {
        if (_lastAlertRS) {
            AlertMsg.close(_lastAlertRS);
        }
        _lastAlertRS = new RootSiblings(
            // It may be modified to be replaceable later...
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
     * close dialog
     * @param obj AlertMsg.alert`s result
     */
    static close = (obj) => {
        if (obj instanceof RootSiblings) {
            obj.destroy();
        } else {
            console.log(`AlertMsg.close() : the type of obj is not RootSiblings`);
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