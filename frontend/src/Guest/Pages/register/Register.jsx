import { Link } from "react-router-dom";
import "./register.scss";

const Register = () => {
  return (
    <div className="register">
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
          <form>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
