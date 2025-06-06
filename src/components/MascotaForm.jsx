import React, { useState, useEffect } from "react";
import axios from "axios";
const MascotaForm = ({ mascota, onSuccess }) => {
 const [mascotaForm, setMascotaForm] = useState({
   mascota: "",
   especie: "",
   edad: "",
   raza: "",
   propietario: "",
 });
 useEffect(() => {
   if (mascota) {
     setMascotaForm({
       mascota: mascota.mascota || "",
       especie: mascota.especie || "",
       edad: mascota.edad || "",
       raza: mascota.raza || "",
       propietario: mascota.propietario || "",
     });
   } else {
     setMascotaForm({
       mascota: "",
       especie: "",
       edad: "",
       raza: "",
       propietario: "",
     });
   }
 }, [mascota]);
 const handleChange = (e) => {
   const { name, value } = e.target;
   setMascotaForm((prev) => ({
     ...prev,
     [name]: value,
   }));
 };
 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     if (mascota && mascota.id) {
       // Actualizar
       await axios.put(`https://retoolapi.dev/IO7y9L/mascotas/${mascota.id}`, mascotaForm);
     } else {
       // Crear
       await axios.post("https://retoolapi.dev/IO7y9L/mascotas", mascotaForm);
     }
     setMascotaForm({
       mascota: "",
       especie: "",
       edad: "",
       raza: "",
       propietario: "",
     });
     onSuccess();
   } catch (error) {
     console.error("Error al guardar mascota", error);
   }
 };
 return (
<form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
<input
       type="text"
       name="mascota"
       placeholder="Nombre mascota"
       value={mascotaForm.mascota}
       onChange={handleChange}
       required
     />
<input
       type="text"
       name="especie"
       placeholder="Especie"
       value={mascotaForm.especie}
       onChange={handleChange}
       required
     />
<input
       type="number"
       name="edad"
       placeholder="Edad"
       value={mascotaForm.edad}
       onChange={handleChange}
       required
       min="0"
     />
<input
       type="text"
       name="raza"
       placeholder="Raza"
       value={mascotaForm.raza}
       onChange={handleChange}
       required
     />
<input
       type="text"
       name="propietario"
       placeholder="Propietario"
       value={mascotaForm.propietario}
       onChange={handleChange}
       required
     />
<button type="submit">{mascota ? "Actualizar" : "Agregar"} Mascota</button>
</form>
 );
};
export default MascotaForm;