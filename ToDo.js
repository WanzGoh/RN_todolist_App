import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            toDoValue: props.text
        };
    }
    static propTypes = {
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteToDo: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        uncompletedToDo :  PropTypes.func.isRequired,
        completeToDo : PropTypes.func.isRequired,
        updateToDo : PropTypes.func.isRequired,

    };
    
    render() {
        const { isEditing , toDoValue } = this.state;
        const { text, id, deleteToDo , isCompleted } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle,
                        isCompleted ? styles.completedCircle : styles.uncompletedCircle
                        ]}
                        />
                    </TouchableOpacity>
                   {isEditing ? (<TextInput  
                   value={ toDoValue }
                   multiline={true}
                   onChangeText={this._controlInput}
                   returnKeyType={"done"}
                   onBlur={this._finishEditing}
                   style={[ styles.text, 
                    styles.input, 
                    isCompleted ? styles.completedText : styles.uncompletedText]}
                   />
                   ):(<Text style={[styles.text,
                    isCompleted ? styles.completedText : styles.uncompletedText]}>
                        { text }
                    </Text>
                    )}
                </View>
                {isEditing ? (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionsContainer}>
                                <Text style={styles.actionText}>
                                    ☑️
                                    </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionsContainer}>
                                    <Text style={styles.actionText}>
                                        ✏️
                                </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPressOut={event =>{
                                event.stopPropagation;
                                 deleteToDo(id)}}>
                                <View style={styles.actionsContainer}>
                                    <Text style={styles.actionText}>
                                        ❌
                                </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
            </View>
        );
    }
    _toggleComplete = (event) => {
        event.stopPropagation();
        const {
            isCompleted ,
            uncompletedToDo ,
            completeToDo ,
            id
        } = this.props;
        if (isCompleted) {
            uncompletedToDo(id);
        }else {
            completeToDo(id);
        }
    };
    _startEditing = (event) => {
        event.stopPropagation();
        this.setState({
            isEditing: true,
        });
    };
    _finishEditing = (event) => {
        event.stopPropagation();
        const {toDoValue} = this.state;
        const { id , updateToDo} = this.props;
        updateToDo(id, toDoValue);
        this.setState({
            isEditing: false
        });
    };
    _controlInput= text =>{
        this.setState({
            toDoValue: text
        });
    };
}
const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: "red",
        borderWidth: 3,
        marginRight: 20
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    uncompletedCircle: {
        borderColor: "#f23657"
    },

    text: {
        fontSize: 20,
        fontWeight: "600",
        marginVertical: 20

    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedCircle: {
        color: "#353839"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2,
    },
    actions: {
        flexDirection: "row"
    },
    actionsContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        marginVertical: 20 ,
        width : width /2
    }
});