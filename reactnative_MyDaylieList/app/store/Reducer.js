import ActionTypes from './ActionTypes.js';
import ReducerHelper from './ReducerHelper.js';

const reducer = (state = ReducerHelper.state, action) => {
  switch (action.type) {
    case ActionTypes.AddUser:
      return {
        ...state,
        user: { ...state.user, username: action.payload.username },
      };
    case ActionTypes.MoveItemDoneState:
      let m_item = action.payload.item;
      let m_screen = action.payload.screen;
      let m_tab = action.payload.tab;

      let m_otherTab = m_tab == ReducerHelper.tabs.Todos.name ? ReducerHelper.tabs.Done.name : ReducerHelper.tabs.Todos.name;

      var replaceState = {
        ...state
      };
      replaceState.screens[m_screen][m_otherTab].push(m_item);
      replaceState.screens[m_screen][m_tab] = replaceState.screens[m_screen][m_tab].filter(me => {
          return me != m_item;
      });

      return { ...replaceState };
    case ActionTypes.GoToScreen:
      let screen = Math.min(3, Math.max(action.payload.currentScreen));
      let tab = state.currentTab;
      tab = tab == ReducerHelper.tabs.Config ? ReducerHelper.tabs.Todos : tab;
      return {
        ...state,
        currentScreen: screen,
        currentTab: tab,
      };
    case ActionTypes.GoToTab:
      return {
        ...state,
        currentTab: action.payload.currentTab,
      };
    default:
      return state;
  }
};

export default reducer;
/*
AddUser: "AddUser",
GoToScreen: "GoToScreen",
GoToTab: "GoToTab",
GoToSettings: "GoToSettings",
*/
