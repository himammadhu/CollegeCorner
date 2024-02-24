import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { Box, Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from "@emotion/styled";
import { useState } from "react";
import axios from "axios";


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [proof, setProof] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault();
    const frm = new FormData()
    frm.append("name", name)
    frm.append("email", email)
    frm.append("password", password)
    frm.append("Proof", proof)

    axios.post('http://localhost:5000/College', frm).then((response) => {
      console.log(response.data)
      
      setEmail('')
      setName('')
      setPassword('')
      setProof('')
      navigate("../")
    })
  }

  return (
    <Box className="register" component={'form'} onSubmit={handleSubmit}>
      <div className="card">
        <div className="left">
          <h1>CoLLegE
            CoRNer!</h1>
          <p>
            "Connecting minds, forging friendships, and creating memories—welcome to College Corner, where every post is a step closer to a shared journey of learning, laughter, and lifelong connections.

          </p>
          <span>Do you have an account?</span>
          <Link to="/Guest/">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>REGISTER</h1>
          <Box className="form">
            <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
            <input type="email" placeholder="Email" value={email} autoComplete="off" onChange={(event) => setEmail(event.target.value)} />
            <input type="password" placeholder="Password" value={password} autoComplete="off" onChange={(event) => setPassword(event.target.value)} />
            <Button className="proof"

              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />
              }
            >
              Upload proof
              <VisuallyHiddenInput type="file" onChange={(event) => setProof(event.target.files[0])} />
            </Button>
            <button type="submit">Register</button>
          </Box>
        </div>
      </div>
    </Box>
  );
};

export default Register;
