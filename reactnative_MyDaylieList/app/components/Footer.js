import * as React from 'react';
import { Styles } from '../styles/Styles.js';
import { connect } from "react-redux";
import ReducerHelper from '../store/ReducerHelper.js';
import {StyleSheet, TouchableOpacity, View} from "react-native";

const styles = StyleSheet.create({
  tabsContainer: {},
  tabsContent: { flex: 1, flexDirection: 'row', },
  tabSizer: { flex: 0.34, },
});

class Footer extends React.Component {

  goTo = tab => {
    this.props.GoToTab(tab);
    //alert(tab);
  }

  render() {
    return (
        <View style={[Styles.tabsContainer, styles.tabsContainer]}>
          <View style={styles.tabsContent}>
            <View style={[styles.tabSizer]}>
              <TouchableOpacity
                  style={[Styles.flexVHCenter]}
                  onPress={() => this.goTo(ReducerHelper.tabs.Todos)}
              >
                {ReducerHelper.tabs.Todos.icon(this.props.data.currentTab)}
              </TouchableOpacity>
            </View>
            <View style={[styles.tabSizer]}>
              <TouchableOpacity
                  style={[Styles.flexVHCenter]}
                  onPress={() => this.goTo(ReducerHelper.tabs.Done)}
              >
                {ReducerHelper.tabs.Done.icon(this.props.data.currentTab)}
              </TouchableOpacity>
            </View>
            <View style={[styles.tabSizer]}>
              <TouchableOpacity
                  style={[Styles.flexVHCenter]}
                  onPress={() => this.goTo(ReducerHelper.tabs.Config)}
              >
                {ReducerHelper.tabs.Config.icon(this.props.data.currentTab)}
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  }
}

//export default Footer;

// import { connect } from "react-redux";
// import ReducerHelper from '../store/ReducerHelper.js';
const ConnectComponent = connect(
  ReducerHelper.MapStateToProps,
  ReducerHelper.MapDispatchToProps
);
export default ConnectComponent(Footer);