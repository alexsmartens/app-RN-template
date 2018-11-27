import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {};

export default class SupportScreen extends Component<Props> {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Support Screen!</Text>
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
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
