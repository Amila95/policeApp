import React from 'react';
import {View, Text, StyleSheet, FlatList, Image,TouchableOpacity, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import * as firebase from 'firebase';
import * as FileSystem from 'expo-file-system';
//import { SearchBar } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';


export default class HomeScreen extends React.Component {
    static navigationOptions ={
        header: null
    }

    state = {
        search: '',
        //id:null,
        posts:[]
    };

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(async _usr => {
            if(!_usr)
                this.props.history.push('/login');
            else {
                await firebase
                    .firestore()
                    .collection('posts')
                    .onSnapshot(querySnapshot => {
                       const users = [];
                  
                        querySnapshot.forEach(documentSnapshot => {
                         users.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                          });
                        });
                        this.setState({
                            posts: users,
                        })
                      });

            }
        });
    }

    SearchFilterFunction(text) {
        if(this.state.posts.length>0){
        const newData = this.state.posts.filter(function(item) {
          const itemData = item.lecNo ? item.lecNo.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
    
        this.setState({
          posts: newData,
          search: text,
        });
    }
      }
      clear = () => {
        this.search.clear();
      };

    deletePost(id){
        Alert.alert(
            'Do you want to ',
            'delete this post ?',
            [
              //{ text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => firebase.firestore().collection("posts").doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            }) },
            ],
            { cancelable: false }
          );
    }

    //post.name,post.lecNo,post.amount,post.reason
    makeDowload(name, lecNo, amount, reason) {
    this.props.navigation.navigate("View", {name:name, lecNo:lecNo,amount:amount,reason:reason})
   
     }

    renderPost = (post, id) =>{
        return(
           
            <View style={styles.feedItem}>
                <Image source={require("../assets/front.jpg")} style={styles.avatar}/>
                <View style={{flex: 1}}>
                    <View style={{ flexDirection:"row", justifyContent: "space-between", alignItems:"center"}}>
                        <View>
                            {/* <Text style={styles.name}>{post.name}</Text> */}
                            <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                        </View>
                        <TouchableOpacity  onPress={() => {
                        this.deletePost(id);
                    }}>
                        <Ionicons name="ios-close" size={24} color="#737888"/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.posts}>Name   : {post.name}</Text>
                    <Text style={styles.posts}>Lec No : {post.lecNo}</Text>
                    <Text style={styles.posts}>Amount : {post.amount}</Text>
                    <Text style={styles.posts}>Reason : {post.reason}</Text>
                    {post.type == "image"?
                    <Image source={{uri: post.image}} style={styles.postImage} resizeMode="cover"/>:
                    null}
                    {post.type == "doc"?
                    <Image source={require("../assets/pdficon.png")} style={styles.postImagePdf} resizeMode="cover"/>:
                    null}
                    {post.type !="text"?
                    <TouchableOpacity style={styles.button} onPress={() => {
                        this.makeDowload(post.name,post.lecNo,post.amount,post.reason);
                    }}>
 
                        <Text style={styles.text}>Payment</Text>

                    </TouchableOpacity>
                    :null}
                    </View>                
            </View>
        )
    }
  render() {
   // console.log("post123 id"+ id);
    return (
        
      <View style={styles.container}>
       {/* <View style={styles.header}>
            <Text style={styles.headerTitle}>Feed</Text>
       </View> */}
       <Searchbar
          round
          searchIcon={{ size: 14 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Type Here..."
          value={this.state.search}
          style={{backgroundColor: "#EFECF4"}}
        />

       <FlatList
       style={styles.feed}
        data={this.state.posts}
        renderItem={({item}) => this.renderPost(item, item.key)}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
       />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4"
  },
  header: {
      paddingTop: 30,
      paddingBottom: 16,
      backgroundColor: "#FFF",
      alignItems: "center",
      justifyContent: "center",
      borderEndWidth: 1,
      borderBottomColor: "#EBECF4",
      shadowColor: "#454D65",
      shadowOffset: {height: 5},
      shadowRadius: 15,
      shadowOpacity: 0.2,
      zIndex: 10
  },
  headerTitle:{
      fontSize: 20,
      //fontWeight: "500"
  },
  feed:{
      marginHorizontal: 16
  },
  feedItem:{
      backgroundColor:"#FFF",
      borderRadius: 5,
      padding: 8,
      flexDirection: "row",
      marginVertical: 8
  },
  avatar:{
      width: 36,
      height: 36,
      borderRadius: 400/ 2,
      marginRight: 16
  },
  name: {
      fontSize: 15,
      //fontWeight:"500",
      color:"#454D65"
  },
  timestamp:{
      fontSize: 11,
      color:"#C4C6CE",
      marginTop:4 
  },
  post:{
      marginTop: 16,
      fontSize: 20,
      color: "#838899"
  },
  postImage: {
      width: undefined,
      height: 150,
      borderRadius: 5,
      marginVertical: 16
  },
  postImagePdf: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginVertical: 16
  },
  button: {
 
    width: '80%',
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: '#e810cf',
    borderRadius: 7,
    margin: 10
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5
  }

});
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default class HomeScreen extends React.Component{
//     render(){
//         return(
//             <View style={styles.container}>
//                 <Text>Message Screen</Text>
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         alignItem: "center",
//         justifyContent: "center"
//     }
// })