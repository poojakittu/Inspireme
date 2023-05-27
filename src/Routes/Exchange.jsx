import React, { useEffect, useState } from "react";

function ExchangeFormPage() {
  const [oldPhones, setOldPhones] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedBodyDamage, setSelectedBodyDamage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/old");
      const data = await response.json();
      setOldPhones(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleModelChange = (event) => {
    const selectedModel = event.target.value;
    setSelectedModel(selectedModel);
    const selectedPhone = oldPhones.find((phone) => phone.modelName === selectedModel);
    setSelectedBodyDamage(selectedPhone?.bodyDamage || "");
  };

  return (
    <div>
      <h1>Old Phones</h1>
      <select value={selectedModel} onChange={handleModelChange}>
        <option value="">Select a Model</option>
        {oldPhones.map((oldPhone, index) => (
          <option key={index} value={oldPhone.modelName}>
            {oldPhone.modelName}
          </option>
        ))}
      </select>
      {selectedModel && (
        <div>
          <h3>Selected Model: {selectedModel}</h3>
          <p>Body Damage: {selectedBodyDamage}</p>
        </div>
      )}
    </div>
  );
}



export default ExchangeFormPage;
