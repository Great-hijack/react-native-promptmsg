import React from 'react';
import {
    Animated,
    Easing,
    ListView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {Global} from "../Global";
import AlertMsg from "../AlertMsg";

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const deviceHeight = Global.height;
const deviceWidth = Global.width;
const _midBorderWidth = 0.2;
const _borderRadius = 15;

/**
 * component ios-style prompt dialog
 *
 * ## ----  Discard  ----
 * ## Please update the code in time.
 * ## It is not recommended to continue using.
 * ## The AlertStyleOfIOS file will be removed in a future update.
 *
 * @Discard in v0.2.0+
 */
export default class AlertStyleOfIOS extends React.Component {

    static defaultProps = {
        delay: 0,
        visible: false,
    };

    constructor(props) {
        super(props);
        this._animating = false; // animating lock
        /**
         * Is AlertMsg.close function.
         * In v0.2.0+ not recommended
         */
        this._closeFuc = this.props.refClose;

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
        const actSize = this.props.actions.length;
        const btnMaxIndex = actSize - 1;
        return (
            <Animated.View style={[styles.otherBg, {opacity: this.state.opacityValue}]} pointerEvents={'auto'}>
                <Animated.View style={{width: deviceWidth * 0.7, transform: [{scale: this.state.scaleValue}]}}>
                    <View style={[styles.bgWhite, styles.alertBg]}>
                        <Text style={styles.titleText}
                              allowFontScaling={false}>{this.props.message.title ? this.props.message.title : 'OK'}</Text>
                        {
                            this.props.message.content &&
                            <Text style={styles.remarkText} allowFontScaling={false}>{this.props.message.content}</Text>
                        }
                    </View>
                    {
                        actSize > 2 && (
                            <ListView
                                scrollEnabled={false}
                                dataSource={ds.cloneWithRows(this.props.actions.slice(0, btnMaxIndex))}
                                renderRow={(item, sectionID, index) => this._renderBtnItem(item, sectionID, index)}
                                renderFooter={() =>
                                    <View style={styles.btnListLastView}>
                                        <TouchableOpacity activeOpacity={0.7}
                                                          onPress={() => this._click(btnMaxIndex)}
                                                          style={styles.btnListLastTouch}>
                                            <View style={styles.btnListLastContentView}>
                                                <Text style={styles.btnListLastContentText}>{this._actionsItem(btnMaxIndex).text}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                }
                            />
                        )
                    }
                    {
                        actSize === 2 && (
                            <View style={[styles.btnBorderCommon, styles.btnBorderTop]}>
                                <TouchableOpacity style={[styles.btnCommon, styles.leftBtnView]}
                                                  activeOpacity={0.8}
                                                  onPress={() => this._click(0)}
                                >
                                    <Text style={styles.btnText} allowFontScaling={false}>{this._actionsItem(0).text}</Text>
                                </TouchableOpacity>
                                <View style={[styles.btnBorderCommon, {width: _midBorderWidth}]}/>
                                <TouchableOpacity style={[styles.btnCommon, styles.rightBtnView]}
                                                  activeOpacity={0.8}
                                                  onPress={() => this._click(1)}
                                >
                                    <Text style={styles.btnText} allowFontScaling={false}>{this._actionsItem(1).text}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    {
                        actSize <= 1 && (
                            <View style={[styles.btnBorderCommon, {borderTopWidth: 1}]}>
                                <TouchableOpacity style={[styles.btnCommon, styles.oneBtnView]}
                                                  activeOpacity={0.8}
                                                  onPress={() => this._click(0)}
                                >
                                    <Text style={styles.btnText} allowFontScaling={false}>{actSize === 1 ? this._actionsItem(0).text : 'OK'}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </Animated.View>
            </Animated.View>
        );
    }

    /**
     * Render vertical list of button
     * @param item
     * @param section
     * @param btnIndex
     * @returns {boolean|*}
     * @private
     */
    _renderBtnItem(item, section, btnIndex) {
        return (
            btnIndex !== this.props.actions.length - 1 && (
                <View style={{backgroundColor: '#dcdcdc'}}>
                    <View style={{height: 0.5, backgroundColor: '#ebebeb'}}/>
                    <TouchableOpacity style={[styles.bgWhite]}
                                      activeOpacity={0.7}
                                      onPress={() => this._click(btnIndex)}>
                        <View style={styles.btnListItemTextView}>
                            <Text style={styles.btnListItemText}>{item.text}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        )
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
                typeof item.press === 'function' && item.press.call(this);
                // typeof item.press === 'function' && item.press();
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
    _hide = () => {
        if (!this._animating) {
            this._animating = true;
            this._animation(0, 0, (finished) => {
                /**
                 * In v0.2.0+ not recommended
                 */
                // this._closeFuc();
                AlertMsg.close();
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
    alertBg: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: _borderRadius,
        borderTopRightRadius: _borderRadius,
        padding: 20,
    },
    titleText: {
        fontSize: 17,
        color: '#0d0d0d',
        fontWeight: 'bold',
        marginBottom: 2,
    },
    remarkText: {
        fontSize: 13,
        color: '#282828'
    },
    btnCommon: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#ffffff',
    },
    btnListLastView: {
        backgroundColor: '#dcdcdc',
        borderBottomLeftRadius: _borderRadius,
        borderBottomRightRadius: _borderRadius,
        borderTopWidth: 0.5,
        borderTopColor: '#ebebeb'
    },
    btnListLastTouch: {
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: _borderRadius,
        borderBottomRightRadius: _borderRadius
    },
    btnListLastContentView: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnListLastContentText: {
        fontSize: 16,
        color: 'red'
    },
    btnListItemTextView: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnListItemText: {
        fontSize: 16,
        color: '#007ff7'
    },
    leftBtnView: {
        width: Math.ceil((deviceWidth * 0.35 - _midBorderWidth / 2) * 100) / 100,
        borderBottomLeftRadius: _borderRadius,
    },
    rightBtnView: {
        width: Math.ceil((deviceWidth * 0.35 - _midBorderWidth / 2) * 100) / 100,
        borderBottomRightRadius: _borderRadius,
    },
    oneBtnView: {
        borderBottomLeftRadius: _borderRadius,
        borderBottomRightRadius: _borderRadius,
    },
    btnText: {
        fontSize: 17,
        color: '#047afa',
    },
    btnBorderCommon: {
        borderTopColor: '#efefef',
    },
    btnBorderTop: {
        height: 40,
        flexDirection: 'row',
        borderTopWidth: 1,
    },
});