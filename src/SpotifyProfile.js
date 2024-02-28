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
import { fetchAPI, getAccessToken } from "./apiHelpers";
import { useNavigate } from "react-router-dom";

let fetchError = false;

const SpotifyProfile = () => {
    const [profile, setProfile] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!getAccessToken()) {
            navigate("/login");
            return;
        }

        try {
            getProfileData().then(data => {
                setProfile(data);
            });
        } catch (err) {
            fetchError = true;
            console.log(err);
        }
    }, [navigate]);

    return (
        <View>
            Test
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

const getProfileData = async () => {
    const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${getAccessToken()}` },
    };

    const profileData = await fetchAPI("https://api.spotify.com/v1/me", options, 1);
    return profileData;
};

export default SpotifyProfile;