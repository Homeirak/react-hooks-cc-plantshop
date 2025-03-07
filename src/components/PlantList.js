//PlantList.js
import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, updatePlantPrice, deletePlant }) {
  return (
    <ul className="cards">
      {plants.length === 0 ? (  
        <p>No Plants to display.</p>
      ) : (
        plants.map((plant) => (
          <PlantCard 
            key={plant.id} 
            plant={plant}
            updatePlantPrice={updatePlantPrice}
            deletePlant={deletePlant}
          />
        ))
      )}
    </ul>  
  );
}

export default PlantList;
