// src/components/UserServices.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function UserServices() {
  const [user, setUser] = useState(null);
  const [testDrives, setTestDrives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUser(user);

      const { data: drives } = await supabase
        .from("test_drives")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setTestDrives(drives || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (!user || loading) return null;
  if (testDrives.length === 0) return null;

  return (
    <section className="flex-col justify-center mt-16 px-6">
      <h2 className="text-2xl font-bold mb-4 text-[#2e2e2e] text-center">Tus pruebas de manejo agendadas</h2>
      <div className="flex justify-center items-center w-full h-[200px] overflow-x-auto gap-4 px-4">
        {testDrives.map((td) => (
          <div key={td.id} className="min-w-[250px] bg-white rounded-lg p-4 hover:shadow-2xl hover:bg-[#e9e9e9] transition-all ease-in-out hover:scale-105">
            <h3 className="text-lg font-semibold">{td.modelo}</h3>
            <p className="text-sm text-gray-700">Sucursal: {td.sucursal}</p>
            <p className="text-sm text-gray-700">Fecha: {new Date(td.fecha).toLocaleDateString("es-MX")}</p>
            <p className="text-xs text-gray-400 mt-2">Agendado el: {new Date(td.created_at).toLocaleString("es-MX")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
