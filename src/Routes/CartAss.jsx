import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Heading, Image, Text } from "@chakra-ui/react";
import "@fontsource/roboto";
import { Link } from "react-router-dom";
import axios from "axios";

const SmallAss1 = () => {
  const [Iphone, setIphone] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const response = await axios.get(
        "https://shy-puce-cheetah-hose.cyclic.app/product/alldata?category=ass",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setIphone(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const displayProducts = Iphone.slice(0, 3);

  return (
    <Box w={"90%"} m={"auto"}>
      
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        templateRows={{
          base: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          lg: "repeat(1, 1fr)",
        }}
        gap={9}
        pt={["60px"]}
      >
        {displayProducts.map((product, index) => (
          <Box
            key={product._id}
            p={5}
            borderRadius={"50px"}
            width="100%"
            m={"auto"}
            pt={"40px"}
            bg={"#f1f5f8"}
          >
          
    
              <Box>
                <Image
                  src="applep.jpg"
                  alt={product.Image}
                  p="0px 50px"
                  width={"100%"}
                  m={"auto"}
                  height={"200px"}
                  justifyContent={"center"}
                />
                <br />

                <Heading
                  fontSize={"30px"}
                  mt={1}
                  fontFamily={"Roboto"}
                  color={"Black"}
                >
                  {product.title}
                </Heading>
                <br />

                <Text fontSize="20px" color="gray.900" pt={"8px"}>
                  From ${product.price}
                </Text>
                <br />
              </Box>
          
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default SmallAss1;
