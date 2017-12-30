import React, {Component} from "react";
import {Button, StyleSheet, View} from "react-native";

export default class MailBoxView extends Component {

  static navigationOptions = {title: 'Connect',};

  componentDidMount() {
    let script = document.createElement("script");

    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => alert("Gmail")}
          title="Gmail"
          accessibilityLabel="Connect to gmail"
        />
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
  }
});