import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Styles } from '../styles/Styles.js';
import TodoItem from '../components/TodoItem.js';
import Footer from '../components/Footer.js';
import { connect } from "react-redux";
import ReducerHelper from '../store/ReducerHelper.js';
import AddContainer from "../components/AddContainer";

class TodoList extends React.Component {

    render() {
      return (
        this.props.data.currentTab.name == ReducerHelper.tabs.Todos.name || 
        this.props.data.currentTab.name == ReducerHelper.tabs.Done.name
      )
        &&  
      (
      <View style={Styles.container}>
          <View style={[Styles.content, Styles.main]}>
            <ScrollView style={Styles.content}>
                {
                    this
                    .props
                    .data
                    .screens[this.props.data.currentScreen][this.props.data.currentTab.name]
                    .map( todo => <TodoItem {...todo } item={todo} tab={this.props.data.currentTab} /> )
                }
                <View style={{height: 200}}></View>
            </ScrollView>
          </View>
          <AddContainer />
        <Footer />
      </View>
      );
    }
}
//this.props.route.params.todos

//export default TodoList;
//import { connect } from "react-redux";
//import ReducerHelper from '../store/RecucerHelper.js';
//const ConnectComponent = connect(ReducerHelper.MapStateToProps, ReducerHelper.MapDispatchToProps);
//export default ConnectComponent(TodoItem);

export default connect( state => ({ data: state }) )(TodoList);