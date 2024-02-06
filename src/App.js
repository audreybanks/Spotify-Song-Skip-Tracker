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

// if (localStorage.getItem("accessToken") === 'undefined') {
//   handleAuth();
// }

const App = ({ signOut }) => {
  //TODO eventListener useState accessToken to check when accessToken aquired
  // const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") === 'undefined' ? null : localStorage.getItem("accessToken"));
  const accessToken = localStorage.getItem("accessToken") === 'undefined' ? null : localStorage.getItem("accessToken");
  return (
    <ThemeProvider>
      <View className="App">
        <Heading level={1}>Spotify Profile Test</Heading>
        { !accessToken &&
          <Button onClick={() => { handleAuth() }}>Sign into Spotify</Button>
        }
        { accessToken &&
              <SpotifyProfile token={accessToken} />
        }
      </View>
    </ThemeProvider>
  );
};

export default withAuthenticator(App);