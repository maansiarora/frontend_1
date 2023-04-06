import React from "react";
import {Link } from "react-router-dom";
import { getUser} from './service/AuthService';


const Main = () => {
    
    const user = getUser();
    console.log(user)
    const user_name = user !== 'undefined' && user ? user.user_name : '';
    

    
    return (
        <div>
        Hey! <br/>
        Welcome {user_name} <br/>
        This is the main page for the AWS web application deployed on EC2 and build with React JS and Node JS with the use of AWS Lambda and API Gateway.<br/>
        {/*<img src={require('./architecture_diagram.jpg')} alt = "" />*/}
        We would love if you could register with us!
        <div><Link to="/register"><button>Register</button></Link></div>
        Already have an account?<p className = "link"><Link to = "/login">Login instead</Link></p>
        </div>
    )
} 

export default Main;