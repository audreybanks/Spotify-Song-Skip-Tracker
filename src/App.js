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
import { handleAuth } from "./apiHelpers";

const client = generateClient();
const params = new URLSearchParams(window.location.search);
const state = params.get("state");
let fetchError = false;

// If state exists in params, matches stored state, and accessToken doesn't exist, retrieve access token
if (state === localStorage.getItem("state") && 
  (localStorage.getItem("accessToken") === 'undefined' || localStorage.getItem("accessToken") === null)) {
  try {
    await handleAuth();
  } catch (err) {
    fetchError = true;
    console.log(err);
  }
}

const App = ({ signOut }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") === 'undefined' 
    ? null : localStorage.getItem("accessToken"));

  // Event listener to check if access token has been retrieved/changed, if so update the above variable
  useEffect(() => {
    const updateToken = () => {
      setAccessToken(localStorage.getItem("accessToken") === 'undefined' ? null : localStorage.getItem("accessToken"));
    };

    window.addEventListener("tokenUpdate", updateToken);

    return () => { // clean up event listener when component destroyed
      window.removeEventListener("tokenUpdate", updateToken);
    }
  }, []);


  // TODO: create proper error component
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
        { fetchError &&
              <Text>Error fecthing data, try again.</Text>
        }
      </View>
    </ThemeProvider>
  );
};

export default withAuthenticator(App);