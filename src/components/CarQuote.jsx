import { useState } from "react";
import SucursalFinder from "./SucursalFinder.jsx";

export default function CarQuote({ car }) {
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState("Efectivo");

  return (
    <>
      {/* Compact square card */}
      {!expanded && (
        <div
          className="bg-[#939393e9] rounded-xl shadow-inner-5xl cursor-pointer aspect-video flex flex-col items-center justify-center p-3 transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1.5 hover:shadow-xl"
          onClick={() => setExpanded(true)}
        >
          <img src={car.image} alt={car.name} className="w-44 h-44 object-contain mb-2" />
          <h2 className="text-md font-semibold text-center text-gray-800">{car.name}</h2>
          <p className="text-sm text-gray-700 text-center">
            Desde: ${car.basePrice.toLocaleString("es-MX")} MXN
          </p>
        </div>
      )}

      {/* Fullscreen Overlay */}
      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          
          {/* Fondo oscuro */}
          <div
            className="absolute inset-0 backdrop-blur-md bg-black/40 transition-opacity duration-300"
            onClick={() => setExpanded(false)}
          ></div>

          {/* Contenido de la carta expandida */}
          <div
            className="relative bg-[#ababab] rounded-xl shadow-xl max-w-3xl w-full mx-6 p-8 z-50 animate-zoomIn transition-transform duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-4 right-4 text-white bg-[#666666] px-3 py-1 rounded hover:bg-black"
            >
              ✕ Cerrar
            </button>

            <img
              src={car.image}
              alt={car.name}
              className="w-64 mx-auto mb-4 transition-transform duration-500"
            />
            <h2 className="text-3xl font-bold text-center mb-2">{car.name}</h2>
            <p className="text-center text-gray-700 mb-6">
              Desde: ${car.basePrice.toLocaleString("es-MX")} MXN
            </p>

            {/* Tabs */}
            <div className="flex justify-center gap-3 mb-6">
              {["Efectivo", "Arrendamiento", "Financiamiento", "Tarjeta de Crédito"].map((t) => (
                <button
                  key={t}
                  type="button"
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

            {/* Contenido de pestañas */}
            {tab === "Tarjeta de Crédito" && (
              <div
                className="bg-[#ababab] p-4 rounded-xl shadow-md"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="mb-1">Pago inicial: <strong>$0 MXN</strong></p>
                <p className="mb-1">Plazo: 12 meses</p>
                <p className="mb-1">Interés mensual: 3%</p>
                <p className="mt-2 text-lg">
                  Pago mensual estimado:{" "}
                  <strong>${(car.basePrice * 1.36 / 12).toFixed(0)} MXN</strong>
                </p>
                <p className="text-sm text-gray-500 mt-1 mb-3">
                  Incluye comisión por procesamiento de tarjeta.
                </p>

                {/* 🔐 Error Boundary o manejo defensivo */}
                <SucursalFinder />
              </div>
              
            )}

            {tab === "Efectivo" && (
              <div className="bg-[#E8E8E8] p-6 rounded-xl shadow-inner">
                <p className="text-lg text-center">
                  Pago único al contado:{" "}
                  <strong>${car.basePrice.toLocaleString("es-MX")} MXN</strong>
                </p>
              </div>
            )}

            {tab === "Arrendamiento" && (
              <div className="bg-[#E8E8E8] p-6 rounded-xl shadow-inner">
                <ul className="list-disc text-gray-800 pl-5 space-y-1">
                  <li>Enganche: $50,000</li>
                  <li>Plazo: 36 meses</li>
                  <li>Kilometraje anual: 15,000 km</li>
                  <li>Pago mensual: <strong>$10,500 MXN</strong></li>
                </ul>
              </div>
            )}

            {tab === "Financiamiento" && (
              <div className="bg-[#E8E8E8] p-6 rounded-xl shadow-inner">
                <ul className="list-disc text-gray-800 pl-5 space-y-1">
                  <li>Enganche: $80,000</li>
                  <li>Plazo: 60 meses</li>
                  <li>Tasa: 12%</li>
                  <li>Pago mensual: <strong>$13,800 MXN</strong></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
