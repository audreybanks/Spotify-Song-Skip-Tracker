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
import { handleAuth } from "./apiHelpers";
import { redirect, useLoaderData } from "react-router-dom";

const Login = ({ signOut }) => {

    console.log(useLoaderData());

    return (
        <ThemeProvider>
            <View className="Login">
                <Text>Login Page</Text>
            </View>
        </ThemeProvider>
    );
};

export default Login;