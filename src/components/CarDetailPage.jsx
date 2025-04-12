import { useState } from "react";
import SucursalFinder from "./SucursalFinder.jsx";

export default function CarDetailPage({ car }) {
  const [tab, setTab] = useState("Especificaciones");

  return (
    <main className="max-w-5xl mx-auto py-12 px-6 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-4">{car.name}</h1>
      <img src={car.img} alt={car.name} className="w-96 mx-auto mb-6 rounded-xl shadow-xl" />

      <p className="text-center text-xl mb-8">
        Desde: <span className="font-semibold">${car.price.toLocaleString("es-MX")} MXN</span>
      </p>

      {/* Tabs */}
      <div className="flex justify-center gap-3 mb-6">
        {["Especificaciones", "Cotización", "Galería"].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
              tab === item
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Contenido de pestañas */}
      <section className="bg-white rounded-xl shadow-md p-6">
        {tab === "Especificaciones" && (
          <ul className="list-disc pl-5 space-y-2 text-lg">
            <li><strong>Motor:</strong> {car.specs?.motor || "No especificado"}</li>
            <li><strong>Transmisión:</strong> {car.specs?.transmision || "No especificado"}</li>
            <li><strong>Potencia:</strong> {car.specs?.hp || "No especificado"}</li>
            <li><strong>Tracción:</strong> {car.specs?.traccion || "No especificado"}</li>
            <li><strong>Seguridad:</strong> {car.specs?.seguridad || "No especificado"}</li>
          </ul>
        )}

        {tab === "Cotización" && (
          <div className="space-y-4">
            <p><strong>Pago único:</strong> ${car.price.toLocaleString("es-MX")} MXN</p>
            <p><strong>Financiamiento (60 meses):</strong> ${Math.round(car.price * 1.12 / 60).toLocaleString("es-MX")} MXN/mes</p>
            <p><strong>Arrendamiento (36 meses):</strong> $11,500 MXN/mes</p>
            <SucursalFinder />
          </div>
        )}

        {tab === "Galería" && (
          <div className="grid grid-cols-2 gap-4">
            <img src={car.img} alt="Vista principal" className="rounded-lg" />
            <img src={car.img} alt="Vista secundaria" className="rounded-lg opacity-60" />
          </div>
        )}
      </section>
    </main>
  );
}
