import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const OtherInfo = ({Pressure, Humidity, Wind}) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.temperature}>Pressure : </Text>
        <Text style={styles.condition}>{Pressure}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.temperature}>Humidity : </Text>
        <Text style={styles.condition}>{Humidity}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.temperature}>Wind : </Text>
        <Text style={styles.condition}>{Wind}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 20,
    marginBottom: 50,
  },

  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  temperature: {
    fontSize: 20,
    lineHeight: 40,
    fontWeight: 'bold',

    color: '#ffffff',
  },
  condition: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 40,
    fontWeight: '600',
  },
});

export default OtherInfo;
