const axios = require("axios");

module.exports = async (weatherUrl: string) => {
  try {
    const { data } = await axios.get(weatherUrl);

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};
