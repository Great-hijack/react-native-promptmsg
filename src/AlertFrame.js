import React from 'react';
import {
    Animated,
    Easing,
    StyleSheet
} from 'react-native';
import {Global} from "../Global";
import AlertMsg from "../AlertMsg";
import IOSStyleDialog from "./IOSStyleDialog";

const deviceHeight = Global.height;
const deviceWidth = Global.width;

/**
 * alert background
 */
export default class AlertFrame extends React.Component {

    static defaultProps = {
        delay: 0,
    };

    constructor(props) {
        super(props);
        this._animating = false; // animating lock
        this.state = {
            opacityValue: new Animated.Value(0),
            scaleValue: new Animated.Value(0)
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        this._show();
    }

    componentWillUnmount() {
        this._hide();
    };

    render() {
        return (
            <Animated.View style={[styles.otherBg, {opacity: this.state.opacityValue}]} pointerEvents={'auto'}>
                <Animated.View style={{transform: [{scale: this.state.scaleValue}]}}>
                {
                    this._renderDialog()
                }
                </Animated.View>
            </Animated.View>
        );
    }

    _renderDialog() {
        if (typeof this.props.dialogItem === 'function') {
            return this.props.dialogItem.call(AlertMsg);
        } else {
            return (
                <IOSStyleDialog
                    message={this.props.message}
                    actions={this.props.actions}
                    click={(index) => this._click(index)}
                />
            )
        }
    }

    _actionsItem = (index) => this.props.actions[index];

    /**
     * click event
     * @param btnIndex index of buttons
     * @private
     */
    _click = (btnIndex) => {
        try {
            const item = this._actionsItem(btnIndex);
            if (item) {
                typeof item.press === 'function' && item.press();
            }
        } catch (e) {
            console.warn(`_click: error:${e}`);
        } finally {
            this._hide();
        }
    };

    /**
     * show alert
     * @private
     */
    _show = () => {
        if (!this._animating) {
            this._animating = true;
            this._animation(1, this.props.delay, (finished) => {
                this._animating = !finished;
            });
        }
    };

    /**
     * hide alert and destroy RootSiblings
     * @private
     */
    _hide = (func) => {
        // before the animation
        if (func && typeof func.before === 'function') {
            func.before();
        }

        if (!this._animating) {
            this._animating = true;
            this._animation(0, 0, (finished) => {
                if (func && typeof func.after === 'function') { // after the animation
                    func.after();
                } else {
                    AlertMsg.destroy();
                }
            });
        }
    };

    /**
     * Animation effect
     * @param _toValue
     * @param _delay
     * @param successFuc
     * @private
     */
    _animation = (_toValue, _delay = 0, successFuc) => {
        Animated.parallel(
            [
                Animated.timing(this.state.opacityValue, {
                    toValue: _toValue,
                    duration: 100,
                    easing: Easing.inOut(Easing.ease),
                    delay: _delay,
                }),
                Animated.timing(this.state.scaleValue, {
                    toValue: _toValue,
                    duration: 100,
                    easing: Easing.inOut(Easing.ease),
                    delay: _delay,
                })
            ],
            {
                stopTogether: false
            }
        ).start(({finished}) => {
            if (finished) {
                successFuc(finished);
            }
        });
    };

}

const styles = StyleSheet.create({
    bgWhite: {
        backgroundColor: '#ffffff'
    },
    otherBg: {
        height: deviceHeight,
        width: deviceWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
        top: 0,
        zIndex: 100,
    },
});