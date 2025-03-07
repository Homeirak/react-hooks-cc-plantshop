//NewPlantForm.js
import React, { useState } from "react";

function NewPlantForm({ addPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log("Form submitted. Checking values...");

    if (!formData.name.trim() || !formData.image.trim() || !formData.price.trim()) {
      console.error("All fields are required!");
      return;
    }

    const newPlant = {
      name: formData.name.trim(),
      image: formData.image.trim(),
      price: parseFloat(formData.price),
    };

    console.log("New plant object to send:", newPlant);

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Plant added successfully:", data);
        addPlant(data);
        setFormData({ name: "", image: "", price: "" });
      })
      .catch((error) => console.error("Error adding plant", error));
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Plant name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="image" 
          placeholder="Image URL" 
          value={formData.image} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="price" 
          step="0.01" 
          placeholder="Price" 
          value={formData.price} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;