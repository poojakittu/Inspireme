import React, { useEffect, useState } from "react";

const PageList1 = () => {
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Fetch the data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(`https://shy-puce-cheetah-hose.cyclic.app/product/allproductdata/646f19a6638b153b0f2bd637`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleColorSelection = (color) => {
    setSelectedColor(color);
    setCurrentImageIndex(0);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.phoneColour.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.phoneColour.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderImages = () => {
    const selectedPhoneColor = product.phoneColour.find(
      (color) => color.color === selectedColor
    );

    if (!selectedPhoneColor) {
      return null;
    }

    return (
      <div>
        <button onClick={handlePrevImage}>Previous</button>
        <img
          src={selectedPhoneColor[`img${currentImageIndex + 1}`]}
          alt="Phone"
        />
        <button onClick={handleNextImage}>Next</button>
      </div>
    );
  };

  return (
    <div>
      <h1>{product.title}</h1>
      <p>Price: {product.price}</p>
      <p>SubTitle: {product.subTitle}</p>
      <p>Brand: {product.brand}</p>

      <h2>Phone Colours</h2>
      <div>
        {product.phoneColour.map((color) => (
          <button
            key={color._id}
            onClick={() => handleColorSelection(color.color)}
          >
            {color.color}
          </button>
        ))}
      </div>

      <h2>Selected Image</h2>
      {renderImages()}

      <h2>Models</h2>
      {product.model.map((model) => (
        <div key={model._id}>
          <p>Display: {model.display}</p>
          <p>Per Month EMI: {model.perMonthEmi}</p>
          <p>Actual Price: {model.Actualprice}</p>
        </div>
      ))}

      <h2>Storage Options</h2>
      {product.storage.map((storage) => (
        <div key={storage._id}>
          <p>Phone Storage: {storage.phoneStorage}</p>
          <p>Per Month EMI: {storage.perMonthEmi}</p>
          <p>Actual Price: {storage.Actualprice}</p>
        </div>
      ))}
    </div>
  );
};

export default PageList1;
