/**
 * Returns weather data object if successful,
 * error is not
 * @param {string} weatherUrl - complete weather url path with cityId and appId parameters
 */

const axios = require("axios");

module.exports = async (weatherUrl: string) => {
  try {
    const { data } = await axios.get(weatherUrl);

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};
