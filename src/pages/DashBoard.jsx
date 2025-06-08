import React, { useState } from "react"; 
import useFetchData from "../hooks/useFetchData";
import useSaveData from "../hooks/useSaveData";
import MascotaForm from "../components/MascotaForm";
import Swal from "sweetalert2";

import Titulo from "../components/Titulo";
import Boton from "../components/Boton";

const Dashboard = () => {
  const { data: mascotas, cargando, error, getData } = useFetchData("https://retoolapi.dev/IO7y9L/mascotas");
  const [mascotaEditando, setMascotaEditando] = useState(null);
  const { deleteData } = useSaveData("https://retoolapi.dev/IO7y9L/mascotas");

  const handleDelete = async (id) => {
    try {
      await deleteData(id);
      getData();
      Swal.fire({
        icon: "success",
        title: "Mascota eliminada",
        toast: true,
        timer: 1500,
        position: "top-end",
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al eliminar mascota",
        text: error.message,
      });
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
    <div className="container my-4">
      <Titulo texto="Mascotas Registradas" />

      <div className="mb-5">
        <MascotaForm mascota={mascotaEditando} onSuccess={handleSuccess} />
      </div>

      {cargando && <p className="text-center">Cargando mascotas...</p>}
      {error && <p className="text-center text-danger">Error: {error}</p>}

      <ul className="list-group">
        {mascotas.map((mascota) => (
          <li
            key={mascota.id}
            className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"
          >
            <div>
              <strong>{mascota.mascota}</strong> ({mascota.especie}) - Edad: {mascota.edad} años
              <br />
              Raza: {mascota.raza} | Propietario: {mascota.propietario}
            </div>
            <div className="mt-2 mt-md-0">
              <Boton
                texto="Editar"
                clase="btn btn-sm btn-primary me-2"
                onClick={() => handleEdit(mascota)}
              />
              <Boton
                texto="Eliminar"
                clase="btn btn-sm btn-danger"
                onClick={() => handleDelete(mascota.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
