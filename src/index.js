import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Login';
import SpotifyProfile from './SpotifyProfile';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import  { createBrowserRouter, createRoutesFromElements, RouterProvider , Route} from 'react-router-dom';
import { getAccessToken } from './apiHelpers';
Amplify.configure(config);


const root = ReactDOM.createRoot(
  document.getElementById('root')
);

//TODO make proper error page in Issue 8
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
      path="/" 
      element={<App/>}
      errorElement={<div>Error Page</div>}
    > 
      <Route index element={<>Home</>} />
      <Route path='login' element={<Login/>} loader={getAccessToken} />
      <Route path="profile" element={<SpotifyProfile token={getAccessToken()}/>} />
  </Route>
  )
);

// const router2 = createBrowserRouter(

// )

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
