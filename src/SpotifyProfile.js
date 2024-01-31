import React, {useState, useEffect} from "react";
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

const SpotifyProfile = () => {

    return (
        <View>
            <Heading level={3}>Profile</Heading>
        </View>
    );
};

export default SpotifyProfile;