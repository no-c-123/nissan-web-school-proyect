import { useState } from "react";
import SucursalFinder from "./SucursalFinder.jsx";

export default function CarQuote({ car }) {
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState("Efectivo");

  return (
    <>
        <a
          href={`/cotizar/${car.slug}`}
          className="bg-[#dcdcdc00] rounded-xl cursor-pointer aspect-video flex flex-col items-center justify-center p-3 transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1.5 hover:shadow-xl"
        >
          <img src={car.img} alt={car.name} className="w-44 h-44 object-contain mb-2" />
          <h2 className="text-2xl font-bold mb-4 text-[#1f1f1f]">{car.name}</h2>
          <p className="text-sm text-gray-700 text-center">
            Desde: ${car.price?.toLocaleString("es-MX") ?? "N/A"} MXN
          </p>
        </a>
    </>
  );
}
