const axios = require("axios");
require("dotenv").config();

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL, // Use the API base URL from the .env file
  timeout: 5000,
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
    if (!token) {
      return Promise.reject({
        response: {
          status: 401,
          data: { error: "Authorization token is missing" },
        },
      });
    }
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getData = async (url, req) => {
  try {
    const token = req.session.token;
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
