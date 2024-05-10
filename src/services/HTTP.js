import axios from 'axios';

/**
 * Base API Class for Making HTTP Requests
 */
class BaseAPI {
  /**
   * HTTP GET Request
   */
  static async get(url, params, headers) {
    try {
      const response = await axios.get(url, {
        params: params,
        headers: headers,
        responseType: 'json', // Add this line to specify JSON response
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Run axios request
   */
  static async request(config) {
    try {
      return await axios.request(config);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Add Request Middleware | pre-process request before sending
   */
  static addRequestMiddleware(onFullfilled, onRejected) {
    return axios.interceptors.request.use(onFullfilled, onRejected);
  }

  /**
   * Add Response Middleware | post-process response after receiving
   */
  static addResponseMiddleware(onFullfilled, onRejected) {
    return axios.interceptors.response.use(onFullfilled, onRejected);
  }

  /**
   * Clear Middlewares
   */
  static clearMiddlewares() {
    axios.interceptors.request.eject();
    axios.interceptors.response.eject();
  }
}

export default BaseAPI;
