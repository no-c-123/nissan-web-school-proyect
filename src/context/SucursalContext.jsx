import { createContext, useContext, useState } from "react";

const SucursalContext = createContext();

export function SucursalProvider({ children }) {
  const [sucursal, setSucursal] = useState(null);
  return (
    <SucursalContext.Provider value={{ sucursal, setSucursal }}>
      {children}
    </SucursalContext.Provider>
  );
}

export function useSucursal() {
  const context = useContext(SucursalContext);
  if (!context) {
    throw new Error("useSucursal debe usarse dentro de un <SucursalProvider>");
  }
  return context;
}