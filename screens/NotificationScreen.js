import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class NotificationScreen extends React.Component{
      static navigationOptions ={
        headerShown: false,
    }
    deletePost(){
        this.props.navigation.navigate("Home")
    }
    render(){
        return(
            <View style={styles.container}>
                <Text>Your Payment Successfully</Text>
                <img src="https://img.icons8.com/color/48/000000/get-cash.png" style={{width:98}}/>
                <TouchableOpacity style={styles.button} onPress={() => {
                        this.deletePost();
                    }}>
 
                        <Text style={styles.text}>Back</Text>

                    </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    text: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        padding: 5
      },
    button: {
 
        width: '40%',
        paddingTop: 1,
        paddingBottom: 1,
        backgroundColor: '#e810cf',
        borderRadius: 7,
        margin: 10
      },
})