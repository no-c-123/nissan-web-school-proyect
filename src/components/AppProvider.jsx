import { SucursalProvider } from "../context/SucursalContext";

export default function AppProvider({ children }) {
  return (
    <SucursalProvider>
      {children}
    </SucursalProvider>
  );
}