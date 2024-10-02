import React, { useState, FormEvent } from "react";
import { signup } from "../app/authService/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks/hooks";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultAction = await dispatch(signup({ username, email, password }));
    if (signup.fulfilled.match(resultAction)) {
      navigate("/login");
    } else {
      setMessage("Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create A Account</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Sign Up
          </button>
          {message && <p className="text-red-500 text-center">{message}</p>}
        </form>

        <div className="mt-4 text-center">
          <p>Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="text-lime-400 hover:underline"
          >
            LOGIN!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
