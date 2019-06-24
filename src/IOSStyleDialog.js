import React from 'react';
import {
    ListView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {Global} from "../Global";

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const deviceWidth = Global.width;
const _midBorderWidth = 0.2;
const _borderRadius = 15;

/**
 * default ios-style prompt dialog
 */
export default class IOSStyleDialog extends React.Component {

    constructor(props) {
        super(props);
        this._click = this.props.click;
    }

    render() {
        const actSize = this.props.actions.length;
        const btnMaxIndex = actSize - 1;
        return (
            <View style={styles.dialogView}>
                <View style={[styles.bgWhite, styles.dialogBg]}>
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
            </View>
        );
    }

    /**
     * Render vertical list of button
     * @param item
     * @param sectionID
     * @param btnIndex
     * @returns {boolean|*}
     * @private
     */
    _renderBtnItem(item, sectionID, btnIndex) {
        if (typeof item.renderItem === 'function') {
            return item.renderItem();
        } else {
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
    }

    _actionsItem = (index) => this.props.actions[index];

}

const styles = StyleSheet.create({
    bgWhite: {
        backgroundColor: '#ffffff'
    },
    dialogView: {
        width: deviceWidth * 0.7
    },
    dialogBg: {
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