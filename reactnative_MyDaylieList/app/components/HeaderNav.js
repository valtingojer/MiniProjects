import * as React from 'react';
import { Styles } from '../styles/Styles.js';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ReducerHelper from '../store/ReducerHelper.js';
import { IonAlert } from '@expo/vector-icons';

const styles = StyleSheet.create({
  tabsContainer: { flex: 1 },
  tabsContent: { flex: 1, flexDirection: 'row' },
  tabSizer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

class HeaderNav extends React.Component {
  goTo = (screen) => {
    this.props.changeScreen(screen);
  };

  render() {
    return (
      <View style={[styles.tabsContainer]}>
        <View style={[styles.tabsContent]}>
          <View style={[styles.tabSizer]}>
            <TouchableOpacity
              style={[Styles.flexVHCenter]}
              onPress={() => this.goTo(ReducerHelper.screens.TodoListSec)}>
              {ReducerHelper.screens.TodoListSec.icon(this.props.data.currentScreen)}
            </TouchableOpacity>
          </View>
          <View style={[styles.tabSizer]}>
            <TouchableOpacity
              style={[Styles.flexVHCenter]}
              onPress={() => this.goTo(ReducerHelper.screens.TodoListAlt)}>
              {ReducerHelper.screens.TodoListAlt.icon(this.props.data.currentScreen)}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

//export default HeaderNav;

// import { connect } from "react-redux";
// import ReducerHelper from '../store/RecucerHelper.js';
const ConnectComponent = connect(
  (state) => ({ data: state }),
  ReducerHelper.MapDispatchToProps
);
export default ConnectComponent(HeaderNav);

//export default connect( state => ({ data: state }) )(TodoList);
