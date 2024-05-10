/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import API from './src/services/API';
import WeatherInfo from './src/components/WeatherInfo';
import OtherInfo from './src/components/OtherInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
  enableBackgroundLocationUpdates: false,
  locationProvider: 'auto',
});
var cacheKey = 'weatherData';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);
  // Function to get cached weather data
  const getCachedWeatherData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem(cacheKey);
      return JSON.parse(cachedData);
    } catch (error) {
      console.log('Error getting cached weather data:', error);
      throw error;
    }
  };

  // Function to store weather data in cache
  const cacheWeatherData = async data => {
    try {
      await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (error) {
      console.log('Error caching weather data:', error);
      throw error;
    }
  };
  const getWeatherData = async (latitude, longitude) => {
    try {
      // First, try to get cached data
      let data = await getCachedWeatherData();
      if (!data) {
        // If no cached data, fetch from API
        data = await API.fetchWeather(latitude, longitude);
        // Cache the fetched data
        await cacheWeatherData(data);
      }
      return data;
    } catch (error) {
      console.log('Error getting weather data:', error);
      throw error;
    }
  };
  const getLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => resolve(position),
          error => reject(error),
          {enableHighAccuracy: false, timeout: 5000},
        );
      });

      const res = await getWeatherData(
        position?.coords?.latitude,
        position?.coords?.longitude,
      );
      setData(res);
    } catch (error) {
      console.log('Error getting location or weather:', error);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={{flex: 1}}>
          <WeatherInfo
            weatherIcon={{
              uri: `https://openweathermap.org/img/wn/${data?.weather[0]?.icon}.png`,
            }}
            temperature={Math.round(data?.main?.temp - 273.15)}
            weatherCondition={data?.weather[0]?.description}
            location={`${data?.name}, ${data?.sys?.country}`}
            maxTemp={Math.round(data?.main?.temp_max - 273.15)}
            minTemp={Math.round(data?.main?.temp_min - 273.15)}
          />
        </View>
        <OtherInfo
          Pressure={data?.main?.pressure}
          Humidity={data?.main?.humidity}
          Wind={`${data?.wind?.speed} m/s`}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {backgroundColor: '#89CFF0', flex: 1},
  scrollView: {padding: 24, flex: 1},
});

export default App;
