// ✅ src/components/CreditCardForm.jsx
import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

export default function CreditCardForm() {
  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const handleInputFocus = (e) => {
    setCardInfo({ ...cardInfo, focus: e.target.name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pago enviado correctamente. ¡Gracias por tu compra!");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#E8E8E8] rounded-xl shadow-md max-w-md mx-auto mt-8">
      <Cards
        number={cardInfo.number}
        name={cardInfo.name}
        expiry={cardInfo.expiry}
        cvc={cardInfo.cvc}
        focused={cardInfo.focus}
      />

      <form onSubmit={handleSubmit} className="w-full mt-6 space-y-4">
        {/* Número de tarjeta */}
        <input
          type="tel"
          name="number"
          placeholder="Número de tarjeta"
          value={cardInfo.number}
          onChange={(e) => {
            const cleaned = e.target.value.replace(/\D/g, "").slice(0, 16);
            handleInputChange({ target: { name: "number", value: cleaned } });
          }}
          onFocus={handleInputFocus}
          className="w-full border px-4 py-2 rounded"
          maxLength={19}
          inputMode="numeric"
          pattern="[0-9]*"
        />

        {/* Nombre del titular */}
        <input
          type="text"
          name="name"
          placeholder="Nombre en la tarjeta"
          value={cardInfo.name}
          onChange={(e) => {
            const cleaned = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "").slice(0, 26);
            handleInputChange({ target: { name: "name", value: cleaned } });
          }}
          onFocus={handleInputFocus}
          className="w-full border px-4 py-2 rounded"
          maxLength={26}
        />

        <div className="flex gap-2">
          {/* Expiry */}
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={cardInfo.expiry}
            onChange={(e) => {
              let val = e.target.value.replace(/\D/g, "").slice(0, 4);
              if (val.length >= 3) val = `${val.slice(0, 2)}/${val.slice(2)}`;
              handleInputChange({ target: { name: "expiry", value: val } });
            }}
            onFocus={handleInputFocus}
            className="w-full border px-4 py-2 rounded"
            maxLength={5}
            inputMode="numeric"
          />

          {/* CVC */}
          <input
            type="tel"
            name="cvc"
            placeholder="CVC"
            value={cardInfo.cvc}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/\D/g, "").slice(0, 4);
              handleInputChange({ target: { name: "cvc", value: cleaned } });
            }}
            onFocus={handleInputFocus}
            className="w-full border px-4 py-2 rounded"
            maxLength={4}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#666666] text-white py-2 rounded hover:bg-black"
        >
          Confirmar pago
        </button>
      </form>
    </div>
  );
}
