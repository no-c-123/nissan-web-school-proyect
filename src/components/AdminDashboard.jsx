// AdminDashboard.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}

const BUSINESS_TABLES = [
  { name: "Inventario", table: "Inventario" },
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
  const [activeName, setActiveName] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTable = async (name, tableName) => {
    setLoading(true);
    setTableData([]);
    setActiveTable(tableName);
    setActiveName(name);
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
                onClick={() => fetchTable(name, table)}
                className="px-4 py-2 rounded-lg border bg-white text-gray-800 hover:bg-gray-100 transition"
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
                onClick={() => fetchTable(name, table)}
                className="px-4 py-2 rounded-lg border bg-white text-gray-800 hover:bg-gray-100 transition"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTable && (
        <Modal title={`Reporte: ${activeName}`} onClose={() => setActiveTable(null)}>
          {loading ? (
            <p className="text-center text-gray-500">Cargando datos...</p>
          ) : tableData.length > 0 ? (
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
          ) : (
            <p className="text-center text-gray-500">No hay datos disponibles.</p>
          )}
        </Modal>
      )}
    </div>
  );
}
