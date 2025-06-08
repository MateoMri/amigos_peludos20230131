import React from "react";

const Boton = ({ texto, tipo = "button", onClick, clase = "btn btn-primary" }) => {
  return (
    <button type={tipo} onClick={onClick} className={clase}>
      {texto}
    </button>
  );
};

export default Boton;