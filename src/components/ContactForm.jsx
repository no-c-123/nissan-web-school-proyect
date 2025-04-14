import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [success, setSuccess] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const obtenerUsuario = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setNombre(user.user_metadata?.full_name || "");
        setEmail(user.email || "");
      }
    };

    obtenerUsuario();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    const { error } = await supabase.from("contactos").insert([
      {
        nombre,
        email,
        mensaje,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      alert("Error al enviar tu mensaje.");
      console.error(error);
    } else {
      setSuccess(true);
      setMensaje(""); // Limpiar mensaje
    }

    setEnviando(false);
  };

  if (success) {
    return (
      <div className="text-center mt-6 space-y-3">
        <h2 className="text-2xl font-bold text-green-600">✅ Mensaje enviado</h2>
        <p className="text-gray-700">Gracias por contactarnos. Te responderemos pronto.</p>
        <a href="/" className="inline-block mt-3 bg-[#222] text-white px-6 py-3 rounded hover:bg-black transition">
          Volver al inicio
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-[500px] mx-auto space-y-4 text-left">
      <div>
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          type="text"
          value={nombre}
          readOnly
          className="w-full px-4 py-2 bg-gray-100 border rounded text-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Correo electrónico</label>
        <input
          type="email"
          value={email}
          readOnly
          className="w-full px-4 py-2 bg-gray-100 border rounded text-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mensaje</label>
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
          rows="4"
          placeholder="Escribe tu mensaje..."
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="w-full bg-[#222] hover:bg-black text-white font-semibold py-3 rounded transition"
      >
        {enviando ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
