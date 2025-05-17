// src/pages/signin.jsx
import { supabase } from "../lib/supabaseClient";
import { useState, useEffect } from "react";


export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
  
      if (user) {
        const { data, error } = await supabase
          .from("profiles") // ✅ use correct table name
          .select("role")
          .eq("id", user.id)
          .single();
  
        if (error) {
          console.error("Error fetching role:", error.message);
        } else if (data) {
          setRole(data.role);
        }
      }
    };
  
    fetchUserRole();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

    if (error) {
      console.error("Login error:", error);
      alert("Error: " + error.message);
    } else {
      alert("¡Sesión iniciada!");
      window.location.href = "/";
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#d9d9d9] flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl p-10 rounded-xl w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>

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
          {loading ? "Entrando..." : "Entrar a mi Nissan"}
        </button>

        <p className="text-center text-sm text-gray-500">
          ¿No tienes cuenta?{" "}
          <a
            href="/register"
            className="text-[#666] font-medium underline hover:text-black"
          >
            Regístrate
          </a>
        </p>
        <p className="text-center text-sm text-gray-500">
          ¿Olvidaste tu contraseña?{" "}
          <a
            href="/resetPassword"
            className="text-[#666] font-medium underline hover:text-black"
          >
            Restaurala
          </a>
        </p>
      </form>
    </div>
  );
}
