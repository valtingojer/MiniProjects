import * as React from "react"
import ActionTypes from '../store/ActionTypes.js';
import ScreensHelper from "../screens/ScreensHelper";

const MapStateToProps = (state) => ({ data: state });

const MapDispatchToProps = (dispatch) => ({
  AddUser: (username) => dispatch({
    type: ActionTypes.AddUser,
    payload: { username },
  }),
  MoveItemDoneState: (item, screen, tab) => dispatch({
    type: ActionTypes.MoveItemDoneState,
    payload: { item, screen, tab },
  }),
  GoToScreen: (currentScreen) => dispatch({
    type: ActionTypes.GoToScreen,
    payload: { currentScreen },
  }),
  GoToTab: (currentTab) => dispatch({
    type: ActionTypes.GoToTab,
    payload: { currentTab, },
  }),
});

const state = {
  user: { username: 'LoL' },
  currentScreen: 0,
  currentTab: ScreensHelper.tabs.Todos,
  screens: [
    {
      todos: [
        { text: 'Um item da tab ListTab0', key: 'ListTab00' },
        { text: 'Outro item da tab ListTab0', key: 'ListTab01' },
      ],
      done: [
        { text: 'Feito em ListTab0', key: 'FeitoTab00' },
        { text: 'Outro feito ListTab0', key: 'FeitoListTab01' },
      ],
    },
    {
      todos: [
        { text: 'Um item da tab menuTab1', key: 'menuTab10' },
        { text: 'Outro item da tab menuTab1', key: 'menuTab11' },
      ],
      done: [
        { text: 'Feito em menuTab1', key: 'FeitoTab10' },
        { text: 'Outro feito menuTab1', key: 'FeitomenuTab11' },
      ],
    },
    {
      todos: [
        { text: 'Um item da tab menuTab2', key: 'menuTab20' },
        { text: 'Outro item da tab menuTab2', key: 'menuTab21' },
      ],
      done: [
        { text: 'Feito em menuTab2', key: 'FeitoTab20' },
        { text: 'Outro feito menuTab2', key: 'FeitomenuTab21' },
      ],
    },
  ],
};

const Map = {
  MapStateToProps: MapStateToProps,
  MapDispatchToProps: MapDispatchToProps,
  state: state,
  tabs: ScreensHelper.tabs,
  screens: ScreensHelper.screens,
};

export default Map;

//import { connect } from "react-redux";
//const ConnectComponent = connect(MapStateToProps, MapDispatchToProps);
//export default ConnectComponent;
