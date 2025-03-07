//PlantPage.js
import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const PlantPage = () => {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data from API:", data);  
        setPlants(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log("plants state in PlantPage:", plants);

  function addPlant(newPlant) {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  }

  function updatePlantPrice(updatedPlant) {
    console.log("🔄 Updating state with:", updatedPlant);
  
    setPlants((prevPlants) => {
      const newState = prevPlants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      );
      console.log("🌱 New plants state:", newState);
      return newState;
    });
  }

  function deletePlant(id) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
    .then(() => {
      setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
    });
  }

  const filteredPlants = plants.filter((plant) => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <main>
      <NewPlantForm addPlant={addPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList plants={filteredPlants} updatePlantPrice={updatePlantPrice} deletePlant={deletePlant} />
    </main>
  );
}

export default PlantPage;


//console.log("Fetched Data in Plants:", data);
//{plants.length === 0 ? (<p>No Plants to display.</p>) : (plants.map((plant) => <PlantCard key={plant.id} plant={plant} />))}