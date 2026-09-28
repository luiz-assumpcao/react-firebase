import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../../firebase";

const ERROR_MESSAGES = {
  "auth/email-already-in-use": "Este e-mail já está cadastrado.",
  "auth/weak-password": "A senha deve ter pelo menos 6 caracteres.",
  "auth/invalid-email": "E-mail inválido.",
};

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const uid = result.user.uid;

      await firebase.firestore().collection("users").doc(uid).set({
        uid,
        firstName,
        lastName,
        birthDate,
      });

      navigate("/home");
    } catch (error) {
      setMessage(
        ERROR_MESSAGES[error.code] || "Não foi possível concluir o cadastro.",
      );
    }
  };

  return (
    <div className="page">
      <h1>Cadastro</h1>

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
      <input
        type="text"
        placeholder="Nome"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Sobrenome"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />

      <button onClick={register}>Cadastrar</button>
      <button className="secondary" onClick={() => navigate("/")}>
        Voltar
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Register;
