/*React base import*/
import * as React from 'react';
/*Reducer*/
import {connect} from 'react-redux';
import ReducerHelper from '../store/ReducerHelper.js';

/*react-navigation*/
//import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
/*react-navigation customization*/
import HeaderNav from '../components/HeaderNav.js';
/*Custom styles*/
/*Screens*/
import TodoList from '../screens/TodoListScreen.js';
import {Styles} from "../styles/Styles";


const Stack = createStackNavigator();

const MainNavigator = (props) => {

    return (
        <Stack.Navigator
            initialRouteName={ReducerHelper.screens.TodoListMain.name}
            headerMode="float">
            <Stack.Screen
                name={ReducerHelper.screens.TodoListMain.name}
                options={({navigation}) => ({
                    title: 'List1',
                    headerRight: () => renderNav(navigation, props),
                    headerLeft: (mprops) => BackButtonCustom(navigation, props, mprops),
                    headerBackImage: () => headerBackImageCustom(props.data.currentScreen),
                    headerStyle: Styles.nav,
                })}
                component={TodoList}
                /*initialParams={{...screenOneMoc}} */
            />
            <Stack.Screen
                name={ReducerHelper.screens.TodoListSec.name}
                options={({navigation}) => ({
                    title: 'List2',
                    headerRight: () => renderNav(navigation, props),
                    headerLeft: (mprops) => BackButtonCustom(navigation, props, mprops),
                    headerBackImage: () => headerBackImageCustom(),
                    headerStyle: Styles.nav,
                })}
                component={TodoList}
                /*initialParams={{...screenTwoMoc}} */
            />

            <Stack.Screen
                name={ReducerHelper.screens.TodoListAlt.name}
                options={({navigation}) => ({
                    title: 'List3',
                    headerRight: () => renderNav(navigation, props),
                    headerLeft: (mprops) => BackButtonCustom(navigation, props, mprops),
                    headerBackImage: () => headerBackImageCustom(),
                    headerStyle: Styles.nav,

                })}
                component={TodoList}
                /*initialParams={{...screenThreeMoc}}*/
            />
        </Stack.Navigator>
    );
};

const goToScreen = (navigation, props, screen) => {
    navigation.navigate(screen.name);
    props.GoToScreen(screen.index);
};

const renderNav = (navigation, props) => {
    return (
        <HeaderNav
            changeScreen={
                //(screen) => navigation.navigate(screen, {fooD: "barD"})
                (screen) => goToScreen(navigation, props, screen)
            }
        />
    );
};

const BackButtonCustom = (navigation, props, mprops) => {
    return (
        <HeaderBackButton
            {...mprops}
            onPress={() =>
                goToScreen(navigation, props, ReducerHelper.screens.TodoListMain)
            }
        />
    );
};

const headerBackImageCustom = currentScreen => ReducerHelper.screens.TodoListMain.icon(currentScreen);


// export default MainNavigator;

// import { connect } from "react-redux";
// import ReducerHelper from '../store/RecucerHelper.js';
const ConnectComponent = connect(
    ReducerHelper.MapStateToProps,
    ReducerHelper.MapDispatchToProps
);
export default ConnectComponent(MainNavigator);
