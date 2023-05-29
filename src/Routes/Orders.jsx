import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Spinner,
  useToast,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import axios from "axios";

const OrderPage = () => {
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://shy-puce-cheetah-hose.cyclic.app/order", {
        headers: {
          Authorization: `${token}`,
        },
      });
      setOrders(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = (orderId) => {
    // Handle button click based on order status
    // You can implement the logic here to handle the button action
  };

  return (
    <Box p={4} mt={"150px"}>
      <Heading size="lg" mb={4}>
        Your Orders
      </Heading>
      {orders.length === 0 ? (
        <Text>No orders found.</Text>
      ) : (
        <Grid templateColumns="repeat(1, 1fr)" gap={4}>
          {orders.map((order) => (
            <GridItem
              key={order._id}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              bg="gray.100"
            >
              <Text fontWeight="bold" mb={2}>
                Order ID: {order._id}
              </Text>
              <Text>Username: {order.username}</Text>
              <Text>Order Status: {order.orderStatus}</Text>
              <Text>Shipping Address: {order.shippingAddress}</Text>
              <Text>Total Price: ${order.totalprice}</Text>
              <Text>Date: {order.orderDate}</Text>

              {/* Render products */}
              <Box mt={4}>
                <Heading size="lg" mb={2}>
                  Your Products
                </Heading>
                <Grid
                  templateColumns="repeat(3, 1fr)"
                  gap={4}
                  textAlign={"left"}
                >
                  {order.products.map((product) => (
                    <Box
                      key={product.productId}
                      mb={2}
                      border={"1px solid blue"}
                      borderRadius={"10px"}
                      w={"100%"}
                      m={"auto"}
                      p={"20px"}
                    >
                      <Box w="50px" h="50px" bg="gray.200">
                        <Image
                          src={product.image}
                          alt={product.title}
                          w="100%"
                          h="100%"
                          objectFit="cover"
                        />
                      </Box>
                      <Text fontSize={"20px"}>
                        {" "}
                        Product Name: {product.title}
                      </Text>
                      <Text fontSize={"20px"}>
                        {" "}
                        Quantity: {product.quantity}
                      </Text>
                      <Text fontSize={"20px"}>
                        {" "}
                        Price: {product.singleItemPrice}
                      </Text>
                      <Text fontSize={"20px"}> Colour: {product.colour}</Text>
                      <Text fontSize={"20px"}> display: {product.display}</Text>
                      <Text fontSize={"20px"}>
                        {" "}
                        Storage: {product.quantity}
                      </Text>
                    </Box>
                  ))}
                </Grid>
              </Box>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default OrderPage;
