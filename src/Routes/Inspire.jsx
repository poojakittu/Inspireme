import React, { useState, useEffect } from "react";
import "@fontsource/poppins";
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import ProductRow1 from "./small";
import SmallMac from "./SmallMac";
import SmallAss from "./SmallAss";
import SmallWatch from "./SmallWatch";
import SmallIpad from "./SmallIPad";
import GridBox from "./GridBox";



const ProductRow = () => {
  return (
    <Box w={"90%"} m={"auto"} pt={"180"} fontFamily={"Poppins"}>
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        borderRadius="lg"
        textAlign={"center"}
        justifyContent={"center"}
        gap={"10"}
        w={"90%"}
        m={"auto"}
        p={"20px"}
      >
        <Flex
          flexDirection="column"
          alignItems={{ base: "center", md: "flex-start" }}
          p={"35px"}
          width={"100%"}
          justifyContent={"center"}
          textAlign={"center"}
        >
          <Heading
            fontSize="6xl"
            display="flex"
            textAlign="center"
            fontFamily={"Popins"}
            color={"black"}
            pl={"69px"}
          >
            Pro. Beyond.
          </Heading>
          <Text
            fontSize="3xl"
            fontWeight="bold"
            mb={2}
            textAlign="center"
            fontFamily={"Poppins"}
            color={"black"}
            pt={"20px"}
            pb={"16px"}
          >
            iPhone 14 Pro and iPhone 14 Pro Max
          </Text>

          <Button
            bg="black"
            color="white"
            borderRadius="20px"
            _hover={{ bg: "gray.800" }}
           m="auto"
            fontFamily={"Poppins"}
          >
            <Link to="/iphone">Buy Now</Link>
          </Button>
        </Flex>

        <Box width={"100%"}>
          <Image
            src="applep.jpg"
            alt="Product Image"
            width="381.33px"
            height="402.02px"
            mr={{ base: 0, md: 4 }}
            mb={{ base: 4, md: 0 }}
          />{" "}
        </Box>
      </Box>

      <Heading
        fontFamily={"Poppins"}
        fontSize={"34px"}
        color={"Black"}
        letterSpacing="0.01em"
        lineHeight={"37px"}
        fontWeight="880"
        textAlign={"center"}
        pt={["100px"]}
      >
        Explore Products By Categories
      </Heading>

      <Grid
        pt="80px"
        width={"90%"}
        margin={"auto"}
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(6, 1fr)",
        }}
        gap={10}
        justifyContent={"center"}
      >
        <Link to="/iphone">
          <Box>
            <Image
              src="applep.jpg"
              alt="iphone"
              width={"151.07px"}
              height={"151.07px"}
              m="auto"
            />
            <br />
            <Text fontSize={"30px"} color={"#282828"} fontWeight="400" fontFamily={"Poppins"}>
              iPhone
            </Text>
          </Box>
        </Link>

        <Link to="/mac">
          <Box>
            <Image
              src="mac.jpg"
              alt="Dan Abramov"
              width={"151.07px"}
              height={"151.07px"}
              m="auto"
            />
            <br />
            <Text fontSize={"30px"} color={"#282828"} fontWeight="400" fontFamily={"Poppins"}>
              Mac
            </Text>
          </Box>
        </Link>
        <Link to="/mac">
          <Box
          >
            <Image
              src="imac.jpg"
              alt="Dan Abramov"
              width={"151.07px"}
              height={"151.07px"}
              m="auto"
            />
            <br />
            <Text fontSize={"30px"} color={"#282828"} fontWeight="400" fontFamily={"Poppins"}>
              iMac
            </Text>
          </Box>
        </Link>
        <Link to="/ipad">
          <Box>
            <Image
              src="watch.jpg"
              alt="Dan Abramov"
              width={"151.07px"}
              height={"151.07px"}
              m="auto"
            />
            <br />
            <Text fontSize={"30px"} color={"#282828"} fontWeight="400" fontFamily={"Poppins"}>
              iPad
            </Text>
          </Box>
        </Link>
        <Link to="/watch">
          <Box>
            <Image
              src="watch.jpg"
              alt="Dan Abramov"
              width={"151.07px"}
              height={"151.07px"}
              m="auto"
            />
            <br />
            <Text fontSize={"30px"} color={"#282828"} fontWeight="400" fontFamily={"Poppins"}>
              Watch
            </Text>
          </Box>
        </Link>
        <Link to="/acc">
          <Box>
            <Image
              src="ass.png"
              alt="Dan Abramov"
              width={"151.07px"}
              height={"151.07px"}
              m="auto"
            />
            <br />
            <Text fontSize={"30px"} color={"#282828"} fontWeight="400"  fontFamily={"Poppins"}>
              Accessories
            </Text>
          </Box>
        </Link>
      </Grid>

      <ProductRow1 />
      <SmallMac />
      <SmallIpad />
      <SmallWatch />
      <SmallAss />
      <GridBox />
    </Box>
  );
};

export default ProductRow;
