import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { carCategories } from "../data/carCategories";

export default function OrdersCarousel() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      setUser(user);

      const { data, error } = await supabase
        .from("cotizaciones")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error al obtener pedidos:", error);
      } else {
        setOrders(data);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  const getCarImage = (slug) => {
    for (const category of carCategories) {
      const match = category.cars.find((car) => car.slug === slug);
      if (match) return match.img;
    }
    return "/images/default.png";
  };

  if (loading || !user) return null;
  if (orders.length === 0) return null;

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4 text-center">Tus pedidos recientes</h2>
      <div className="flex justify-center items-center overflow-x-auto whitespace-nowrap space-x-4 px-4 pb-2">
        {orders.map((order) => (
          <div
            key={order.id}
            className="group transition-all duration-300 ease-in-out bg-[#ededed] w-64 rounded-lg shadow p-4 flex-shrink-0 text-center transform hover:scale-95 hover:shadow-xl hover:bg-[#ffffff]"
          >
            <img
              src={getCarImage(order.modelo)}
              alt={order.modelo}
              className="w-full h-36 object-contain mb-3"
            />
            <h3 className="text-lg font-semibold text-black">{order.modelo}</h3>
            <p className="text-sm text-black/55 group-hover:text-black">Sucursal: {order.sucursal}</p>
            <p className="text-sm text-black/55 group-hover:text-black">Pago: {order.metodo_pago}</p>
            <p className="text-md font-bold mt-1 text-black group-hover:text-black">
              ${order.precio.toLocaleString("es-MX")} MXN
            </p>
            <p className="text-xs text-black/40 mt-2 group-hover:text-black">
              {new Date(order.created_at).toLocaleDateString("es-MX")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
