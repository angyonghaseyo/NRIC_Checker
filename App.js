// App.js
import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import NricChecker from './NricChecker'; // Adjust the path based on your file structure

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <NricChecker />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default App;
