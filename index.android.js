import React, { Component } from 'react';
import MailBoxView from './components/MailBoxView';
import EnvoiceHelperScreen from './components/EnvoiceHelperScreen';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

const EnvoiceHelper = StackNavigator({
    Home: { screen: EnvoiceHelperScreen },
    MailBoxView: {screen: MailBoxView}
});


AppRegistry.registerComponent('EnvoiceHelper', () => EnvoiceHelper);
