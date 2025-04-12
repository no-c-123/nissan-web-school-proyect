import { useEffect, useState } from "react";
import { SucursalProvider } from "../context/SucursalContext.jsx";
import CarQuote from "./CarQuote.jsx";
import { carCategories } from '../data/carCategories'

export default function CarGrid() {
  const [filteredCars, setFilteredCars] = useState([]);
  const [viewingSingle, setViewingSingle] = useState(false);

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const modelParam = params.get("model");

  if (modelParam) {
    let match = null;
    for (const category of carCategories) {
      const found = category.cars.find(
        (car) => car.slug.toLowerCase() === modelParam.toLowerCase()
      );
      if (found) {
        match = found;
        break;
      }
    }

    if (match) {
      setFilteredCars([match]);
      setViewingSingle(true);
    } else {
      setFilteredCars([]);
      setViewingSingle(false);
    }
  } else {
    const allCars = carCategories.flatMap((cat) => cat.cars);
    console.log("➡️ Todos los vehículos:", allCars);
    setFilteredCars(allCars);
    setViewingSingle(false);
  }
}, []);

  const handleBack = () => {
    window.history.replaceState(null, "", "/models-page");
    const allCars = carCategories.flatMap((cat) => cat.cars);
    setFilteredCars(allCars);
    setViewingSingle(false);
  };

  return (
    <SucursalProvider>
        {filteredCars.length === 0 ? (
          <p className="text-center col-span-full text-red-500 font-semibold">
            Modelo no encontrado.
          </p>
        ) : (
          <div className=" flex flex-col gap-10">
            {carCategories.map((category) => (
              <div key={category.title}>
                <h2 className=" text-2xl font-bold mb-4 text-[#1f1f1f]">{category.title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.cars.map((car) => (
                    <CarQuote key={car.slug} car={car} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
    </SucursalProvider>
  );
}
