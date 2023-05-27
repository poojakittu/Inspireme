import React, { useState } from "react";
import PhotoButton from "./PhotoButton";

const PhotoButton1 = ({ colors }) => {
    console.log({colors})
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
  
    const handleColorClick = (color, image) => {
      setSelectedColor(color);
      setSelectedImage(image);
    };
  
    return (
      <div>
        <h2>Select Color:</h2>
        <div>
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorClick(color.name, color.image)}
              style={{ backgroundColor: color.name, width: "30px", height: "30px", margin: "5px" }}
            />
          ))}
        </div>
        {selectedColor && (
          <div>
            <h3>Selected Color: {selectedColor}</h3>
            <img src={selectedImage} alt="Product" />
          </div>
        )}
      </div>
    );
  };

export default PhotoButton1;
