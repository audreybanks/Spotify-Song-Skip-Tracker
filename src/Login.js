import React, { useState, useEffect } from "react";
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
import { getAccessToken, handleAuth } from "./apiHelpers";
import { useLoaderData, useNavigate } from "react-router-dom";

// If state exists in params, matches stored state, and accessToken doesn't exist, retrieve access token
if (state === localStorage.getItem("state") && getAccessToken()) {
  try {
    await handleAuth();
  } catch (err) {
    fetchError = true;
    console.log(err);
  }
}

const Login = ({ signOut }) => {

    const navigate = useNavigate();
    const accessToken = useLoaderData();

    useEffect(() => {
        if (accessToken) {
            console.log("accessToken Found");
            navigate("/profile");
        }
    }, [navigate, accessToken]);

    return (
        <ThemeProvider>
            <View className="Login">
                <Text>Login Page</Text>
                <Button onClick={() => { handleAuth() }}>Sign into Spotify</Button>
            </View>
        </ThemeProvider>
    );
};

export default Login;