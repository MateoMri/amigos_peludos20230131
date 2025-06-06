import React from "react";
import { useNavigate } from "react-router-dom";
const Welcome = () => {
 const navigate = useNavigate();
 const handleContinue = () => {
   navigate("/dashboard");
 };
 return (
<div style={{ textAlign: "center", paddingTop: "50px" }}>
<h1>¡Bienvenido a Amigos Peludos!</h1>
<p>Presiona el botón para comenzar</p>
<button onClick={handleContinue}>Ir al Dashboard</button>
</div>
 );
};
export default Welcome;