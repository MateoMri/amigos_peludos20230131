import { useEffect, useState } from "react";
import axios from "axios";
const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getData = async () => {
    try {
      const res = await axios.get(url);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error al obtener datos:", err);
      setError(err.message || "Error desconocido");
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [url]);
  return { data, cargando: loading, error, getData };
};
export default useFetchData;