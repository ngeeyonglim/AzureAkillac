import { useState } from "react";
import { getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [signUp, setSignUp] = useState(false); // True if user is signing up
  const auth = getAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      // Handle successful login
    } catch (error) {
      // Handle login error
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, createEmail, createPassword);
      // Handle successful creation
    } catch (error) {
      // Handle creation error
    }
  };

  return (
    <div className="login-background">
      <div className="login-style">
        <h1 className="login-title">AKILLAC</h1>
        <h2 className="login-slogan">Soar and Score</h2>
        {signUp ? (
        <>
        <h3 className="login-subtitle">Sign Up</h3>
        <form onSubmit={handleCreate}>
          <label htmlFor="email" className="login-label">Username:</label>
          <input
            type="email"
            id="email"
            value={createEmail}
            onChange={(event) => setCreateEmail(event.target.value)}
            placeholder="Email"
            className="login-input"
            />
          <label htmlFor="password" className="login-label">Password:</label>
          <input
            type="password"
            id="password"
            value={createPassword}
            onChange={(event) => setCreatePassword(event.target.value)}
            placeholder="Password"
            className="login-input"
            />
          <button type="submit" className="login-button">SIGN UP</button>
        </form>
        <button onClick={() => setSignUp(false)} className="login-anchor">Have an account already? Log In</button>
        </>
        ) : (
          <>
          <h3 className="login-subtitle">Login</h3>
          <form onSubmit={handleLogin}>
          <label htmlFor="email" className="login-label">Username:</label>
          <input
            type="email"
            id="email"
            value={loginEmail}
            onChange={(event) => setLoginEmail(event.target.value)}
            placeholder="Email"
            className="login-input"
          />
          <label htmlFor="password" className="login-label">Password:</label>
          <input
            type="password"
            id="password"
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
            placeholder="Password"
            className="login-input"
          />
          <button type="submit" className="login-button">LOGIN</button>
        </form>
        <button onClick={() => setSignUp(true)} className="login-anchor">Don't have an account? Sign Up</button>
        </>
        )}
      </div>
    </div>
  );
}
