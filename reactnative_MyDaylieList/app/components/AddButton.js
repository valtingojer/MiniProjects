// import { RectButton } from 'react-native-gesture-handler';

// import TodoItem from '../components/TodoItem.js';
// import Footer from '../components/Footer.js';
// import ReducerHelper from '../store/ReducerHelper.js';
// import { connect } from "react-redux";

import { Styles } from '../styles/Styles.js';
import Colors from "../styles/Colors";
import * as React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const styles = new StyleSheet.create({
    container: {
        width: 60,
        height: 60,
    },
    content: {
        backgroundColor: Colors().secondary.normal,
        borderColor: Colors().secondary.dark,
        borderWidth: 2,
        borderRadius: 100,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

class AddButton extends React.Component {
    render() {
        return (
            <View style={[styles.container]}>
                <TouchableOpacity style={[styles.content]}>
                    <MaterialIcons onPress={this.props.onAddPress} name="playlist-add" size={36} color={Colors().alert.normal} />
                </TouchableOpacity>
            </View>
            );
    }
}

// export default connect( state => ({ data: state }) )(AddButton);
export default AddButton;