import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sessionRestored, setSessionRestored] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (access_token && refresh_token) {
      supabase.auth
        .setSession({ access_token, refresh_token })
        .then(({ error }) => {
          if (error) {
            alert("No se pudo restaurar la sesión de recuperación.");
          } else {
            setSessionRestored(true);
          }
        });
    } else {
      alert("Faltan parámetros de recuperación en el enlace.");
    }
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error("Error updating password:", error);
      alert("Error al actualizar la contraseña: " + error.message);
    } else {
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#d9d9d9] flex items-center justify-center px-4">
      <form
        onSubmit={handleUpdatePassword}
        className="bg-white shadow-xl p-10 rounded-xl w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">
          {success ? "¡Contraseña actualizada!" : "Nueva contraseña"}
        </h1>

        {!success && sessionRestored && (
          <>
            <div className="inputbox">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>Nueva contraseña</span>
              <i></i>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#666] hover:bg-black text-white font-semibold rounded-lg transition"
            >
              {loading ? "Actualizando..." : "Actualizar contraseña"}
            </button>
          </>
        )}

        {success && (
          <p className="text-center text-sm text-gray-600">
            Ahora puedes{" "}
            <a
              href="/signin"
              className="text-[#666] font-medium underline hover:text-black"
            >
              iniciar sesión
            </a>{" "}
            con tu nueva contraseña.
          </p>
        )}
      </form>
    </div>
  );
}
