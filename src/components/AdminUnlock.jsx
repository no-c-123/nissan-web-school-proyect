// src/components/AdminUnlock.jsx
import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AdminUnlock() {
  useEffect(() => {
    const input = [];
    const sequence = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a"
    ];

    const handler = async (e) => {
      input.push(e.key);
      if (input.length > sequence.length) input.shift();

      if (sequence.every((v, i) => v === input[i])) {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error: roleError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (data?.role === "admin") {
          window.location.href = "/admin-dashboard";
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return null;
}
