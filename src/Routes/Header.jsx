import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  Flex,
  HStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import "@fontsource/roboto";
import { useParams } from "react-router-dom";
import AddressBook from "./AddressBook";
import CartProduct from "../Components/Cart/CartProduct";
import { set } from "mongoose";

const Header = () => {
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("black");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [display, setDisplay] = useState("");
  const [storage1, setStorage] = useState("");
  const { id } = useParams();
  const toast = useToast();

  useEffect(() => {
    // Fetch the data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://shy-puce-cheetah-hose.cyclic.app/product/allproductdata/${id}`
        );
        const data = await response.json();
        setProduct(data);
        setPrice(data.price);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleAddToCart = ({
    productId,
    title,
    image,
    color,
    storage,
    display,
    quantity,
    price,
  }) => {
    if (color === "") {
      toast({
        title: "Please select a color",

        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (display === "") {
      toast({
        title: "Please select a Model",

        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (storage === "") {
      toast({
        title: "Please select a storage",

        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (quantity === "") {
      toast({
        title: "Please select a quantity",

        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const data = {
        productId: productId,
        title: title,
        image: image,
        price: price,
        color: color,
        storage: storage,
        display: display,
        quantity: quantity,
      };

      const token = localStorage.getItem("token");

      axios
        .post("https://shy-puce-cheetah-hose.cyclic.app/cart/add", data, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          toast({
            title: "Product Added Successfully!!",

            status: "success",

            isClosable: true,
            position: "top",
          });
        })
        .catch((error) => {
          console.log(error.response.data);
          toast({
            title: "Error In Adding Product To Cart!!",

            status: "error",

            isClosable: true,
            position: "top",
          });
        });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  const handleColorSelection = (color) => {
    setSelectedColor(color);
    setCurrentImageIndex(0);
  };

  const handleDecrease = () => {
    setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.phoneColour.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.phoneColour.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderImages = () => {
    const selectedPhoneColor = product.phoneColour.find(
      (color) => color.color === selectedColor
    );

    if (!selectedPhoneColor) {
      return (
        <Flex alignItems="center" justifyContent="center">
          <Button
            variant="ghost"
            onClick={handlePrevImage}
            leftIcon={<ChevronLeftIcon />}
          />

          <Box
            display={["none", "none", "block"]}
            w="100%"
            padding={"20px"}
            mt={"50px"}
          >
            <Image
              src={product.phoneColour[0][`img${currentImageIndex + 1}`]}
              alt="Phone"
              w={"100%"}
              borderRadius="md"
              boxShadow="md"
              h={"370px"}
            />
          </Box>
          <Button
            variant="ghost"
            onClick={handleNextImage}
            rightIcon={<ChevronRightIcon />}
          />
        </Flex>
      );
    }

    return (
      <Flex alignItems="center" justifyContent="center">
        <Button
          variant="ghost"
          onClick={handlePrevImage}
          leftIcon={<ChevronLeftIcon />}
        />

        <Box
          display={["none", "none", "block"]}
          w="100%"
          padding={"20px"}
          mt={"50px"}
        >
          <Image
            src={selectedPhoneColor[`img${currentImageIndex + 1}`]}
            alt="Phone"
            w={"100%"}
            borderRadius="md"
            boxShadow="md"
            h={"370px"}
          />
        </Box>
        <Button
          variant="ghost"
          onClick={handleNextImage}
          rightIcon={<ChevronRightIcon />}
        />
      </Flex>
    );
  };

  return (
    <Box mt={"150px"}>
      <Heading textAlign={"left"} fontFamily={"Roboto"}>
        Buy {product.title}
      </Heading>
      <Text fontWeight={"20"} mt="1%" textAlign={"left"} fontFamily={"Roboto"}>
        From ₹{product.model[0].perMonthEmi}/mo.Per Month with instant savings§§
        and No Cost EMI§Footnote or ₹{product.model[0].Actualprice}
      </Text>

      <Box mt="5%" display={"flex"} gap={"20px"}>
        <Box display={["none", "none", "block"]} w="50%" padding={"20px"}>
          {renderImages()}
          <Box>
            <Heading>Price ₹{price}</Heading>
          </Box>
        </Box>
        <Box w={["100%", "100%", "50%"]} padding={"5px"}>
          <Heading fontSize={"27px"} fontFamily={"Roboto"}>
            Select Model Which Best For you ?
          </Heading>
          <Box
            mt="5%"
            display={"flex"}
            flexFlow={["column", "column", "row"]}
            gap={"20px"}
          >
            {product.model.map((model) => (
              <Box
                bg={"aliceblue"}
                borderRadius={"30px"}
                padding={"6px 7px"}
                border={"2px solid black"}
                display={"flex"}
                justifyContent={"space-between"}
                gap={"10px"}
                key={model._id}
                onClick={() => setDisplay(model.display)}
              >
                <Text
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  textAlign={"left"}
                  fontSize={"11px"}
                  fontWeight={"700"}
                  p={"0px 3px"}
                  w={"65%"}
                >
                  {product.title}
                  <br />
                  {model.display}
                </Text>
                <Text
                  justifyContent={"right"}
                  alignItems={"right"}
                  textAlign={"right"}
                  fontSize={"9px"}
                  p={"0px 0px"}
                  fontWeight={"700"}
                  w={"33%"}
                  pr={"7px"}
                  fontFamily={"Poppins"}
                >
                  From ₹{model.perMonthEmi}/mo.Per Month with instant savings§§
                  and No Cost EMI§Footnoteor ₹{model.Actualprice}Footnote‡
                </Text>
              </Box>
            ))}
          </Box>

          <Box
            mt={["15%", "15%", "5%"]}
            flexFlow={["column", "column", "row"]}
            display={"flex"}
            gap={"20%"}
          >
            <Heading
              mb={["5%", "5%", "1%"]}
              fontSize={"27px"}
              fontFamily={"Roboto"}
            >
              Choose Your Color
            </Heading>
            <Box mt={2} w={"40%"} display={"flex"}>
              {product.phoneColour.map((colour) => (
                <Box
                  key={colour._id}
                  size="xs"
                  onClick={() => handleColorSelection(colour.color)}
                  ml={2}
                  backgroundColor={colour.color}
                  width="20px"
                  height="20px"
                  borderRadius="50%"
                  border="1px solid gray"
                />
              ))}
            </Box>
          </Box>

          <Heading
            mt={["10%", "10%", "5%"]}
            fontSize={"27px"}
            fontFamily={"Roboto"}
          >
            Storage
          </Heading>
          <Box
            mt={["5%", "5%", "3%"]}
            display={"flex"}
            flexFlow={["column", "column", "row"]}
            gap={"20px"}
          >
            {product.storage.map((storage) => (
              <Box
                bg={"aliceblue"}
                borderRadius={"30px"}
                padding={"6px 7px"}
                border={"2px solid black"}
                display={"flex"}
                justifyContent={"space-between"}
                gap={"10px"}
                key={storage._id}
                onClick={() => setStorage(storage.phoneStorage)}
              >
                <Text
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  textAlign={"left"}
                  fontSize={"14px"}
                  fontWeight={"700"}
                  p={"0px 3px"}
                  w={"35%"}
                >
                  {storage.phoneStorage}
                </Text>
                <Text
                  justifyContent={"right"}
                  alignItems={"right"}
                  textAlign={"right"}
                  fontSize={"11px"}
                  p={"0px 0px"}
                  fontWeight={"700"}
                  w={"58%"}
                  pr={"5px"}
                >
                  From ₹2{storage.perMonthEmi}/mo.Per Month with instant
                  savings§§ and No Cost EMI§Footnoteor MRP ₹
                  {storage.Actualprice}Footnote‡ (Incl. of all taxes)
                </Text>
              </Box>
            ))}
          </Box>
          <HStack boxSizing="border-box" justifyContent={"start"} mt={"30px"}>
            <br />
            <Button
              position={"relative"}
              left="0px"
              h="43px"
              w="37px"
              display={"flex"}
              fontWeight={"500"}
              justifyContent="center"
              alignItems={"center"}
              fontSize={12}
              border="2px solid #ccc"
              color={"#1E1E1E"}
              onClick={handleDecrease}
              disabled={quantity === 1}
            >
              -
            </Button>
            <Box
              position={"relative"}
              left="-8px"
              h="43px"
              w="37px"
              display={"flex"}
              fontWeight={"500"}
              justifyContent="center"
              alignItems={"center"}
              fontSize={12}
              border="2px solid #ccc"
              color={"#1E1E1E"}
            >
              {quantity}
            </Box>
            <Button
              position={"relative"}
              left="-16px"
              ml="-8px"
              h="43px"
              w="37px"
              display={"flex"}
              fontWeight={"500"}
              justifyContent="center"
              alignItems={"center"}
              fontSize={12}
              border="2px solid #ccc"
              color={"#1E1E1E"}
              onClick={handleIncrease}
              disabled={quantity === product.items_left}
              mt={"20px"}
            >
              +
            </Button>
          </HStack>

          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Button
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              mt="5%"
              borderRadius={"20px"}
              color={"white"}
              bg="blue"
              padding={"25px 50px"}
              fontSize={"23px"}
              onClick={() =>
                handleAddToCart({
                  title: product.title,
                  image: product.phoneColour[0].img1,
                  price: price * quantity,
                  color: selectedColor,
                  storage: storage1,
                  display: display,
                  quantity: quantity,
                  productId: product._id,
                })
              }
            >
              Buy Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
