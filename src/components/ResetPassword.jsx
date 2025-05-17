import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
  
    if (!email) {
      alert("Por favor ingresa tu correo electrónico.");
      return;
    }
  
    setLoading(true);
  
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: "http://localhost:4321/update-password", // hardcoded for dev
      });
  
      if (error) {
        console.error("Error:", error);
        alert("Error al enviar correo de recuperación: " + error.message);
      } else {
        alert("Correo de recuperación enviado. Revisa tu bandeja de entrada.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Algo salió mal. Intenta nuevamente.");
    }
  
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#d9d9d9] flex items-center justify-center px-4">
      <form
        onSubmit={handleReset}
        className="bg-white shadow-xl p-10 rounded-xl w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Restablecer contraseña</h1>

        <div className="inputbox">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Correo electrónico</span>
          <i></i>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#666] hover:bg-black text-white font-semibold rounded-lg transition"
        >
          {loading ? "Enviando..." : "Enviar correo de recuperación"}
        </button>

        <p className="text-center text-sm text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/signin"
            className="text-[#666] font-medium underline hover:text-black"
          >
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
}
