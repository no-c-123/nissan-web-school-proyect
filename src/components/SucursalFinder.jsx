import { useState, useEffect } from "react";
import { branches } from "../data/branches";
import { useSucursal } from "../context/SucursalContext";
import CreditCardForm from "./CreditCardForm.jsx";

export default function SucursalFinder() {
  const [cp, setCp] = useState("");
  const [result, setResult] = useState(null);
  const { setSucursal } = useSucursal();

  useEffect(() => {
    const savedCp = localStorage.getItem("cp");
    console.log("CP recuperado:", savedCp); // Debug
    if (savedCp) setCp(savedCp);
  }, []);

  useEffect(() => {
    localStorage.setItem("cp", cp);
  }, [cp]);

  const buscarSucursal = () => {
    const enteredCp = cp.trim();
    const enteredNumber = parseInt(enteredCp);

    if (isNaN(enteredNumber) || enteredNumber < 64000 || enteredNumber > 67999) {
      setResult({ notFound: true, fueraDeNL: true });
      return;
    }

    const exactMatch = branches.find((s) => s.cp === enteredCp);

    if (exactMatch) {
      setResult(exactMatch);
      setSucursal(exactMatch);
    } else {
      const closest = branches.reduce((prev, curr) => {
        const prevDiff = Math.abs(parseInt(prev.cp) - enteredNumber);
        const currDiff = Math.abs(parseInt(curr.cp) - enteredNumber);
        return currDiff < prevDiff ? curr : prev;
      });
      const approx = { ...closest, aproximado: true };
      setResult(approx);
      setSucursal(approx);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto my-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Busca tu sucursal Nissan en Monterrey</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Código Postal"
          className="flex-grow border border-gray-400 px-4 py-2 rounded"
          value={cp}
          onChange={(e) => setCp(e.target.value)}
        />
        <button
          onClick={buscarSucursal}
          className="bg-[#666666] text-white px-4 py-2 rounded hover:bg-black"
        >
          Buscar
        </button>
      </div>

      {result && !result.notFound && (
        <div className="bg-[#E8E8E8] p-4 rounded text-center">
          {result.aproximado && (
            <p className="text-sm text-yellow-600 font-medium mb-1">
              No encontramos una coincidencia exacta. Mostrando sucursal más cercana:
            </p>
          )}
          <p className="font-semibold">{result.nombre}</p>
          <p>{result.direccion}</p>
          <p>CP: {result.cp}</p>

          {/* Renderiza el formulario de tarjeta */}
          <div className="mt-6">
            <CreditCardForm />
          </div>
        </div>
      )}

      {result?.notFound && result?.fueraDeNL && (
        <p className="text-red-600 text-center font-semibold">
          El código postal ingresado no pertenece a Nuevo León.
        </p>
      )}

      {result?.notFound && !result?.fueraDeNL && (
        <p className="text-red-600 text-center font-semibold">
          No se encontró una sucursal con ese código postal.
        </p>
      )}
    </div>
  );
}