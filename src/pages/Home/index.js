import React from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../../firebase";

function Home() {
  const navigate = useNavigate();

  const logout = async () => {
    await firebase.auth().signOut();
    navigate("/login");
  };

  return (
    <div>
      <h1>Principal</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
}

export default Home;
