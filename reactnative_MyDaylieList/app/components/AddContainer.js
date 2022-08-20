import { RectButton } from 'react-native-gesture-handler';

import TodoItem from '../components/TodoItem.js';
import Footer from '../components/Footer.js';
import ReducerHelper from '../store/ReducerHelper.js';
import { connect } from "react-redux";

import { Styles } from '../styles/Styles.js';
import Colors from "../styles/Colors";
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AddButton from "./AddButton";

const styles = new StyleSheet.create({
    container: {
        position: "absolute",
        bottom: (Dimensions.get('window').height * 0.05) + 60,
    },
    formContainer: {
        width: Dimensions.get('window').width,
        paddingLeft: 25,
        paddingRight: 50,
        marginBottom: -20,
    },
    formContent:{
        flex: 1,
        borderRadius: 20,
        padding: 20,
        backgroundColor: Colors().primary.light,
        borderColor: Colors().secondary.dark,
    },
    buttonStyle: {}
});

class AddContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
        };
    }

    onAddPress = () => {
        alert("Added")
    }

    onChangeText = (t) => {
        this.setState({ text: t});
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.formContainer]}>
                    <View style={[styles.formContent]}>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={t => this.onChangeText(t)}
                            maxLength={40}
                            value={this.state.t}
                            editable
                        />
                    </View>
                </View>
                <View style={[{flex: 1, alignItems: "flex-end", paddingRight: 20}]}>
                    <AddButton style={[styles.buttonStyle]} onAddPress={this.onAddPress} />
                </View>
            </View>
        );
    }
}

export default connect( state => ({ data: state }) )(AddContainer);
//export default AddButton;