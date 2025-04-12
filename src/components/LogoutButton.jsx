import { supabase } from "../lib/supabaseClient";

export default function LogoutButton() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error al cerrar sesión: " + error.message);
    } else {
      alert("Sesión cerrada correctamente.");
      window.location.href = "/signin";
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-[#666] hover:bg-black text-white px-4 py-2 rounded-lg font-semibold transition"
    >
      Cerrar sesión
    </button>
  );
}
