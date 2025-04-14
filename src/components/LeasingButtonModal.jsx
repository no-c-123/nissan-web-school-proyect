import { useState, useEffect, useRef } from "react";

export default function ExpandableLeasingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [initialPos, setInitialPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowContent(true), 600);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  const handleOpen = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    setInitialPos({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
    setIsOpen(true);
  };

  return (
    <>
      {/* Botón inicial */}
      {!isOpen && (
        <div className="flex justify-center">
          <button
            ref={buttonRef}
            onClick={handleOpen}
            className="w-48 h-14 rounded-full bg-white text-black text-lg font-semibold shadow transition hover:scale-105"
          >
            Explorar leasing
          </button>
        </div>
      )}

      {/* Fondo oscuro */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Modal animado centrado */}
      {isOpen && (
        <div
          className={`fixed z-50 bg-white shadow-2xl animate-expand-sequence overflow-hidden`}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "720px",
            height: "80vh",
            borderRadius: "1.5rem",
            padding: "2rem",
          }}
        >
          {showContent && (
            <div className="opacity-0 animate-fade-in h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-center">Explora Nissan Leasing</h2>
                <p className="text-center text-gray-700 mt-2">
                  Disfruta de la flexibilidad de cambiar tu Nissan cada 2 o 3 años. Ideal para quienes quieren lo más nuevo, siempre.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Pagos mensuales bajos</li>
                    <li>Renovación rápida</li>
                    <li>Seguro incluido</li>
                    <li>Mantenimiento gratis</li>
                  </ul>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Asistencia 24/7</li>
                    <li>Sin preocupaciones por depreciación</li>
                    <li>Ideal para flotas</li>
                    <li>Conectividad total</li>
                  </ul>
                </div>
              </div>

              <button
                className="mt-8 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                onClick={() => setIsOpen(false)}
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes expand-sequence {
          0% {
            transform: scale(0.1) translate(-50%, -50%);
            opacity: 0;
            border-radius: 9999px;
          }
          50% {
            transform: scale(1.05) translate(-50%, -50%);
            opacity: 0.7;
            border-radius: 1rem;
          }
          100% {
            transform: scale(1) translate(-50%, -50%);
            opacity: 1;
            border-radius: 1.5rem;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-expand-sequence {
          animation: expand-sequence 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
}
