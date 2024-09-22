import React, { useState, FormEvent } from "react"
// import React, useState from 'react'
import { login } from "../app/authService/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks/hoots";

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
        } else {
            setMessage("Login Failed!");
        }
    }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Login;