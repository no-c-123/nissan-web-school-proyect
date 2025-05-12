// AdminPanel.jsx
import React, { useState } from 'react';

const reportCategories = {
  "Negocios": [
    "Inventario",
    "Ingresos y Egresos",
    "Existencia",
    "Asistentes personales"
  ],
  "Informática": [
    "Logs (fallos)",
    "Eventos",
    "Accesos",
    "Horarios",
    "Respaldos"
  ]
};

export default function AdminPanel() {
  const [expanded, setExpanded] = useState(null);

  const toggleCategory = (category) => {
    setExpanded(prev => (prev === category ? null : category));
  };

  return (
    <div className="p-6 bg-[#E8E8E8] min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-[#666666]">Panel de Reportes</h2>
      <div className="grid gap-6">
        {Object.entries(reportCategories).map(([category, reports]) => (
          <div key={category} className="bg-white rounded-2xl shadow p-4">
            <button
              onClick={() => toggleCategory(category)}
              className="text-xl font-semibold w-full text-left text-[#9C9C9C] hover:text-[#666666]"
            >
              {category}
            </button>
            {expanded === category && (
              <ul className="mt-3 ml-4 list-disc text-[#666666]">
                {reports.map(report => (
                  <li key={report} className="py-1 hover:underline cursor-pointer">
                    {report}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
