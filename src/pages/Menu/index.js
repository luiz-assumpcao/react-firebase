import React from "react";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>Bem-vindo</h1>
      <button onClick={() => navigate("/register")}>Cadastro</button>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
}

export default Menu;
