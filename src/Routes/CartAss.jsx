import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Heading, Image, Text } from "@chakra-ui/react";
import "@fontsource/poppins";
import { Link } from "react-router-dom";
import axios from "axios";

const SmallAss1 = ({ name }) => {
  
  const [Iphone, setIphone] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchProducts({name});
  }, [name]);

  const fetchProducts = async ({ name }) => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const response = await axios.get(
        `https://shy-puce-cheetah-hose.cyclic.app/product/alldata?name=${name}`,
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
  
    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  

  return (
    <Box mb={["25%", "25%", "15%"]}>
      <Heading fontSize={"30px"}>Choose Accessories</Heading>
      <Box w={"90%"} m={"auto"} >
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
            <Link to={`/new/${product._id}`}>
              <Box
                key={product._id}
                p={5}
                borderRadius={"50px"}
                width="100%"
                m={"auto"}
                pt={"40px"}
                bg={"#f1f5f8"}
                onClick={handleScrollToTop}
              >
                <Box>
                  <Image
                    src="https://i.ibb.co/ryndf9K/MPLN3ref-VW-PF-watch-41-alum-midnight-cell-8s-VW-PF-WF-CO.jpg"
                    alt={product.Image}
                    m={"auto"}
                    height={"200px"}
                    justifyContent={"center"}
                    h={"262.45px"}
                  />
                  <br />

                  <Heading
                    fontSize={"30px"}
                    mt={1}
                    fontFamily={"Poppins"}
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
            </Link>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SmallAss1;
