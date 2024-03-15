import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  const handleSubmit = (event) => {
    event.preventDefault();


    const data = {
      email,
      password
    }

    axios.post('http://localhost:5000/Login', data).then((response) => {
      console.log(response.data)

      const { id, login } = response.data
      if (login === 'college') {
        sessionStorage.setItem('cId', id)
        navigate("../../College")

      }
      else if (login === 'user') {
        sessionStorage.setItem('uId', id)

        navigate("../../User")

      }
      else if (login === 'admin') {
        sessionStorage.setItem('aId', id)
        navigate("../../Admin")

      }
      else {
        alert('Invalid credential')
      }

      setEmail('')
      setPassword('')

    })
  }


  return (
    <Box className="login" component={'form'} onSubmit={handleSubmit}>
      <div className="card">
        <div className="left">
          <h1>CoLLegE
            CoRNer!</h1>
          <p>
            "Connecting minds, forging friendships, and creating memories—welcome to College Corner, where every post is a step closer to a shared journey of learning, laughter, and lifelong connections.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>LOGIN</h1>
          <Box className="form">

            <input type="text" placeholder="Username" onChange={(event) => setEmail(event.target.value)} />
            <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
            <button type="submit" >Login</button>
          </ Box>
        </div>
      </div>
    </Box>
  );
};

export default Login;
