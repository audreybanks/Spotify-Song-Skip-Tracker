import React, { useState, useEffect } from "react";
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


const NotFoundPage = error => {
    return (
      <ThemeProvider>
        <View className="NotFoundPage">
          <h2>404 Page Not Found</h2>
        </View>
      </ThemeProvider>
    );
};

export default NotFoundPage;