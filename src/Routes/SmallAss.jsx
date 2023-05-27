import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Heading, Image, Text } from "@chakra-ui/react";
import "@fontsource/roboto";
import { Link } from "react-router-dom";
import axios from "axios";

const SmallAss = () => {
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
      <Heading
        fontSize={"34px"}
        fontFamily={"Roboto"}
        color={"Black"}
        letterSpacing="0.01em"
        lineHeight={"37px"}
        fontWeight="300"
        textAlign={"center"}
        pt={["100px"]}
      >
        Accessories
      </Heading>

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
            key={product.id}
            p={5}
            borderRadius={"50px"}
            width="100%"
            m={"auto"}
            pt={"40px"}
            bg={"#f1f5f8"}
          >
            {index === 2 ? (
              <>
                <Heading
                  fontSize={"30px"}
                  fontFamily={"Roboto"}
                  color={"Black"}
                  pt={"90px"}
                  w={"50%"}
                  m={"auto"}
                  mt={2}
                >
                  <Link to="/ass"> & Much More</Link>
                </Heading>
                <Button
                  bg="black"
                  color="white"
                  borderRadius="20px"
                  _hover={{ bg: "gray.800" }}
                  fontFamily={"Roboto"}
                  fontSize={"20px"}
                  p={"10px 20px"}
                  mb={"140px"}
                >
                  <Link to="/ass">View All</Link>
                </Button>
              </>
            ) : (
              <Box>
                <Image
                  src={product.phoneColour[0].img2}
                  alt={product.title}
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
            )}
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default SmallAss;
