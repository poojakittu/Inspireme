import {
  Box,
  Button,
  Heading,
  Text,
  Icon,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Carousels from "./Carousels";
import img0 from "../Images/image 26-0.png";
import img1 from "../Images/image 26-1.png";
import img2 from "../Images/image 26-2.png";
import img3 from "../Images/image 26-3.png";
import img4 from "../Images/image 26-4.png";
import img00 from "../Images/image 4.png";
import img01 from "../Images/image 5.png";
import img02 from "../Images/image 6.png";
import img03 from "../Images/image 7.png";
import img04 from "../Images/image 8.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import axios from "axios";

const BrandSection = () => {
  const [category, setCategory] = useState("iphone");
  let brandsImgs = [img00, img01, img02, img03, img04];
  let xtraBrandsImgs = [img01, img02, img03, img00, img01];
  const [bestproducts, setBestProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/product/alldata?category=${category}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(response.data.data);
      setBestProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  let categoriesArr = ["iPhone", "Mac", "iMac", "iPad", "Watch", "Accessories"];

  const handleCategory = (e) => [setCategory(e)];

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return (
    <>
      <Heading
        fontFamily={"Montserrat"}
        fontSize={"30px"}
        textTransform="uppercase"
        color={"#225886"}
        letterSpacing="0.05em"
        lineHeight={"37px"}
        fontWeight="980"
        textAlign={"center"}
      >
        Government Purchase Program
      </Heading>
      <Text
        fontSize={"15px"}
        textTransform="uppercase"
        fontFamily={"Montserrat"}
        color={"#282828"}
        letterSpacing="0.05em"
        lineHeight={"38px"}
        fontWeight="500"
        textAlign={"center"}
      >
        Please review the terms and conditions below before placing an order.
      </Text>
      <Box
        w="98%"
        m="auto"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        mt="1%"
        mb="3%"
      >
        <SimpleGrid
          spacingX={"10px"}
          columns={[2, 2, 3, 7]}
          w="80%"
          alignItems={"center"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          {categoriesArr?.map((e, i) => (
            <Box
              w={"150px"}
              key={i}
              mt="5px"
              mb="5px"
              backgroundColor={category == e ? "#225886" : "#D0D0D0"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              p="5px 5px"
              color="#FFFFFF"
              fontSize={["12px", "14px", "16px", "18px"]}
              fontWeight={"400"}
              borderRadius="10px"
              fontFamily={"Montserrat"}
              onClick={() => handleCategory(e)}
            >
              {e}
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Box w="98%" m="auto">
        {bestproducts.length > 0 ? (
          <Carousels items={bestproducts}></Carousels>
        ) : (
          <Text>No Data Available</Text>
        )}
      </Box>

      <Text
        mt="5%"
        fontFamily={"Montserrat"}
        fontSize={"15px"}
        textTransform="uppercase"
        color={"#282828"}
        letterSpacing="0.05em"
        lineHeight={"18px"}
        fontWeight="980"
        textAlign={"center"}
      >
        BRANDS SECTION
      </Text>
      <Heading
        fontFamily={"Montserrat"}
        fontWeight="980"
        fontSize={"30px"}
        lineHeight={"37px"}
        textAlign={"center"}
        color={"#225886"}
        letterSpacing="0.05em"
        textTransform="uppercase"
      >
        OUR BEST VENDOR
      </Heading>
      <Text
        fontWeight="980"
        fontFamily={"Montserrat"}
        fontSize={"30px"}
        lineHeight={"37px"}
        textAlign={"center"}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
        aliquam.
      </Text>

      <SimpleGrid
        pl="2%"
        columns={[2, 2, 3, 5]}
        w="98%"
        m="auto"
        display={"grid"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        {brandsImgs?.map((e, i) => (
          <Image key={i} src={e} m="2%" w="165px" h="110px"></Image>
        ))}
      </SimpleGrid>
      <SimpleGrid
        pl="2%"
        columns={[2, 2, 3, 5]}
        w="98%"
        m="auto"
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        {xtraBrandsImgs?.map((e, i) => (
          <Image src={e} key={i} m="2%"></Image>
        ))}
      </SimpleGrid>
    </>
  );
};

export default BrandSection;
