import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ReportTable({ tableName }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTable = async () => {
      setLoading(true);
      const { data, error } = await supabase.from(tableName).select("*");

      if (error) {
        console.error("Error al cargar datos de", tableName, error.message);
        setRows([]);
      } else {
        setRows(data);
      }

      setLoading(false);
    };

    fetchTable();
  }, [tableName]);

  if (loading) return <p className="text-center text-gray-500">Cargando datos de {tableName}...</p>;
  if (rows.length === 0) return <p className="text-center text-red-500">Sin datos disponibles.</p>;

  const headers = Object.keys(rows[0]);

  return (
    <div className="overflow-x-auto mt-6 bg-white rounded-lg shadow p-4">
      <h3 className="text-xl font-semibold mb-4 text-center">Tabla: {tableName}</h3>
      <table className="table-auto w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            {headers.map((col) => (
              <th key={col} className="border px-3 py-2">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="even:bg-gray-50">
              {headers.map((col) => (
                <td key={col} className="border px-3 py-2">{String(row[col])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
