// AdminDashboard.jsx
import FileSaver from "file-saver";
import Papa from "papaparse";
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

  const exportToCSV = () => {
    console.log("Exportando CSV...");
    if (!tableData || tableData.length === 0) {
      console.warn("No hay datos para exportar");
      return;
    }
  
    const csv = Papa.unparse(tableData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, `${activeName.replace(/\s/g, "_")}_reporte.csv`);
  };

  const fetchTable = async (name, tableName) => {
    setLoading(true);
    setTableData([]);
    setActiveTable(tableName);
    setActiveName(name);

    if (tableName === "ingresos_egresos") {
      const [
        { data: ingresosData, error: error1 },
        { data: movimientosData, error: error2 },
        { data: cotizacionesData, error: error3 }
      ] = await Promise.all([
        supabase.from("ingresos_egresos").select("*"),
        supabase.from("movimientos").select("*"),
        supabase.from("cotizaciones").select("id, user_id, precio, metodo_pago, created_at")
      ]);

      if (error1 || error2 || error3) {
        console.error("Error cargando datos:", error1 || error2 || error3);
        setLoading(false);
        return;
      }

      const enrichedMovs = movimientosData.map((mov) => {
        const match = cotizacionesData.find(c =>
          Number(c.precio) === Number(mov.monto) &&
          c.user_id === mov.creado_por
        );

        return {
          id: mov.id,
          tipo: mov.tipo,
          monto: mov.monto,
          fecha: match?.created_at || mov.fecha || new Date().toISOString(),
          user_id: match?.user_id || mov.creado_por || "N/D",
          tipo_pago: item.tipo_pago || "Desconocido",
          orden_id: match?.id || "No asignada",
          descripcion: mov.descripcion || (match ? "Compra de auto" : "Otro movimiento"),
          origen: mov.creado_por ? "manual" : "automático",
        };
      });

      const enrichedIngresos = ingresosData.map(item => {
        const match = cotizacionesData.find(c => Number(c.precio) === Number(item.monto));

        return {
          ...item,
          fecha: item.fecha || match?.created_at || new Date().toISOString(),
          user_id: match?.user_id || item.user_id || "N/D",
          tipo_pago: match?.metodo_pago || "Desconocido",
          orden_id: match?.id || "No asignada",
          descripcion: "Compra de auto",
          origen: item.user_id ? "manual" : "automático"
        };
      });

      setTableData([...enrichedIngresos, ...enrichedMovs]);
      setLoading(false);
      return;
    }

    if (tableName === "asistentes_personales") {
      const { data, error } = await supabase.from("asistentes_personales").select("*");
      if (error) {
        console.error("Error al obtener asistentes:", error.message);
        setLoading(false);
        return;
      }

      const now = new Date();
      const hour = now.getHours();

      const turnoActual = hour >= 6 && hour < 14 ? "Matutino"
                        : hour >= 14 && hour < 22 ? "Vespertino"
                        : "Nocturno";

      const actualizados = data.map((asistente) => ({
        ...asistente,
        disponible: asistente.turno === turnoActual
      }));

      setTableData(actualizados);
      setLoading(false);
      return;
    }

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
                      {Object.entries(row).map(([key, val], j) => (
                        <td key={j} className="px-4 py-2 border-b">
                          {key === "estatus" && activeTable === "logs" ? (
                            <select
                              value={val}
                              onChange={async (e) => {
                                const newStatus = e.target.value;
                                const { error } = await supabase
                                  .from("logs")
                                  .update({ estatus: newStatus })
                                  .eq("id", row.id);
                                if (error) {
                                  alert("Error actualizando estatus");
                                } else {
                                  setTableData((prev) =>
                                    prev.map((r) =>
                                      r.id === row.id ? { ...r, estatus: newStatus } : r
                                    )
                                  );
                                }
                              }}
                              className="border px-2 py-1 rounded bg-white text-gray-700"
                            >
                              <option value="pendiente">pendiente</option>
                              <option value="resuelto">resuelto</option>
                            </select>
                          ) : (
                            String(val)
                          )}
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
          <div className="mt-6 flex justify-center">
            <a id='a' onClick={exportToCSV} className="cursor-pointer">
              <svg
                viewBox="0 0 256 256"
                height="32"
                width="38"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M74.34 85.66a8 8 0 0 1 11.32-11.32L120 108.69V24a8 8 0 0 1 16 0v84.69l34.34-34.35a8 8 0 0 1 11.32 11.32l-48 48a8 8 0 0 1-11.32 0ZM240 136v64a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h52.4a4 4 0 0 1 2.83 1.17L111 145a24 24 0 0 0 34 0l23.8-23.8a4 4 0 0 1 2.8-1.2H224a16 16 0 0 1 16 16m-40 32a12 12 0 1 0-12 12a12 12 0 0 0 12-12"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
          </div>
        </Modal>
        
      )}
      
    </div>
  );
}