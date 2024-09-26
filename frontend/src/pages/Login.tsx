import React, { useState, FormEvent } from "react"
import { login } from "../app/authService/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks/hooks";

const Login:React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const resultAction = await dispatch(login({ username, password }));
       
        if (login.fulfilled.match(resultAction)) {
            navigate("/dashboard");
            setMessage(resultAction.payload.message)
        } else {
            setMessage("Login Failed!");
        }
    }

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      navigate("/signup");
    }


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
       {message && <p>{message}</p>}

       <div>
        <form onSubmit={handleSignup}>
        <p>Don't have a account?</p>
        <button type="submit">Signup</button>
        </form>
       </div>
    </div>
  )
}

export default Login;
