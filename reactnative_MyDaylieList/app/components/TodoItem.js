import * as React from 'react';
import {Animated, Image, StyleSheet, Text, View,} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import {Card} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from "react-redux";
import ReducerHelper from '../store/ReducerHelper.js';

import {Icons, Styles} from '../styles/Styles.js';
import reducer from "../store/Reducer";
import ActionTypes from "../store/ActionTypes";

const inputRange = [0, 0, 100, 101];
const outputRangeL = [0, 20, 0, 1];
const outputRangeR = [-20, 0, 0, 1];
const directions = {Left: 'Left', Right: 'Right'};

let mInterpolate = (dragX, direction) => {
    return dragX.interpolate({
        inputRange: inputRange,
        outputRange: direction == directions.Left ? outputRangeL : outputRangeR,
    });
};

const styles = StyleSheet.create({
    container: {},
    todoRow: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexDirection: 'row',
    },
    todoCard: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
    },
    textContainer: {
        flex: 1,
        height: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {},
    imageArrow: {
        margin: -8,
        width: 25,
        height: 25,
        resizeMode: 'stretch',
    },
    transparentCard: {
        shadowColor: 'rgba(0,0,0,0)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        borderRadius: 100,
        borderColor: "transparent",
        borderWidth: 0,
        elevation: 0,
        backgroundColor: "transparent",
    },
    todos: {
        ...Styles.bgPrimaryLight,
        ...Styles.colorContrastNormal,

    },
    done: {
        ...Styles.bgContrastLight,
        ...Styles.colorPrimaryLight,
    },
});

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            iconLeftOpacity: 1,
            iconRightOpacity: 1,
        };
    }

    ButtonLeftAction = {
        both: () => {
            let item = this.props.item;
            let screen = this.props.data.currentScreen;
            let tab = this.props.data.currentTab.name;

            this.props.MoveItemDoneState(item, screen, tab);
        },
        todos: () => this.ButtonLeftAction.both(),
        done: () => this.ButtonLeftAction.both(),
    }

    ButtonRightAction = {
        todos: () => { alert("Config") },
        done: () => { alert("Delete") },
    }

    renderAction = (props) => {
        return (
            <RectButton onPress={props.action}>
                <Animated.Text style={{transform: [{translateX: props.trans}]}}>
                    <Card
                        containerStyle={styles.transparentCard}
                        wrapperStyle={styles.transparentCard}
                        style={[props.cardStyle, styles.transparentCard,]}
                    >
                        <View style={styles.textContainer}>
                            <View>
                                {props.icon}
                            </View>
                            {/*<View><Text style={props.textStyle}>{props.text}</Text></View>*/}
                        </View>
                    </Card>
                </Animated.Text>
            </RectButton>
        );
    };

    renderRightActions = (progress, dragX) => {
        return this.renderAction({
            trans: mInterpolate(dragX, directions.Right),
            text: 'Config',
            icon: Icons.rightAction(this.props.data.currentTab),
            cardStyle: [Styles.card, Styles.bgTransparent, {padding: 12}],
            textStyle: [Styles.text, Styles.colorPrimaryNormal],
            action: this.ButtonRightAction[this.props.data.currentTab.name],
        });
    };
    renderLeftActions = (progress, dragX) => {
        return this.renderAction({
            trans: mInterpolate(dragX, directions.Left),
            text: 'Done',
            icon: Icons.leftAction(this.props.data.currentTab),
            cardStyle: [Styles.card, Styles.bgTransparent, {padding: 12}],
            textStyle: [Styles.text, Styles.colorContrastDark],
            action: this.ButtonLeftAction[this.props.data.currentTab.name],
        });
    };
    onSwipeableLeftWillOpen = () => {
        this.setState({iconLeftOpacity: 0});
    };
    onSwipeableRightWillOpen = () => {
        this.setState({iconRightOpacity: 0});
    };
    onSwipeableWillClose = () => {
        this.setState({iconLeftOpacity: 1, iconRightOpacity: 1});
    };

    render() {
        return (
            <Swipeable
                style={[styles.container]}
                onSwipeableLeftWillOpen={this.onSwipeableLeftWillOpen}
                onSwipeableRightWillOpen={this.onSwipeableRightWillOpen}
                onSwipeableWillClose={this.onSwipeableWillClose}
                renderLeftActions={this.renderLeftActions}
                renderRightActions={this.renderRightActions}>
                <View style={[Styles.row, styles.todoRow]}>
                    <Card style={[Styles.card, styles.todoCard, styles[this.props.data.currentTab.name]]}>
                        <View style={styles.textContainer}>
                            <View>
                              <MaterialCommunityIcons style={[{marginLeft: -4, opacity: this.state.iconLeftOpacity}]} name="gesture-swipe-right" size={24} color={Styles.colorSecondaryDark.color} />
                            </View>
                            <View>
                                <Text style={[Styles.text, styles.text, styles[this.props.data.currentTab.name]]}>
                                    {this.state.text}
                                </Text>
                            </View>
                            <View>
                              <MaterialCommunityIcons style={[{marginRight: -10, opacity: this.state.iconRightOpacity}]} name="gesture-swipe-left" size={24} color={Styles.colorSecondaryDark.color} />
                            </View>
                        </View>
                    </Card>
                </View>
            </Swipeable>
        );
    }
}

//export default TodoItem;

//export default connect( state => ({ data: state }) )(TodoItem);

const ConnectComponent = connect(
    ReducerHelper.MapStateToProps,
    ReducerHelper.MapDispatchToProps
);
export default ConnectComponent(TodoItem);