import React, { useState, FormEvent } from "react";
import { login } from "../app/authService/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks/hooks";

const Login: React.FC = () => {
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
      setMessage(resultAction.payload.message);
    } else {
      setMessage("Login Failed!");
    }
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Enter Account</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          <button
            type="submit"
            className="w-full bg-lime-400 text-white py-2 rounded hover:bg-lime-500 transition duration-300"
          >
            Login
          </button>
          {message && <p className="text-red-500 text-center">{message}</p>}
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/forgotPassword")}
            className="text-sm text-lime-400 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <div className="mt-4 text-center">
          <form onSubmit={handleSignup}>
            <p>Don't have an account?</p>
            <button
              type="submit"
              className="mt-2 text-lime-400 hover:underline"
            >
              SIGNUP!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
