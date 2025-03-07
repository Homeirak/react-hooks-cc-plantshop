//PlantCard
import React, { useEffect, useState } from "react";
import PlantList from "./PlantList";

function PlantCard({ plant, updatePlantPrice, deletePlant }) {
  const [soldOut, setSoldOut] =useState(false);
  const [newPrice, setNewPrice] = useState(plant.price);
  
  function handleToggleStock() {
    setSoldOut((prev) => !prev);
  }
  
  function handlePriceChange(e) {
    setNewPrice(e.target.value);
  }

  function handlePriceUpdate() {
    console.log("Updating price for:", plant.id, "New Price:", newPrice);

    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: parseFloat(newPrice) }),
    })
    .then((res) => {
      console.log("Response status:", res.status);
      return res.json();
    })
    .then((updatedPlant) => {
      console.log("Updated plant from server:", updatedPlant);
      updatePlantPrice(updatedPlant);
    })
    .catch((error) => console.error("Error updating price:", error));
}

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: $
        <input 
          type="number"
          step="0.01"
          value={newPrice}
          onChange={handlePriceChange}onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handlePriceUpdate();
            }
          }}        
        />
      </p>
      {soldOut ? (
	<button onClick={handleToggleStock}>Sold Out</button>
      ) : (
        <button className="primary" onClick={handleToggleStock}>In Stock</button>
      )}
      <button onClick={() => deletePlant(plant.id)} style={{ background: "red", color: "white" }}>
        Delete
      </button>
    </li>
  );
}

export default PlantCard;
