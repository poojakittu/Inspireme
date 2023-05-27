import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Grid,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import "@fontsource/roboto";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";

const Carousels = ({ items }) => {
  
  return (
    <Box>
      <Grid
        pt="140px"
        width={"90%"}
        margin={"auto"}
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={3}
        justifyContent={"center"}
      >
        {items.map((e, i) => (
          <Box
            key={e._id}
            mb="1%"
            textAlign="center"
            justifyContent={"center"}
            justifyItems={"center"}
            line-spacing="0.05em"
            fontFamily="Montserrat"
          >
            <Image
              src="applep.jpg"
              h="218px"
              w="207.12px"
              mb="2%"
              margin={"auto"}
            />
            <Heading fontFamily={"Roboto"}>{e.title}</Heading>
            <Text fontSize={"20"} fontFamily={"Roboto"} fontWeight={"500"}>
              {e.subTitle}
            </Text>

            <br />
            <Text fontFamily={"Roboto"}>from ₹{e.price}</Text>
            <br />

            <Link to={`/cart`}>
              <Button
                p="-15px 15px"
                colorScheme="blue"
                borderRadius="20px"
                color="white"
                fontFamily={"Roboto"}
              >
                Buy
              </Button>
            </Link>
            <br />
            <Link to={`/product/${e._id}`}>
              <Text color={"#3182ce"}>Learn More </Text>
            </Link>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Carousels;
