import React, {useState} from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { setUserSession } from './service/AuthService'
const loginAPIUrl = 'https://4m2tcg1vr0.execute-api.us-east-1.amazonaws.com/prod/login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate(); 

  const submitHandler = (event) => {
    event.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      setErrorMessage('Both email and password are required');
      return;
    }
    setErrorMessage(null);

    const requestConfig = {
      headers: {
        'x-api-key': '1NbgWVwiRG7GJKfbLEMAF5yzXQLJF17774cnDkAc'
      }
    }
    const requestBody = {
      email: email,
      password: password
    }

    axios.post(loginAPIUrl, requestBody, requestConfig).then((response) => {
      
      
      setUserSession(response.data.user, response.data.token);
      navigate('/');
    }).catch((error) => {
        console.log(error)
      if (error.response.status === 401 || error.response.status === 403) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('sorry....the backend server is down. please try again later!!');
      }
    })
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Login</h5>
        Email: <input type="text" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
        Password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
        <input type="submit" value="Login" />
      </form>
      <p className = "link"><Link to = "/register">Register instead?</Link></p>
      {errorMessage && <p className="message">{errorMessage}</p>}
    </div>
  )
}

export default Login;