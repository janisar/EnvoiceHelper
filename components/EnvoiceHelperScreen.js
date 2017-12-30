import React, {Component} from "react";
import {Button, Linking, StyleSheet, Text, View} from "react-native";

export default class EnvoiceHelperScreen extends Component {

  componentDidMount() {

    Linking.addEventListener('url', this.handleOpenURL);
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({url});
      }
    });
  }

  handleOpenURL = ({url}) => {
    const [, user_string] = url.match(/user=([^#]+)/);
    alert(user_string);
    this.setState({
      user: JSON.parse(decodeURI(user_string))
    });
  };


  loginWithGoogle = () => this.openUrl('http://10.0.2.2:3010/auth/google');

  openUrl = (url) => {
    Linking.openURL(url);
  };

  isAuthenticated() {
    return this.state != null && this.state.user !== undefined
  }

  render() {
    let authenticated = this.isAuthenticated();

    if (authenticated) {
      fetch('10.0.2.2/mailList')
        .then(response => response.json())
        .then(responseJson => alert(JSON.stringify(responseJson)));
    }
    return (
      <View style={styles.container}>
        {authenticated ?
          <Text style={styles.welcome}>
            Welcome {this.state.user.name}!
          </Text>
          :
          <Button
            title="Connect to mailbox"
            onPress={this.loginWithGoogle}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});