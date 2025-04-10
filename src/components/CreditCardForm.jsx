import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useSucursal } from "../context/SucursalContext";

export default function CreditCardForm() {
  const { sucursal } = useSucursal();

  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const [pagoExitoso, setPagoExitoso] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validación: solo números para ciertos campos
    if (["number", "expiry", "cvc"].includes(name)) {
      if (!/^\d*$/.test(value)) return;
    }

    // Límite de caracteres
    if (name === "number" && value.length > 16) return;
    if (name === "expiry" && value.length > 5) return;
    if (name === "cvc" && value.length > 3) return;

    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setCardInfo((prev) => ({ ...prev, focus: e.target.name }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      cardInfo.number.length === 16 &&
      cardInfo.name &&
      cardInfo.expiry.length === 4 &&
      cardInfo.cvc.length === 3
    ) {
      setPagoExitoso(true);
      setTimeout(() => setPagoExitoso(false), 3000);
    } else {
      alert("Por favor completa todos los campos correctamente.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#E8E8E8] rounded-xl shadow-md w-full max-w-lg mx-auto">
      <Cards
        number={cardInfo.number}
        name={cardInfo.name}
        expiry={cardInfo.expiry}
        cvc={cardInfo.cvc}
        focused={cardInfo.focus}
      />

      {pagoExitoso ? (
        <div className="text-center mt-6 bg-green-100 border border-green-400 p-4 rounded-xl w-full animate-fade-in">
          <div className="text-5xl mb-2 animate-bounce">✅</div>
          <h3 className="text-lg font-bold text-green-700">¡Pago exitoso!</h3>
          <p className="text-sm text-gray-700">Gracias por tu compra.</p>
          {sucursal && (
            <p className="text-xs mt-1 text-gray-600">
              Tu vehículo será asignado a <strong>{sucursal.nombre}</strong>
            </p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full mt-6 space-y-4">
          <input
            type="tel"
            name="number"
            placeholder="Número de tarjeta"
            value={cardInfo.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            maxLength={16}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="name"
            placeholder="Nombre en la tarjeta"
            value={cardInfo.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="w-full border px-4 py-2 rounded"
          />
          <div className="flex gap-2">
            <input
              type="tel"
              name="expiry"
              placeholder="MM/YY"
              value={cardInfo.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength={5}
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="tel"
              name="cvc"
              placeholder="CVC"
              value={cardInfo.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength={3}
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#666666] text-white py-2 rounded hover:bg-black"
          >
            Confirmar pago
          </button>
        </form>
      )}
    </div>
  );
}
