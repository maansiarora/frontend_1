import React from "react";
import { getUser, resetUserSession } from './service/AuthService';
import { useNavigate } from "react-router-dom";


const Main = () => {
    const navigate = useNavigate(); 
    const user = getUser();
    console.log(user)
    const user_name = user !== 'undefined' && user ? user.user_name : '';
    

    const logoutHandler = () => {
        resetUserSession();
        navigate('/login');
    }
    return (
        <div>
        Hello {user_name}! You have been loggined in!!!! Welcome to the home <br />
        <input type="button" value="Logout" onClick={logoutHandler} />
        </div>
    )
} 

export default Main;