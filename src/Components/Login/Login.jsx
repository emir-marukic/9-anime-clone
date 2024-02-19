const axios = require("axios");

// Function to exchange authorization code for access token
const exchangeCodeForToken = async (authorizationCode) => {
  const authData = {
    grant_type: "authorization_code",
    client_id: "17017",
    client_secret: "203bDHlp5mFsLk8FZUdhwnkP1piSaCYcMMKMLA7c",
    redirect_uri: "http://localhost:5173/",
    code: authorizationCode,
  };

  try {
    const response = await axios.post(
      "https://anilist.co/api/v2/oauth/token",
      authData
    );
    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error(
      "Error exchanging authorization code for access token:",
      error
    );
    throw error;
  }
};

// Function to handle the authorization response and extract authorization code
const handleAuthorizationResponse = () => {
  // Parse the URL query parameters to extract the authorization code
  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get("code");

  // Call function to exchange authorization code for access token
  if (authorizationCode) {
    makeRequest(authorizationCode);
  } else {
    console.error("Authorization code not found in URL.");
  }
};

// Function to make API request using the obtained access token
const makeRequest = async (authorizationCode) => {
  try {
    const accessToken = await exchangeCodeForToken(authorizationCode);
    const response = await axios.get("https://anilist.co/api/v2/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error making request:", error);
  }
};

// Call function to handle authorization response when the script loads
handleAuthorizationResponse();
