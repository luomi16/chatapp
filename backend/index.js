const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express(); // Initializes an Express application
app.use(express.json()); // Adds middleware to parse incoming request bodies in JSON format. This is essential because the POST request will contain JSON data.
app.use(cors({ origin: true })); // Enables CORS for all origins. 
// This allows Express server to accept requests from frontend React app hosted on a different port.

const axios = require("axios");
// Axios is imported here to allow making HTTP requests to the Chat Engine API.

// Authentication Route
app.post("/authenticate", async (req, res) => {
  const { username } = req.body; // extracts the username from the request body
  // Get or create user on Chat Engine!
  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": process.env.PRIVATE_KEY } }
    );
    // sends a PUT request to the Chat Engine API to either create a new user or get an existing one, using the provided username.
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.listen(3001);
// The server starts listening for incoming HTTP requests on port 3001. Any request sent to http://localhost:3001/authenticate will trigger the /authenticate route.
