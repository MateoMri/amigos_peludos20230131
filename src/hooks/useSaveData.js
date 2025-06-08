import { useState } from "react";

const useSaveData = (urlBase) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createData = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(urlBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al crear mascota");
      const result = await res.json();
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message || "Error desconocido");
      setLoading(false);
      throw err;
    }
  };

  const updateData = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${urlBase}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al actualizar mascota");
      const result = await res.json();
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message || "Error desconocido");
      setLoading(false);
      throw err;
    }
  };

  const deleteData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${urlBase}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar mascota");
      setLoading(false);
    } catch (err) {
      setError(err.message || "Error desconocido");
      setLoading(false);
      throw err;
    }
  };

  return { loading, error, createData, updateData, deleteData };
};

export default useSaveData;