import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Contants from "expo-constants";
import * as Permissions from "expo-permissions";
import Fire from "../fire";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import DropdownMenu from 'react-native-dropdown-menu';
// import Pdf from 'react-native-pdf';

const firebase = require("firebase");
require("firebase/firestore");

export default class PostScreen extends React.Component{
    state ={
        loading:false,
        name:"",
        lecNo:"",
        amount:"",
        reason:"",
        text:"",
        image: null,
        type:null,
        loadingLink: false
    }

    handlePost =() =>{
        this.setState({loading: true})
        Fire.shared
        .addTextPost({ name: this.state.name.trim(),
            lecNo: this.state.lecNo.trim(),
            amount: this.state.amount.trim(),
            reason: this.state.reason.trim(),
        })
        .then(ref =>{
            this.setState({ name:"", image: null, type: null,loading:false});
            this.props.navigation.goBack();
        })
        .catch(error =>{
            alert(error);
        }
        )
    
    }

  

    render(){
        var data = [["C", "Java", "JavaScript", "PHP"], ["Python", "Ruby"], ["Swift", "Objective-C"]];
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                        <Ionicons name="md-arrow-back" size={24} color="#DE09DB"></Ionicons>
                    </TouchableOpacity>
                    {!this.state.loading?
                    <TouchableOpacity onPress={this.handlePost}>
                        <Text style={{fontWeight: "500"}}>
                            Post
                        </Text>
                    </TouchableOpacity>:
                    <ActivityIndicator size="large" />
                }
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require("../assets/8.jpg")} style={styles.avatar}></Image>
                    <TextInput
                    autoFocus={true}
                    multiline={true}
                    numberOfLines={2}
                    style={{flex:1}}
                    placeholder="Candidate Name"
                    onChangeText={name => this.setState({name})}
                    value={this.state.name}
                    // onChangeText={email=> this.setState({email}) }
                    // value={this.state.email}
                    >
                        </TextInput>
                      
                </View>
                <View style={styles.inputContainer}>
                    {/* <Image source={require("../assets/8.jpg")} style={styles.avatar}></Image> */}
                    <TextInput
                    autoFocus={true}
                    multiline={true}
                    numberOfLines={2}
                    style={{flex:1}}
                    placeholder="Candidate Lec No"
                    onChangeText={lecNo => this.setState({lecNo})}
                    value={this.state.lecNo}
                    // onChangeText={email=> this.setState({email}) }
                    // value={this.state.email}
                    >

                    </TextInput>
                    

                </View>
                <View style={styles.inputContainer}>
                    {/* <Image source={require("../assets/8.jpg")} style={styles.avatar}></Image> */}
                    <TextInput
                    autoFocus={true}
                    multiline={true}
                    numberOfLines={2}
                    style={{flex:1}}
                    placeholder="Amount"
                    onChangeText={amount => this.setState({amount})}
                    value={this.state.amount}
                    // onChangeText={email=> this.setState({email}) }
                    // value={this.state.email}
                    >

                    </TextInput>
                    

                </View>
                <View style={styles.inputContainer}>
                    {/* <Image source={require("../assets/8.jpg")} style={styles.avatar}></Image> */}
                    <TextInput
                    autoFocus={true}
                    multiline={true}
                    numberOfLines={2}
                    style={{flex:1}}
                    placeholder="Reason"
                    onChangeText={reason => this.setState({reason})}
                    value={this.state.reason}
     
                    >

                    </TextInput>
                    

                </View>
                
                <View style={{height: 64}} />
        <DropdownMenu
          style={{flex: 1}}
          bgColor={'white'}
          tintColor={'#666666'}
          activityTintColor={'green'}
          handler={(selection, row) => this.setState({text: data[selection][row]})}
          data={data}
        >
        </DropdownMenu>

        

                <View style={{ flexDirection: 'row' }}>
               
                </View>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#D8D9DB"
    },
    inputContainer:{
        margin: 12,
        flexDirection:"row"
    },
    avatar: {
        width: 48,
        height:48,
        //boarderRadius: 24,
        marginRight:16,
        borderRadius: 400/ 2
    },
    photo:{
        alignItems:"flex-end",
        marginHorizontal:32
    },
    postImagePdf: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginVertical: 16
    },
})