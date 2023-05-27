import React from "react";
import PhotoButton1 from "./PhotoButton1";
const PhotoButton = () => {
  const productColors = [
    {
      name: "red",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/15/%282%29_A_child_in_India.jpg",
    },
    {
      name: "blue",
      image:
        "https://images.unsplash.com/photo-1603185030522-05d4497bb180?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwY2hpbGR8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    },
    { name: "green", image: "https://images.pexels.com/photos/189857/pexels-photo-189857.jpeg?cs=srgb&dl=pexels-jessica-lewis-creative-189857.jpg&fm=jpg" },
    { name: "yellow", image: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4=" },
  ];

  return (
    <div>
      <PhotoButton1 colors={productColors} />
    </div>
  );
};

export default PhotoButton;
