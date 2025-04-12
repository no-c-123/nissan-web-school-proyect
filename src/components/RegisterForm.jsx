import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(""); // Limpiar mensaje de error
    console.log("🔥 Formulario enviado");
    
    // Validación básica
    if (!email || !password || !name) {
      setErrorMsg("Por favor completa todos los campos.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        setErrorMsg("❌ " + error.message);
        setLoading(false);
        return;
      }

      alert("✅ Registro exitoso. Revisa tu correo para confirmar.");
      window.location.href = "/signin";
    } catch (err) {
      setErrorMsg("Error inesperado: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#d9d9d9] flex items-center justify-center px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-xl p-10 rounded-xl w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Crear cuenta</h1>

        {errorMsg && (
          <p className="text-center text-red-500 font-medium">{errorMsg}</p>
        )}

        <div className="inputbox">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span>Nombre completo</span>
          <i></i>
        </div>

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

        <div className="inputbox">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Contraseña</span>
          <i></i>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#666] hover:bg-black text-white font-semibold rounded-lg transition"
        >
          {loading ? "Creando cuenta..." : "Registrarme"}
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
