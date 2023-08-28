import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Jobs: React.FC<{}> = () => {
  // <-- Activity -->

  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
    </View>
  );
};

// <-- Styles -->

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 13,
  },
});

export default Jobs;
