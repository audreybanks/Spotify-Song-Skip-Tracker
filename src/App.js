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

const client = generateClient();

const App = ({ signOut }) => {

  const [showProfile, setShowProfile] = useState(false);

  const buttonClick = () => {
    console.log("click");
    setShowProfile(!showProfile);
  };

  return (
    <ThemeProvider>
      <View className="App">
        <Heading level={1}>Spotify Profile Test</Heading>
        <Text>New Text <Button variation="primary" onClick={buttonClick}>Push</Button></Text>
        { showProfile &&
              <SpotifyProfile/>
        }
      </View>
    </ThemeProvider>
  );
};

export default withAuthenticator(App);