import Config from 'react-native-config';
import BaseAPI from './HTTP';

const API_KEY = '52b164adecc765cc3a08ca3d3a12125a';

class API extends BaseAPI {
  static BASE_URL = Config.API_URL;
  static AUTH_HEADER_KEY = 'auth';
  static isRefreshing = null;

  static fetchWeather(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    return this.get(url);
  }
}

export default API;
