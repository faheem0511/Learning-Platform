import { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

const Auth = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isSignup) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);

      const response = await axios.post(`http://localhost:5000/${isSignup ? "signup" : "login"}`, { email, password });
      setUser(response.data.user);
    } catch (error) {
      console.error("Authentication failed:", error.message);
    }
  };

  return (
    <div>
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleAuth}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)}>{isSignup ? "Already have an account? Login" : "Create an account"}</button>
    </div>
  );
};

export default Auth;
