// src/components/AdminUnlock.jsx
import { useEffect } from "react";

export default function AdminUnlock() {
  useEffect(() => {
    const input = [];
    const sequence = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a"
    ];

    const handler = (e) => {
      input.push(e.key);
      if (input.length > sequence.length) input.shift();

      if (sequence.every((v, i) => v === input[i])) {
        window.location.href = "/admin-dashboard"; // Redirige al panel admin
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return null; // No renderiza nada, solo escucha teclas
}
