import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function NavbarActions() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/signin";
  };

  return (
    <div className="flex items-center gap-4 ml-4">
      {/* FAQ Button */}
      <button className="text-[#2e2e2e] p-2 rounded-full hover:bg-white transition" aria-label="FAQ">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-[#2e2e2e] hover:stroke-[#666666] transition-all duration-300 transform hover:-translate-y-[3px]" fill="none" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M12 14a4 4 0 10-4-4h4a2 2 0 012 2v0a2 2 0 01-2 2z" />
        </svg>
      </button>

      {/* Language Selector */}
      <button className="text-[#2e2e2e] p-2 rounded-full hover:bg-white transition" aria-label="Change Language">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-[#2e2e2e] hover:stroke-[#666666] transition-all duration-300 transform hover:-translate-y-[3px]" fill="none" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m0 14v1m7-7h1M4 12H3m15.364-6.364l.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707.707M6.343 6.343l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      </button>

      {/* User Icon or Logout */}
      {user ? (
        <button
          onClick={handleLogout}
          className="text-[#2e2e2e] px-4 py-2 bg-white hover:bg-[#f0f0f0] rounded-lg transition text-sm font-medium"
        >
          Cerrar sesión
        </button>
        
      ) : (
        <a href="/signin" className="text-[#2e2e2e] p-2 rounded-full hover:bg-white transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-[#2e2e2e] hover:stroke-[#666666] transition-all duration-300 transform hover:-translate-y-[3px]" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
        </a>
      )}
    </div>
  );
}
