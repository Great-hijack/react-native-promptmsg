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

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const deviceHeight = Global.height;
const deviceWidth = Global.width;
const _midBorderWidth = 0.2;
const _borderRadius = 15;

/**
 * 在安卓平台上提供与ios原生类似的提示框
 */
export default class AlertStyleOfIOS extends React.Component {

    static defaultProps = {
        delay: 0,
        visible: false,
    };

    constructor(props) {
        super(props);
        this._animating = false; // 动画是否显示完成
        this._closeFuc = this.props.refClose; // 关闭的fuc

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
        let btnMaxIndex = this.props.options.length - 1;
        return (
            <Animated.View style={[styles.otherBg, {opacity: this.state.opacityValue}]} pointerEvents={'auto'}>
                <Animated.View style={{width: deviceWidth * 0.7, transform: [{scale: this.state.scaleValue}]}}>
                    <View style={[styles.bgWhite, styles.alertBg]}>
                        <Text style={styles.titleText}
                              allowFontScaling={false}>{this.props.message.title ? '提示' : this.props.message.title}</Text>
                        <Text style={styles.remarkText} allowFontScaling={false}>{this.props.message.content}</Text>
                    </View>
                    {
                        this.props.options.length > 2 &&
                        <ListView
                            scrollEnabled={false}
                            dataSource={ds.cloneWithRows(this.props.options)}
                            renderRow={(contactOption, sectionID, index) => this._renderBtnItem(contactOption, sectionID, index)}
                            renderFooter={() =>
                                <View style={styles.btnListLastView}>
                                    <TouchableOpacity activeOpacity={0.7}
                                                      onPress={() => this._click(btnMaxIndex)}
                                                      style={styles.btnListLastTouch}>
                                        <View style={styles.btnListLastContentView}>
                                            <Text style={styles.btnListLastContentText}>{this.props.options[btnMaxIndex]}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>}
                        />
                    }
                    {
                        this.props.options.length === 2 &&
                        <View style={[styles.btnBorderCommon, styles.btnBorderTop]}>
                            <TouchableOpacity style={[styles.btnCommon, styles.leftBtnView]}
                                              activeOpacity={0.8}
                                              onPress={() => this._click(0)}
                            >
                                <Text style={styles.btnText} allowFontScaling={false}>{this.props.options[0]}</Text>
                            </TouchableOpacity>
                            <View style={[styles.btnBorderCommon, {width: _midBorderWidth}]}/>
                            <TouchableOpacity style={[styles.btnCommon, styles.rightBtnView]}
                                              activeOpacity={0.8}
                                              onPress={() => this._click(1)}
                            >
                                <Text style={styles.btnText} allowFontScaling={false}>{this.props.options[1]}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        this.props.options.length === 1 &&
                        <View style={[styles.btnBorderCommon, {borderTopWidth: 1}]}>
                            <TouchableOpacity style={[styles.btnCommon, styles.oneBtnView]}
                                              activeOpacity={0.8}
                                              onPress={() => this._click(0)}
                            >
                                <Text style={styles.btnText} allowFontScaling={false}>{this.props.options[0]}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </Animated.View>
            </Animated.View>
        );
    }

    /**
     * 渲染竖向按钮列表
     * @param contactOption
     * @param sectionID
     * @param btnIndex
     * @returns {boolean|*}
     * @private
     */
    _renderBtnItem(contactOption, sectionID, btnIndex) {
        return (
            btnIndex !== this.props.options.length - 1 && (
                <View style={{backgroundColor: '#dcdcdc'}}>
                    <View style={{height: 0.5, backgroundColor: '#ebebeb'}}/>
                    <TouchableOpacity style={[styles.bgWhite]}
                                      activeOpacity={0.7}
                                      onPress={() => this._click(btnIndex)}>
                        <View style={styles.btnListItemTextView}>
                            <Text style={styles.btnListItemText}>{contactOption}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        )
    }

    /**
     * 点击事件
     * @param btnIndex 按钮id
     * @private
     */
    _click = (btnIndex) => {
        try {
            this.props.actions[btnIndex] ?
                this.props.actions[btnIndex]() :
                null;
        } catch (e) {
            console.warn(`_click: error:${e}`);
        } finally {
            this._hide();
        }
    };

    /**
     * 显示提示框
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
     * 关闭并销毁提示窗
     * @private
     */
    _hide = () => {
        if (!this._animating) {
            this._animating = true;
            this._animation(0, 0, (finished) => {
                this._closeFuc();
            });
        }
    };

    /**
     * 提示框的动画效果
     * @param _toValue 动画的值
     * @param _delay 动画延迟时间
     * @param successFuc 成功后的执行函数
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