import React, { useState, useEffect } from "react";
import { Box, Text, Button, Grid, Image, Heading } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { Stack, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "@fontsource/poppins";

const Watch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the data from your backend API
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://shy-puce-cheetah-hose.cyclic.app/product/alldata?category=watch"
        ); // Change the URL to your actual API endpoint
        const data = await response.json();

        if (Array.isArray(data.data)) {
          setProducts(data.data);
          setLoading(false);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleColorSelection = (productId, color, img1) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, selectedColor: color, selectedImg: img1 }
          : product
      )
    );
  };

  return (
    <div style={{ marginTop: "130px" }}>
      <Box w="80%" m="auto" mt={["20px", "20px", "220px"]}>
        <Heading size="xl" fontFamily="Poppins">
          Buy the all-new 24” Watch.
        </Heading>
        {loading ? (
          <Stack>
            {Array(18)
              .fill()
              .map((_, index) => (
                <Skeleton key={index} height="20px" />
              ))}
          </Stack>
        ) : (
          <Box>
            <Grid
              pt={4}
              width="90%"
              margin="auto"
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={4}
              justifyContent="center"
            >
              {products.map((product) => (
                <Box key={product._id} textAlign="center" p={4}>
                  {/* Render selected phone image */}
                  {product.selectedColor &&
                  product.selectedColor ===
                    product.phoneColour.find(
                      (colour) => colour.color === product.selectedColor
                    )?.color ? (
                    <Link to={`/new/${product._id}`}>
                      <Box mt={4}>
                        <Box mt={2}>
                          <Image
                            src={product.selectedImg}
                            alt="Selected Phone"
                            w="100%"
                          />
                        </Box>
                      </Box>
                    </Link>
                  ) : (
                    <Link to={`/new/${product._id}`}>
                      <Box mt={4}>
                        <Box mt={2} w="300px">
                          <Image
                            src={product.phoneColour[0].img1}
                            alt="Selected Phone"
                            w="100%"
                          />
                        </Box>
                      </Box>
                    </Link>
                  )}

                  <Box
                    mt={2}
                    display="flex"
                    justifyItems={"center"}
                    width="60%"
                    textAlign="center"
                    m="auto"
                    p="20px"
                    justifyContent="center"
                  >
                    {product.phoneColour.map((colour) => (
                      <Box
                        key={colour.color}
                        size="xs"
                        onClick={() =>
                          handleColorSelection(
                            product._id,
                            colour.color,
                            colour.img1
                          )
                        }
                        ml={2}
                        backgroundColor={colour.color}
                        height="10px"
                        width="10px"
                        borderRadius="50%"
                        border="1px solid gray"
                      />
                    ))}
                  </Box>
                  <Link to={`/new/${product._id}`}>
                    <Heading fontFamily="Poppins" mt={2} fontSize="3xl">
                      {product.title}
                    </Heading>
                    <Text
                      fontFamily="Poppins"
                      mt={3}
                      fontWeight="800"
                      fontSize="19px"
                      color="#393d3d"
                    >
                      {product.subTitle}
                    </Text>
                    <Text
                      fontFamily="Poppins"
                      mt={10}
                      fontWeight="800"
                      color="#393d3d"
                    >
                      From ₹{product.price}*
                    </Text>

                    <Button
                      bg="#0071e3"
                      borderRadius="20px"
                      color="white"
                      mt={4}
                      fontFamily="Poppins"
                      fontSize="14px"
                      px="20px"
                    >
                      Buy
                    </Button>

                    <Box
                      justifyContent="center"
                      alignItems="center"
                      mt="10%"
                      color="blue"
                      display="flex"
                      gap="2px"
                      fontFamily="Poppins"
                      fontSize="15px"
                      fontWeight="500"
                    >
                      <a>Learn more</a>
                      <IoIosArrowForward fontSize="14px" />
                    </Box>
                  </Link>
                </Box>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Watch;
