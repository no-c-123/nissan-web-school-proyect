import SucursalFinder from "./SucursalFinder";
import { SucursalProvider } from "../context/SucursalContext";

export default function SucursalWrapper() {
  return (
    <SucursalProvider>
      <SucursalFinder />
    </SucursalProvider>
  );
}
