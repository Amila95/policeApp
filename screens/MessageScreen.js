// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default class MessageScreen extends React.Component{
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
//         justifyContent: "center"
//     }
// })
import * as React from 'react'
import { View, StyleSheet, Text , TouchableOpacity, Alert} from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
import { WebView } from 'react-native-webview'
import { Card } from 'react-native-elements';

export default class MessageScreen extends React.Component {
    static navigationOptions ={
        title: 'Payment Details'
    }

    deletePost(){
      this.props.navigation.navigate("Notification")
  }

    constructor(props) {
        super(props);
    }
  render() {
      //const {url} = this.props;
      //post.name,post.lecNo,post.amount,post.reason
      const { navigation } = this.props; 
      const name = navigation.getParam('name'); 
      const lecNo = navigation.getParam('lecNo'); 
      const amount = navigation.getParam('amount'); 
      const reason = navigation.getParam('reason'); 
      // console.log("url "+ url);
    return (
        
      // <PDFReader
      //   source={{
      //    // uri: 'http://gahp.net/wp-content/uploads/2017/09/sample.pdf',
      //     uri: url
      //   }}
      // />
      <View >
       <Card >
        {/*react-native-elements Card*/}
          <Text style={styles.paragraph}>
           Name    : {name}
          </Text>
          <Text style={styles.paragraph}>
           Amount : {amount}
          </Text>
          <View></View>
          
          <View style={{ flexDirection:"row", justifyContent: "space-between", alignItems:"center"}}>
          
          <TouchableOpacity  onPress={() => {
                        this.deletePost();
                    }}>
                      <img src="https://img.icons8.com/color/48/000000/paypal.png" style={{width:48}}/>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => {
                        this.deletePost();
                    }}>
          <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" style={{width:48}}/>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => {
                        this.deletePost();
                    }}>
          <img src="https://img.icons8.com/color/48/000000/wallet.png"style={{width:48}}/>
          </TouchableOpacity>
         
          </View>
          {/* </TouchableOpacity> */}
        </Card>
       </View>

    )
  }
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: "center"
  }
})