import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Heading, Image, Text } from "@chakra-ui/react";
import "@fontsource/roboto";
import { Link } from "react-router-dom";
import axios from "axios";

const SmallMac = () => {
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
        "https://shy-puce-cheetah-hose.cyclic.app/product/alldata?category=mac",
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
  const displayProducts = Iphone.slice(0, 6);

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
        Mac
      </Heading>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        templateRows={{
          base: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
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
            {index === 5 ? (
              <>
                <Heading
                  size="xl"
                  fontFamily={"Roboto"}
                  color={"Black"}
                  pt={"90px"}
                  w={"40%"}
                  m={"auto"}
                  mt={2}
                >
                  <Link to="/mac"> & Much More</Link>
                </Heading>
                <Button
                  bg="black"
                  color="white"
                  borderRadius="20px"
                  _hover={{ bg: "gray.800" }}
                  fontFamily={"Roboto"}
                  fontSize={"25px"}
                  p={"10px 30px"}
                  mt={"10px"}
                  mb={"190px"}
                >
                  <Link to="/mac">View All</Link>
                </Button>
              </>
            ) : (
              <>
                <Image
                  src="applep.jpg"
                  alt={product.Image}
                  p="0px 90px"
                  width={"80%"}
                  m={"auto"}
                  height={"200px"}
                  justifyContent={"center"}
                />
                <br />
                <Heading size="xl" mt={1} fontFamily={"Roboto"} color={"Black"}>
                  {product.title}
                </Heading>

                <Text fontSize="25px" color="gray.900" pt={"8px"}>
                  From{product.price}
                </Text>
                <Text fontSize="23px" color="gray.900" p={"3px 10px"}>
                  Additional carrier financing options are available. Footnote*
                </Text>
              </>
            )}
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default SmallMac;
