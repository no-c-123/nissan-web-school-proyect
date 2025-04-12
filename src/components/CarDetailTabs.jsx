import { useState } from "react";

export default function CarTabs({ car }) {
  const [tab, setTab] = useState("Contado");

  const tabs = ["Especificaciones","Contado", "Arrendamiento", "Financiamiento"];

  return (
    <>
      {/* Tabs + botón de especificaciones alineados */}
      <div className="flex flex-wrap justify-between items-center mb-2 gap-4">
        {/* Tabs */}
        <div className="flex gap-2 text-sm font-semibold">
          {tabs.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`px-4 py-1.5 rounded-full transition ${
                tab === item
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Botón Ver Especificaciones */}
    
      </div>

      {/* Contenido dinámico */}
      <div className="bg-white p-4 rounded-lg shadow text-sm space-y-2">
        {tab === 'Especificaciones' && (
          <>
            <p className="text-xs text-gray-600 font-semibold">Pago único:</p>
            <p className="text-lg font-bold">{car.price.toLocaleString("es-MX")} MXN</p>
            <hr />
            <p><strong>Motor:</strong> {car.specs?.motor}</p>
            <p><strong>Transmisión:</strong> {car.specs?.transmision}</p>
            <p><strong>Potencia:</strong> {car.specs?.hp}</p>
            <p><strong>Tracción:</strong> {car.specs?.traccion}</p>
            <p><strong>Seguridad:</strong> {car.specs?.seguridad}</p>
          </>
        )}
        {tab === "Contado" && (
          <>
            <p className="text-xs text-gray-600 font-semibold">Pago único:</p>
            <p className="text-lg font-bold">{car.price.toLocaleString("es-MX")} MXN</p>
          </>
        )}

        {tab === "Arrendamiento" && (
          <ul className="list-disc pl-4 space-y-1">
            <li>Enganche: $50,000</li>
            <li>Plazo: 36 meses</li>
            <li>Kilometraje anual: 15,000 km</li>
            <li>Pago mensual: <strong>$11,500 MXN</strong></li>
          </ul>
        )}

        {tab === "Financiamiento" && (
          <ul className="list-disc pl-4 space-y-1">
            <li>Enganche: $80,000</li>
            <li>Plazo: 60 meses</li>
            <li>Tasa de interés: 12%</li>
            <li>
              Pago mensual estimado:{" "}
              <strong>${Math.round((car.price * 1.12) / 60).toLocaleString("es-MX")} MXN</strong>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
