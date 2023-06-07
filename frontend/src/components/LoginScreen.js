import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Handle successful login
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <div className="login-background">
      <div className="login-style">
        <h1 className="login-title">AKILLAC</h1>
        <h2 className="login-slogan">Soar and Score</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Username:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">LOGIN</button>
        </form>
      </div>
    </div>
  );
}
