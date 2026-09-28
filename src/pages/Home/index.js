import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../../firebase";

const formatDate = (isoDate) => {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
};

const calculateAge = (isoDate) => {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-").map(Number);
  const today = new Date();
  let age = today.getFullYear() - year;
  const hadBirthdayThisYear =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day);
  if (!hadBirthdayThisYear) age -= 1;
  return age;
};

function Home() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
        return;
      }

      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setFirstName(doc.data().firstName);
            setLastName(doc.data().lastName);
            setBirthDate(doc.data().birthDate);
          }
        });
    });

    return () => unsubscribe();
  }, [navigate]);

  const logout = async () => {
    await firebase.auth().signOut();
  };

  return (
    <div className="page">
      <h1>
        Bem-vindo, {firstName} {lastName}!
      </h1>

      <div className="field">
        <label htmlFor="firstName">Nome</label>
        <input id="firstName" type="text" value={firstName} readOnly />
      </div>
      <div className="field">
        <label htmlFor="lastName">Sobrenome</label>
        <input id="lastName" type="text" value={lastName} readOnly />
      </div>
      <div className="field">
        <label htmlFor="birthDate">Data de Nascimento</label>
        <input
          id="birthDate"
          type="text"
          value={formatDate(birthDate)}
          readOnly
        />
      </div>
      <div className="field">
        <label htmlFor="age">Idade</label>
        <input id="age" type="text" value={calculateAge(birthDate)} readOnly />
      </div>

      <button onClick={logout}>Sair</button>
    </div>
  );
}

export default Home;
