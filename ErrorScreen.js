import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Error loading data. Please restart the app.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffcccb', // light red background to indicate error
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
});

export default ErrorScreen;
