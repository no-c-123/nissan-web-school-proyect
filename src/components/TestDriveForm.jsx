import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { carCategories } from "../data/carCategories";

export default function TestDriveForm() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sucursal, setSucursal] = useState("");
  const [modelo, setModelo] = useState("");
  const [fecha, setFecha] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

    const { error } = await supabase.from("test_drives").insert([{
      user_id: user.id,
      nombre: user.nombre,
      email: user.email,
      modelo,
      sucursal,
      fecha,
      mensaje,
      created_at: new Date().toISOString(),
    }]);

    if (error) {
      alert("Hubo un error al solicitar tu prueba de manejo.");
      console.error(error);
    } else {
      setSuccess(true);
    }

    setEnviando(false);
  };

  if (loading) return <p className="text-center text-gray-500">Cargando usuario...</p>;

  if (success) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-green-600">✅ Prueba de manejo agendada</h2>
        <p className="text-gray-700">Pronto recibirás confirmación en tu correo.</p>
        <a href="/" className="inline-block mt-4 bg-[#222] text-white px-6 py-3 rounded-lg hover:bg-black transition">
          Volver al inicio
        </a>
      </div>
    );
  }

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white max-w-4xl w-full p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >✕</button>
            <h2 className="text-xl font-bold mb-4">Selecciona un modelo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {carCategories.flatMap(cat => cat.cars).map((car) => (
                <button
                  key={car.slug}
                  onClick={() => {
                    setModelo(car.name);
                    setShowModal(false);
                  }}
                  className="border rounded-lg p-3 hover:shadow-lg transition bg-gray-50 text-left"
                >
                  <img src={car.img} alt={car.name} className="w-full h-28 object-contain mb-2" />
                  <p className="font-semibold">{car.name}</p>
                  <p className="text-sm text-gray-600">Desde ${car.price.toLocaleString("es-MX")} MXN</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input type="text" value={user.nombre} readOnly className="w-full px-4 py-2 bg-gray-100 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Correo</label>
          <input type="email" value={user.email} readOnly className="w-full px-4 py-2 bg-gray-100 border rounded" />
        </div>

        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1 flex justify-between items-center">
            Modelo que deseas probar
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-sm font-normal text-blue-600 hover:underline"
            >
              Ver modelos disponibles
            </button>
          </label>
          <input
            type="text"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            placeholder="Ej. Sentra, Kicks, etc."
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sucursal</label>
          <select
            value={sucursal}
            onChange={(e) => setSucursal(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="">Selecciona una sucursal</option>
            <option value="san-jeronimo">San Jerónimo</option>
            <option value="garza-sada">Garza Sada</option>
            <option value="lincoln">Lincoln</option>
            <option value="sendero">Sendero</option>
            <option value="cumbres">Cumbres</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fecha deseada</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Comentarios</label>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Opcional: detalles adicionales..."
            className="w-full px-4 py-2 border rounded"
            rows="3"
          />
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="w-full bg-[#222] hover:bg-black text-white font-semibold py-3 rounded transition"
        >
          {enviando ? "Agendando..." : "Agendar prueba de manejo"}
        </button>
      </form>
    </>
  );
}
