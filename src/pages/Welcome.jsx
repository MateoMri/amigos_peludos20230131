import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa",
        padding: "1rem",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "white",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h1 className="mb-3">🐾 Bienvenido a <span style={{color: "#0d6efd"}}>Amigos Peludos</span></h1>
        <p className="mb-4">Presiona el botón para comenzar</p>
        <button
          className="btn btn-primary btn-lg"
          onClick={handleContinue}
        >
          Ir al Dashboard
        </button>
      </div>
    </div>
  );
};

export default Welcome;
