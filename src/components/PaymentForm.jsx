import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function PaymentForm({ carList }) {
  const [car, setCar] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sucursal, setSucursal] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const model = new URLSearchParams(window.location.search).get("model");
    const allCars = carList.flatMap(cat => cat.cars);
    const found = allCars.find(c => c.slug === model);
    setCar(found || null);
  }, [carList]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/signin";
        return;
      }

      setUser({
        id: user.id,
        nombre: user.user_metadata?.full_name || "",
        email: user.email,
      });
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    const { error } = await supabase.from("cotizaciones").insert([
      {
        user_id: user.id,
        nombre: user.nombre,
        modelo: car.slug,
        email: user.email,
        metodo_pago: "Contado",
        precio: car.price,
        sucursal,
        comentarios,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Error al guardar el pedido:", error);
      alert("Hubo un problema al procesar tu pedido.");
    } else {
      setSuccess(true);
    }

    setEnviando(false);
  };

  if (loading) return <p className="text-center text-gray-500">Cargando usuario...</p>;
  if (!car) return <p className="text-red-500 text-center font-semibold">🚨 No se encontró el modelo solicitado.</p>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-lg shadow">
        <img src={car.img} alt={car.name} className="w-40 h-auto object-contain" />
        <div>
          <h2 className="text-2xl font-bold">{car.name}</h2>
          <p className="text-sm text-gray-500 mt-1">Precio estimado:</p>
          <p className="text-lg font-semibold text-[#222]">
            ${car.price.toLocaleString("es-MX")} MXN
          </p>
        </div>
      </div>

      {success ? (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-green-600">✅ Pedido enviado</h2>
          <p className="text-gray-700">Gracias por tu compra. Pronto recibirás una confirmación en tu correo.</p>
          <a href="/" className="inline-block mt-4 bg-[#222] text-white px-6 py-3 rounded-lg hover:bg-black transition">
            Volver al inicio
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
            <input
              type="text"
              value={user.nombre}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sucursal</label>
            <select
              value={sucursal}
              onChange={(e) => setSucursal(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            >
              <option value="" disabled>Selecciona una sucursal</option>
              <option value="san-jeronimo">San Jerónimo, Monterrey</option>
              <option value="garza-sada">Garza Sada, Monterrey</option>
              <option value="lincoln">Lincoln, Monterrey</option>
              <option value="sendero">Sendero, Escobedo</option>
              <option value="cumbres">Cumbres, Monterrey</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Comentarios</label>
            <textarea
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              placeholder="Información adicional..."
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            ></textarea>
          </div>

          <div className="col-span-2 pt-4 border-t">
            <button
              type="submit"
              disabled={enviando}
              className="w-full bg-[#222] hover:bg-black text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center"
            >
              {enviando ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                  </svg>
                  Enviando...
                </div>
              ) : (
                "Finalizar pedido"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
