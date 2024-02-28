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
import { getAccessToken, handleAuth } from "./apiHelpers";
import { useNavigate, Outlet, Link } from "react-router-dom";

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

  const navigate = useNavigate();

  useEffect(() => {
    if (getAccessToken()) {
      navigate("/profile");
    }
  }, [navigate]);

  // TODO: create proper error component
  return (
    <ThemeProvider>
      <View className="App">
        <Outlet/>
      </View>
    </ThemeProvider>
  );
};

export default withAuthenticator(App);