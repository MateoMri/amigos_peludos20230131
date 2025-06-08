import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useSaveData from "../hooks/useSaveData";

const MascotaForm = ({ mascota, onSuccess }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { createData, updateData, loading } = useSaveData("https://retoolapi.dev/IO7y9L/mascotas");

  useEffect(() => {
    if (mascota) {
      setValue("mascota", mascota.mascota);
      setValue("especie", mascota.especie);
      setValue("edad", mascota.edad);
      setValue("raza", mascota.raza);
      setValue("propietario", mascota.propietario);
    } else {
      reset();
    }
  }, [mascota, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (mascota) {
        await updateData(mascota.id, data);
        Swal.fire({ icon: "success", title: "Mascota actualizada", timer: 2000, toast: true, position: "top-end", showConfirmButton: false });
      } else {
        await createData(data);
        Swal.fire({ icon: "success", title: "Mascota agregada", timer: 2000, toast: true, position: "top-end", showConfirmButton: false });
      }
      reset();
      onSuccess();
    } catch (error) {
      Swal.fire({ icon: "error", title: "Oops...", text: error.message || "Error al guardar mascota" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
      <div className="col-md-6">
        <input className="form-control" placeholder="Nombre de la mascota" {...register("mascota", { required: true })} />
      </div>
      <div className="col-md-6">
        <input className="form-control" placeholder="Especie" {...register("especie", { required: true })} />
      </div>
      <div className="col-md-6">
        <input type="number" className="form-control" placeholder="Edad" {...register("edad", { required: true })} />
      </div>
      <div className="col-md-6">
        <input className="form-control" placeholder="Raza" {...register("raza", { required: true })} />
      </div>
      <div className="col-md-12">
        <input className="form-control" placeholder="Nombre del propietario" {...register("propietario", { required: true })} />
      </div>
      <div className="col-md-12 text-end">
        <button type="submit" className="btn btn-success" disabled={loading}>
          {mascota ? "Actualizar" : "Agregar"} Mascota
        </button>
      </div>
    </form>
  );
};

export default MascotaForm;
