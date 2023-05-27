import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Heading, Image, Text } from "@chakra-ui/react";
import "@fontsource/poppins";
import { Link } from "react-router-dom";
import axios from "axios";

const SmallWatch = () => {
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
        "https://shy-puce-cheetah-hose.cyclic.app/product/alldata?category=watch",
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
    <Box w={"90%"} m={"auto"} >
      <Heading
        fontSize={"34px"}
        fontFamily={"Poppins"}
        color={"Black"}
        letterSpacing="0.01em"
        lineHeight={"37px"}
        fontWeight="300"
        textAlign={"center"}
        pt={["100px"]}
      >
        Apple Watch
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
                  size="xl"
                  fontFamily={"Poppins"}
                  color={"Black"}
                  pt={"90px"}
                  w={"40%"}
                  m={"auto"}
                  mt={2}
                >
                  <Link to="/watch"> & Much More</Link>
                </Heading>
                <Button
                  bg="black"
                  color="white"
                  borderRadius="20px"
                  _hover={{ bg: "gray.800" }}
                  fontFamily={"Poppins"}
                  fontSize={"25px"}
                  p={"10px 30px"}
                  mt={"10px"}
                  mb={"190px"}
                >
                  <Link to="/watch">View All</Link>
                </Button>
              </>
            ) : (
              <>
                <Image
                  src="applep.jpg"
                  alt={product.Image}
                  width={"80%"}
                  m={"auto"}
                  height={"200px"}
                  justifyContent={"center"}
                  w="164px"
                  h={"222.45px"}
                />
                <br />
                <Heading size="xl" mt={1} fontFamily={"Poppins"} color={"Black"}>
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

export default SmallWatch;
