const axios = require("axios");
require("dotenv").config();

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL, // Use the API base URL from the .env file
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "Axios",
    Accept: "*/*",
    "Cache-Control": "no-cache",
    Host: "api.ingrammicro.com", // Corrected Host header
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive",
  },
});

// Add a request interceptor to set the Authorization header dynamically
apiClient.interceptors.request.use(
  (config) => {
    const token = config.headers["Authorization"];
    console.log("Token in apiClient : " + token);
    if (!token) {
      return Promise.reject({
        response: {
          status: 401,
          data: { error: "Authorization token is missing" },
        },
      });
    }
    config.headers["Authorization"] = `${token}`;
    config.headers["Content-Type"] = "application/json";
    config.headers["User-Agent"] = "Axios";
    config.headers["Accept"] = "*/*";
    config.headers["Cache-Control"] = "no-cache";
    config.headers["IM-CustomerNumber"] = process.env.IM_CUSTOMER_NUMBER;
    config.headers["IM-CorrelationID"] = "123456";
    config.headers["IM-CountryCode"] = "FR";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getData = async (url, req) => {
  // Use the session token to make authenticated requests
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token in getData : " + token);
  try {
    //const token = req.session.token;
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await apiClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error in getData : " + error);
    console.log("Error in getData : " + error.fields);
    throw error;
  }
};

const postData = async (url, data, req) => {
  try {
    const token = req.session.token;
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await apiClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = { getData, postData };
