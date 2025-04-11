import { useState } from "react";
import SucursalFinder from "./SucursalFinder.jsx";

export default function CarQuote({ car }) {
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState("Efectivo");

  return (
    <>

      {!expanded && (
        <div
          className="bg-[#939393e9] rounded-xl shadow-inner-5xl cursor-pointer aspect-video flex flex-col items-center justify-center p-3 transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1.5 hover:shadow-xl"
          onClick={() => setExpanded(true)}
        >
          <img src={car.img} alt={car.name} className="w-44 h-44 object-contain mb-2" />
          <h2 className="text-md font-semibold text-center text-gray-800">{car.name}</h2>
          <p className="text-sm text-gray-700 text-center">
            Desde: ${car.price?.toLocaleString("es-MX") ?? "N/A"} MXN
          </p>
        </div>
      )}


      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          
          {/* Fondo oscuro que cierra si no es tarjeta */}
          <div
            className="absolute inset-0 backdrop-blur-md bg-black/40 transition-opacity duration-300"
            onClick={() => {
              if (tab !== "Tarjeta de Crédito") setExpanded(false);
            }}
          ></div>
          
          {/* Contenedor de la carta expandida */}
          <div
            className="relative bg-[#ababab] rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] mx-6 p-8 z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            
            
            <button
              onClick={() => {
                setExpanded(false);
              }}
              className="absolute top-4 right-4 text-white bg-[#666666] px-3 py-1 rounded hover:bg-black"
            >
              ✕ Cerrar
            </button>
            
            <img
              src={car.img}
              alt={car.name}
              className="w-64 mx-auto mb-4"
            />
            <h2 className="text-3xl font-bold text-center mb-2">{car.name}</h2>
            <p className="text-center text-gray-700 mb-6">
              Desde: ${car.price?.toLocaleString("es-MX") ?? "N/A"} MXN
            </p>

            {/* Tabs */}
            <div className="flex justify-center gap-3 mb-6">
              {["Efectivo", "Arrendamiento", "Financiamiento", "Tarjeta de Crédito"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    tab === t
                      ? "bg-[#4b4b4b] text-white"
                      : "bg-[#DADADA] text-gray-800 hover:bg-[#9C9C9C] hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Tab contenido */}
            {tab === "Tarjeta de Crédito" && (
              <div className="bg-[#ababab] p-4 rounded-xl space-y-4">
                <div className="space-y-1">
                  <p>Pago inicial: <strong>$0 MXN</strong></p>
                  <p>Plazo: 12 meses</p>
                  <p>Interés mensual: 3%</p>
                  <p className="text-lg">
                    Pago mensual estimado:{" "}
                    <strong>
                      ${car.price ? (car.price * 1.36 / 12).toFixed(0) : "N/A"} MXN
                    </strong>
                  </p>
                  <p className="text-sm text-gray-500">
                    Incluye comisión por procesamiento de tarjeta.
                  </p>
                </div>
                <SucursalFinder />
              </div>
            )}

            {tab !== "Tarjeta de Crédito" && (
              <div className="bg-[#E8E8E8] p-6 rounded-xl shadow-inner">
                {tab === "Efectivo" && (
                  <p className="text-lg text-center">
                    Pago único al contado:{" "}
                    <strong>${car.price?.toLocaleString("es-MX") ?? "N/A"} MXN</strong>
                  </p>
                )}

                {tab === "Arrendamiento" && (
                  <ul className="list-disc text-gray-800 pl-5 space-y-1">
                    <li>Enganche: $50,000</li>
                    <li>Plazo: 36 meses</li>
                    <li>Kilometraje anual: 15,000 km</li>
                    <li>Pago mensual: <strong>$10,500 MXN</strong></li>
                  </ul>
                )}

                {tab === "Financiamiento" && (
                  <ul className="list-disc text-gray-800 pl-5 space-y-1">
                    <li>Enganche: $80,000</li>
                    <li>Plazo: 60 meses</li>
                    <li>Tasa: 12%</li>
                    <li>Pago mensual: <strong>$13,800 MXN</strong></li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
