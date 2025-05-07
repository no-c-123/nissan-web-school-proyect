import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const BUSINESS_TABLES = [
  { name: "Inventario", table: "inventario" },
  { name: "Ingresos y Egresos", table: "ingresos_egresos" },
  { name: "Existencia", table: "existencia" },
  { name: "Asistentes Personales", table: "asistentes_personales" },
];

const IT_TABLES = [
  { name: "Logs (fallos)", table: "logs" },
  { name: "Eventos", table: "eventos" },
  { name: "Accesos", table: "accesos" },
  { name: "Respaldos", table: "respaldos" },
];

export default function AdminDashboard() {
  const [activeTable, setActiveTable] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTable = async (tableName) => {
    setLoading(true);
    setTableData([]);
    setActiveTable(tableName);
    const { data, error } = await supabase.from(tableName).select("*");
    if (error) {
      console.error("Error al obtener datos de:", tableName, error.message);
    } else {
      setTableData(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Panel de Administración
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Negocios</h2>
          <div className="grid grid-cols-1 gap-3">
            {BUSINESS_TABLES.map(({ name, table }) => (
              <button
                key={table}
                onClick={() => fetchTable(table)}
                className={`px-4 py-2 rounded-lg border transition ${
                  activeTable === table
                    ? "bg-black text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Informática</h2>
          <div className="grid grid-cols-1 gap-3">
            {IT_TABLES.map(({ name, table }) => (
              <button
                key={table}
                onClick={() => fetchTable(table)}
                className={`px-4 py-2 rounded-lg border transition ${
                  activeTable === table
                    ? "bg-black text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla dinámica */}
      <div className="mt-12 max-w-6xl mx-auto">
        {loading && <p className="text-center text-gray-500">Cargando datos...</p>}

        {!loading && activeTable && tableData.length > 0 && (
          <div className="overflow-x-auto border rounded-lg bg-white shadow">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-200 text-xs uppercase text-gray-600">
                <tr>
                  {Object.keys(tableData[0]).map((col) => (
                    <th key={col} className="px-4 py-3 border-b">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <tr key={i} className="even:bg-gray-50">
                    {Object.values(row).map((val, j) => (
                      <td key={j} className="px-4 py-2 border-b">
                        {typeof val === "boolean" ? (val ? "✔" : "✖") : String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && activeTable && tableData.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No hay datos disponibles.</p>
        )}
      </div>
    </div>
  );
}
