// src/components/PaymentForm.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function PaymentForm({ car }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/signin";
        return;
      }

      setUser({
        nombre: user.user_metadata.full_name || "",
        email: user.email,
        telefono: user.user_metadata.phone || ""
      });
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando usuario...</p>;
  }

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
        <input
          type="tel"
          value={user.telefono}
          readOnly
          className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
        />
      </div>

      <div className="col-span-2 md:col-span-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Sucursal</label>
        <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
          <option disabled selected>Selecciona una sucursal</option>
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
          placeholder="Información adicional..."
          rows="3"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        ></textarea>
      </div>
    </form>
  );
}