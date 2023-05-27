import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OldPhonePage = () => {
  const [oldphoneNames, setOldphoneNames] = useState([]);
  const [selectedOldphoneName, setSelectedOldphoneName] = useState('');
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');

  useEffect(() => {
    // Fetch the old phone names from the server
    fetchOldPhoneNames();
  }, []);

  useEffect(() => {
    // Fetch the models for the selected old phone
    if (selectedOldphoneName) {
      fetchModels(selectedOldphoneName);
    }
  }, [selectedOldphoneName]);

  const fetchOldPhoneNames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/old/');
      const oldPhoneNames = response.data.map((oldPhone) => oldPhone.oldphoneName);
      setOldphoneNames(oldPhoneNames);
      setSelectedOldphoneName(oldPhoneNames[0]); // Set the default selected oldphoneName
    } catch (error) {
      console.log(error);
    }
  };

  const fetchModels = async (oldphoneName) => {
    try {
      const response = await axios.get(`http://localhost:5000/old/old/${oldphoneName}`);
      const selectedOldPhone = response.data.find((oldPhone) => oldPhone.oldphoneName === oldphoneName);
      const models = selectedOldPhone.model.map((model) => model.modelName);
      setModels(models);
      setSelectedModel(models[0]); // Set the default selected model
    } catch (error) {
      console.log(error);
    }
  };

  const handleOldPhoneChange = (event) => {
    const selectedOldphoneName = event.target.value;
    setSelectedOldphoneName(selectedOldphoneName);
  };

  const handleModelChange = (event) => {
    const selectedModelName = event.target.value;
    setSelectedModel(selectedModelName);
  };

  return (
    <div>
      <h1>Old Phone Page</h1>
      <label htmlFor="oldphoneName">Select Old Phone:</label>
      <select id="oldphoneName" value={selectedOldphoneName} onChange={handleOldPhoneChange}>
        {/* Map the old phone names as options */}
        {oldphoneNames.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>

      <label htmlFor="model">Select Model:</label>
      <select id="model" value={selectedModel} onChange={handleModelChange}>
        {/* Map the models as options */}
        {models.map((model) => (
          <option key={model} value={model}>{model}</option>
        ))}
      </select>

      {/* Display the selected old phone and model */}
      <h2>Selected Old Phone: {selectedOldphoneName}</h2>
      <h2>Selected Model: {selectedModel}</h2>
    </div>
  );
};

export default OldPhonePage;
