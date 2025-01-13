const { default: axios } = require("axios");
const { getData, postData } = require("../utils/apiClient");
var express = require("express");
var router = express.Router();

// Middleware to authenticate and get token
router.get("/auth", async (req, res, next) => {
  try {
    const data = new URLSearchParams({
      grant_type: "client_credentials",
      scope: "write read",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    });
    const response = await axios.post(process.env.AUTH_URL, data.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Axios",
        Accept: "*/*",
        "Cache-Control": "no-cache",
        Host: "api.ingrammicro.com",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Content-Length": data.toString().length,
      },
    });

    console.log("Token:", response.data.access_token);
    req.session.token = response.data.access_token;
    req.session.tokenExpires = Date.now() + response.data.expires_in * 1000;

    // Save the session and log the session data
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ error: "Failed to save session" });
      }
      console.log("Session saved:", req.session);
      res.json({ token: response.data.access_token });
    });
  } catch (error) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      res
        .status(error.response.status)
        .json({ error: "Authentication failed", details: error.response.data });
    } else if (error.request) {
      console.error("Request Error:", error.request);
      res
        .status(500)
        .json({ error: "No response received from the third-party API." });
    } else {
      console.error("Error:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
});

/* GET users listing. */
router.get("/catalog", function (req, res, next) {
  console.log("Catalog API called");
  // Ensure the token is retrieved from the session
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Use the token to make the API request
  const url = "https://api.ingrammicro.com:443/sandbox/resellers/v6/catalog";
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error("Error fetching catalog data:", error);
      res.status(500).json({ error: "Failed to fetch catalog data" });
    });
});

module.exports = router;
