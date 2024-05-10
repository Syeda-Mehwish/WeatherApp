import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const WeatherInfo = ({
  location,
  temperature,
  weatherCondition,
  weatherIcon,
  maxTemp,
  minTemp,
}) => {
  return (
    location && (
      <View style={styles.container}>
        <Text style={styles.location}>{location}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.temperature}>{temperature} °</Text>
          <Text style={styles.condition}>{weatherCondition}</Text>
          {maxTemp ? (
            <Text style={styles.condition}>
              {maxTemp}/{minTemp}
            </Text>
          ) : null}
        </View>
        <View style={styles.IconContainer}>
          <Image source={weatherIcon} style={styles.icon} />
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  location: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#ffffff',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 200,
    height: 200,
  },
  temperature: {
    fontSize: 50,
    lineHeight: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  condition: {
    marginTop: 10,
    color: '#ffffff',
    textTransform: 'uppercase',
    fontSize: 18,
    marginHorizontal: 12,
  },
  IconContainer: {
    alignItems: 'center',
  },
});

export default WeatherInfo;
