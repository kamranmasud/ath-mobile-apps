import React, {Component} from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import Landing from './components/landing/Landing';
import Header from './components/Header';
import Navigations from './components/Navigations';
export class App extends Component {
  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Header />
        <ScrollView>
          <Landing></Landing>
        </ScrollView>
        <Navigations />
      </SafeAreaView>
    );
  }
}

export default App;
