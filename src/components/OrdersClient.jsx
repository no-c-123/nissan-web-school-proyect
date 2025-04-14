import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { carCategories } from "../data/carCategories";

export default function OrdersClient() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/signin";
        return;
      }

      setUser(user);

      const { data, error } = await supabase
        .from("cotizaciones")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error cargando pedidos:", error);
      } else {
        setOrders(data);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  const getCarImage = (modeloSlug) => {
    for (const category of carCategories) {
      const match = category.cars.find((car) => car.slug === modeloSlug);
      if (match) return match.img;
    }
    return "/images/default.png"; // fallback si no se encuentra
  };

  if (loading) return <p className="text-center text-gray-500">Cargando tus pedidos...</p>;

  if (orders.length === 0) {
    return (
      <p className="text-center text-gray-600">
        No has hecho ningún pedido todavía.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.map((order) => (
        <div key={order.id} className="bg-white p-6 rounded-lg shadow">
          <img
            src={getCarImage(order.modelo)}
            alt={order.modelo}
            className="w-full h-40 object-contain mb-4"
          />
          <h3 className="text-xl font-bold mb-1">{order.modelo}</h3>
          <p className="text-gray-700">Sucursal: {order.sucursal}</p>
          <p className="text-gray-700">Método de pago: {order.metodo_pago}</p>
          <p className="text-gray-800 font-semibold mt-2">
            ${order.precio?.toLocaleString("es-MX")} MXN
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Pedido: {new Date(order.created_at).toLocaleString("es-MX")}
          </p>
        </div>
      ))}
    </div>
  );
}
