import React, { useState } from "react";
import useFetchData from "../hooks/useFetchData";
import MascotaForm from "../components/MascotaForm";
import axios from "axios";
const Dashboard = () => {
 const { data: mascotas, cargando, error, getData } = useFetchData("https://retoolapi.dev/IO7y9L/mascotas");
 const [mascotaEditando, setMascotaEditando] = useState(null);
 const handleDelete = async (id) => {
   try {
     await axios.delete(`https://retoolapi.dev/IO7y9L/mascotas/${id}`);
     getData();
   } catch (error) {
     console.error("Error al eliminar mascota", error);
   }
 };
 const handleEdit = (mascota) => {
   setMascotaEditando(mascota);
 };
 const handleSuccess = () => {
   setMascotaEditando(null);
   getData();
 };
 return (
<div>
<h1>Mascotas registradas</h1>
<MascotaForm mascota={mascotaEditando} onSuccess={handleSuccess} />
     {cargando && <p>Cargando mascotas...</p>}
     {error && <p>Error: {error}</p>}
<ul>
       {mascotas.map((mascota) => (
<li key={mascota.id}>
<strong>{mascota.mascota}</strong> ({mascota.especie}) - Edad: {mascota.edad} años
<br />
           Raza: {mascota.raza} | Propietario: {mascota.propietario}
<br />
<button onClick={() => handleEdit(mascota)}>Editar</button>{" "}
<button onClick={() => handleDelete(mascota.id)}>Eliminar</button>
</li>
       ))}
</ul>
</div>
 );
};
export default Dashboard;