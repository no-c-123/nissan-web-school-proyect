import { useState } from "react";

export default function FinancingCalculator() {
  const [price, setPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [term, setTerm] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const handleCalculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(downPayment);
    const t = parseInt(term);
    const interestRate = 0.12 / 12; // 12% anual, mensualizada

    if (isNaN(p) || isNaN(d) || isNaN(t) || p <= 0 || d < 0 || t <= 0) {
      setMonthlyPayment(null);
      return;
    }

    const loanAmount = p - (p * (d / 100));
    const monthly = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -t));

    setMonthlyPayment(monthly.toFixed(2));
  };

  return (
    <div className="mt-12 bg-[#fff] p-6 rounded-lg shadow space-y-4">
      <h2 className="text-2xl font-semibold">Calculadora de Pago Estimado</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCalculate();
        }}
        className="grid md:grid-cols-3 gap-4 text-sm"
      >
        <input
          type="number"
          placeholder="Precio del auto"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border rounded px-4 py-2"
        />
        <input
          type="number"
          placeholder="Enganche (%)"
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
          className="border rounded px-4 py-2"
        />
        <input
          type="number"
          placeholder="Plazo (meses)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="border rounded px-4 py-2"
        />
        <button
          type="submit"
          className="md:col-span-3 bg-[#222] text-white py-2 rounded hover:bg-black transition"
        >
          Calcular
        </button>
      </form>

      {monthlyPayment && (
        <p className="text-lg text-gray-800">
          Pago mensual estimado:{" "}
          <strong>${parseFloat(monthlyPayment).toLocaleString("es-MX")} MXN</strong>
        </p>
      )}

      <p className="text-gray-600 text-sm">
        * Este cálculo es solo una estimación. Consulta con un asesor Nissan para más detalles.
      </p>
    </div>
  );
}
