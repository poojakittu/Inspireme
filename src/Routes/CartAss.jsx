import React, { useEffect, useState } from "react";
import axios from "axios";
import CartProduct from "../Components/Cart/CartProduct";

const Cartnew = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://shy-puce-cheetah-hose.cyclic.app/cart",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) {
      // Ensure minimum quantity is 1
      newQuantity = 1;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `https://shy-puce-cheetah-hose.cyclic.app/cart/update/${id}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id ? { ...product, quantity: newQuantity } : product
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const newTotal = products.reduce(
      (accumulator, product) => accumulator + product.price * product.quantity,
      0
    );
    setTotal(newTotal);
  }, [products]);

  return (
    <div>
      {products.map((product) => (
        <CartProduct
          key={product._id}
          id={product._id}
          image={product.image}
          title={product.title}
          price={product.price}
          quantity={product.quantity}
          updateQuantity={updateQuantity}
        />
      ))}
      <p>Total: ${total}</p>
    </div>
  );
};

export default Cartnew;
