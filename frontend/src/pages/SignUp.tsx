import {useState, FormEvent} from 'react'
import { signup } from '../app/authService/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks/hoots';



const SignUp = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const resultAction = await dispatch(signup({ username, password, email }));
        if (signup.fulfilled.match(resultAction)) {
            navigate('/login'); // Redirect to login on successful signup
        } else {
            setMessage("Signup failed");
        }
    };
  return (
    <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
            <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="text" placeholder='email'  value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Sign Up</button>
        </form>
        {message && <p>{message}</p>}
    </div>
  )
}

export default SignUp;
