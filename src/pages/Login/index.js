import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../../firebase";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate("/home");
    } catch (error) {
      setMessage("Usuário não cadastrado ou dados incorretos.");
    }
  };

  return (
    <div className="page">
      <h1>Login</h1>

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Acessar</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
