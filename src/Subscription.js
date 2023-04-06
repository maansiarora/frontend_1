import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { getUser, resetUserSession } from './service/AuthService';
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const [musicData, setMusicData] = useState([]);
  const apiurl = 'https://4m2tcg1vr0.execute-api.us-east-1.amazonaws.com/prod/tabledisplay';
  const xapikey = '1NbgWVwiRG7GJKfbLEMAF5yzXQLJF17774cnDkAc';

  const navigate = useNavigate(); 
  const user = getUser();
  console.log(user)
  const user_name = user !== 'undefined' && user ? user.user_name : '';
  

  const logoutHandler = () => {
      resetUserSession();
      navigate('/login');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiurl, { headers: { 'x-api-key': xapikey } });
        console.log(response.data);
        setMusicData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    <section class="hero">
    <div class="intro-text">
      <h1>
        <span class="hear">Hello {user_name}! You have been logged in successfully </span> <br />
        <span class="connecting">  Welcome to your Subscriptions </span>
      </h1>
      <input type="button" class="btn red" value="Logout" onClick={logoutHandler} />
    </div>
  </section>
      <h1>Music Table</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {musicData.map((music, index) => (
            <tr key={index}>
              <td>{music.title}</td>
              <td>{music.artist}</td>
              <td>{music.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subscription;