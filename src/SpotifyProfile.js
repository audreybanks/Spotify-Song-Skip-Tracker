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
import { handleAuth } from "./authHelpers";

const SpotifyProfile = token => {
    const [profile, setProfile] = useState();

    useEffect(() => {
        getProfileData(token).then(data => {
            setProfile(data);
        });
    }, []);

    return (
        <View>
            {(profile && !profile.error) &&             <View>
                <Heading level={3}>{profile.display_name}'s Profile</Heading>
                <Text>User ID: {profile.id}</Text>
                <Text>User Email: {profile.email}</Text>
                <Text>Spotify URI: {profile.uri}</Text>
                <Text>User Link: {profile.external_urls.spotify}</Text>
                <Image src={profile.images[0]}/>
            </View>}
        </View>
    );
};

const getProfileData = async token => {
    // check if token is expired before each API call
    const expiresDate = new Date(Date.parse(localStorage.getItem("expiresDate")));
    if (Date.now() > expiresDate) {
        handleAuth(true);
    }

    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token.token}` }
    });

    const profileData = await result.json();
    return profileData;
};

export default SpotifyProfile;