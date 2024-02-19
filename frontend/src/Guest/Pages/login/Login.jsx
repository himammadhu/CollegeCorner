import { Link } from "react-router-dom";
import "./login.scss";

const Login = () => {



  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>CoLLegE
            CoRNer!</h1>
          <p>
          "Connecting minds, forging friendships, and creating memories—welcome to College Corner, where every post is a step closer to a shared journey of learning, laughter, and lifelong connections.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/Guest/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>LOGIN</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button >Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
