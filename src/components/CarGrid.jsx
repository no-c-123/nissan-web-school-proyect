import { SucursalProvider } from "../context/SucursalContext.jsx";
import CarQuote from "./CarQuote.jsx";
import { cars } from "../data/cars";

export default function CarGrid() {
  return (
    <SucursalProvider>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarQuote key={car.name} car={car} />
        ))}
      </div>
    </SucursalProvider>
  );
}
