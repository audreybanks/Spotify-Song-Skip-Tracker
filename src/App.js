// Put your code below this line.

import React, { useState, useEffect } from "react";
import "./App.css";
import SpotifyProfile from "./SpotifyProfile";
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  Image,
  View,
  withAuthenticator,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import { generateClient } from 'aws-amplify/api';
import { uploadData, getUrl, remove }  from 'aws-amplify/storage';
import { handleAuth, getRefreshToken } from "./authHelpers";

const client = generateClient();

// const clientId = "e6fb6e00e14f4df2b11fd3c6bd3985f3";
// let accessToken = localStorage.getItem("accessToken") === 'undefined' ? null : localStorage.getItem("accessToken");
// const params = new URLSearchParams(window.location.search);
// const code = params.get("code");
// console.log(accessToken);
// if (!code) {
//   redirectToAuth(clientId);
// } else {
//   accessToken = await getAccessToken(clientId, code);
// }
// let accessToken = localStorage.getItem("accessToken") === 'undefined' ? null : localStorage.getItem("accessToken");
if (localStorage.getItem("accessToken") === 'undefined') {
  handleAuth();
}

const App = ({ signOut }) => {
  //TODO eventListener useState accessToken to check when accessToken aquired
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") === 'undefined' ? null : localStorage.getItem("accessToken"));

  return (
    <ThemeProvider>
      <View className="App">
        <Heading level={1}>Spotify Profile Test</Heading>
        { accessToken &&
              <SpotifyProfile token={accessToken} />
        }
      </View>
    </ThemeProvider>
  );
};

export default withAuthenticator(App);