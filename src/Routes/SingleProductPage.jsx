import React, { useState } from "react";

import { BsBag } from "react-icons/bs";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  UnorderedList,
  ListItem,
  useToast,
  Grid,
  GridItem,
  Input,
  FormControl,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Box,
  Icon,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import { useParams } from "react-router-dom/dist";
import { useEffect } from "react";

import axios from "axios";


const SingleProductPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pic, setPic] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPack, setSelectedPack] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [product, setProduct] = useState("");
  const [comments, setComments] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [pics, setPics] = useState(null);
  const toast = useToast();
  const { id } = useParams();
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleUnitPrice = (pack) => {
    setSelectedUnit(pack);
  };

  const getproduct = async () => {
    try {
      let res = await fetch(
        `https://shy-puce-cheetah-hose.cyclic.app/product/${id}`
      );
      let data = await res.json();

      setProduct(data);
      setPics(data.image[0]);
    } catch (error) {
      console.log(error);
    }
  };

  //**************** */  Post Comment ********************

  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const body = {
  //     ProductId: id,
  //     rating: Number(rating),
  //     comment: comment,
  //     image: image,
  //   };

  //   try {
  //     const response = await fetch(
  //       "https://erin-tough-viper.cyclic.app/comment/add",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `${token}`,
  //         },
  //         body: JSON.stringify(body),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     toast({
  //       title: "Comment added",
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast({
  //       title: "Error adding comment",
  //       description: error.message,
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   }
  // };

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setImage(reader.result);
  //   };
  // };

  //  **************************************

  const handleDecrease = () => {
    if (quantity >= 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const numStars2 = comments ? comments.map((el) => el.rating) : [];
  console.log(numStars2[0]);
  const filledStars = Math.floor(numStars2[0]);
  const halfStars = Math.ceil(numStars2[0] - filledStars);
  const emptyStars = 5 - filledStars - halfStars;

  const numStars = product.rating;

  const starArray = [...Array(numStars).keys()];
  useEffect(() => {
    getproduct();
  }, []);
  const handleImage = (e) => {
    setPics(e);
    // onOpen();
  };

  const total = quantity * product.price;
  const handleAddToCart = ({ productId, title, image }) => {
    {
      const data = {
        productId: productId,
        title: title,
        image: image,
        price: total,
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

  const colorButtonStyle = (el) => {
    const isSelected = selectedColor === el;
    return {
      backgroundColor: el,

      border: isSelected ? "2px solid blue" : "none",
      boxShadow: isSelected ? "0 0 0 2px blue" : "none",
      _hover: { backgroundColor: el },
      _active: { backgroundColor: el },
      _focus: { outline: "none" },
      cursor: "pointer",
    };
  };
  const sizeButtonStyle = (el) => {
    const isSelected2 = selectedSize === el;
    return {
      border: isSelected2 ? "2px solid blue" : "none",
      boxShadow: isSelected2 ? "0 0 0 2px blue" : "none",
      cursor: "pointer",

      _focus: { outline: "none" },
    };
  };
  const packButtonStyle = (el) => {
    const isSelected3 = selectedPack === el;
    return {
      border: isSelected3 ? "2px solid blue" : "none",
      boxShadow: isSelected3 ? "0 0 0 2px blue" : "none",
      cursor: "pointer",

      _focus: { outline: "none" },
    };
  };
  const unitButtonStyle = (el) => {
    const isSelected4 = selectedUnit === el;
    return {
      border: isSelected4 ? "2px solid blue" : "none",
      boxShadow: isSelected4 ? "0 0 0 2px blue" : "none",
      cursor: "pointer",

      _focus: { outline: "none" },
    };
  };
  console.log(selectedSize);
  console.log(selectedColor);
  console.log(selectedPack);
  console.log(selectedUnit);
  const closeModal = () => {
    onClose();
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <Flex
        w="98%"
        m="auto"
        mt="3%"
        flexDirection={["column", "column", "row", "row"]}
        justifyContent={["space-between"]}
      >
        <Box w={["100%", "100%", "50%", "50%"]}>
          <Image
            src={pics}
            h="550px"
            w={["1050px", "1050px", "555px", "100%"]}
          ></Image>
        </Box>

        <VStack
          pb="2%"
          pl="2%"
          textAlign={"start"}
          alignItems="start"
          justifyContent="space-between"
        >
          <Heading
            color="#225886"
            fontSize={"30px"}
            lineHeight="36.57px"
            fontWeight={"800"}
            fontFamily="Montserrat"
          >
            {product.title}
          </Heading>

          <HStack justifyContent={"start"} w="100%">
            <Text
              color="gray"
              fontSize={"16px"}
              lineHeight="20.57px"
              fontWeight={"700"}
              fontFamily="Montserrat"
              onClick={() => handleUnitPrice(product.price)}
              style={unitButtonStyle(product.unitPrice)}
              isSelected={selectedUnit === product.unitPrice}
            >
              Unit Price : ₹ {product.price}
            </Text>
          </HStack>

          <Text
            color="#1E1E1E"
            fontSize={"16px"}
            fontWeight={"400"}
            fontFamily="Montserrat"
          >
            OS:{product.os}
          </Text>
          <Text
            color="#1E1E1E"
            fontSize={"16px"}
            fontWeight={"400"}
            fontFamily="Montserrat"
          >
            Model Name:{product.modelName}
          </Text>
          <Text
            color="#1E1E1E"
            fontSize={"16px"}
            fontWeight={"400"}
            fontFamily="Montserrat"
          >
            Network Service Provider:{product.networkServiceProvider}
          </Text>

          <Text
            color="#1E1E1E"
            fontSize={"16px"}
            fontWeight={"400"}
            fontFamily="Montserrat"
          >
            Brand:{product.brand}
          </Text>
          <Text
            color="#1E1E1E"
            fontSize={"16px"}
            fontWeight={"400"}
            fontFamily="Montserrat"
          >
            Technology:{product.technology}
          </Text>

          <HStack w="100%">
            <Text
              color="#1E1E1E"
              fontSize={"15px"}
              fontWeight={"400"}
              lineHeight="18px"
              fontFamily="Montserrat"
            >
              CATEGORIES:
            </Text>
            <HStack justifyContent={"start"} textAlign="start" w="100%">
              {product.category?.map((el, i) => (
                <Text
                  key={i}
                  color="#1E1E1E"
                  fontSize={"15px"}
                  fontWeight={"bold"}
                  lineHeight="18px"
                  fontFamily="Montserrat"
                  textAlign="start"
                >
                  {el}
                </Text>
              ))}
            </HStack>
          </HStack>

          <VStack w="100%" alignItems={"start"}>
            <Text
              color="#1E1E1E"
              fontSize={"15px"}
              fontWeight={"400"}
              lineHeight="18px"
              fontFamily="Montserrat"
            >
              COLORS:
            </Text>
            <HStack justifyContent={"start"} textAlign="start" w="100%">
              {product.colour?.map((el, i) => (
                <Box
                  key={i}
                  onClick={() => handleColorSelect(el)}
                  style={colorButtonStyle(el)}
                  isSelected={selectedColor === el}
                  h="40px"
                  w="40px"
                ></Box>
              ))}
            </HStack>
          </VStack>

          <Text
            color="#1E1E1E"
            fontSize={"25px"}
            fontWeight={"400"}
            lineHeight="18px"
            fontFamily="Montserrat"
          >
            TOTAL : {total}
          </Text>
          <HStack alignItems={"center"}>
            <HStack boxSizing="border-box" justifyContent={"start"}>
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
              >
                +
              </Button>
            </HStack>

            <Button
              h="43px"
              color="#FFFFFF"
              mt="7%"
              fontSize={"15px"}
              fontWeight={"400"}
              lineHeight="18px"
              fontFamily="Montserrat"
              borderRadius="1.4641px"
              bg="#225886"
              onClick={() =>
                handleAddToCart({
                  title: product.title,
                  image: product.image[0],
                  price: product.price,
                  quantity: quantity,
                  productId: product._id,
                })
              }
            >
              Add to cart <Icon ml="5%" as={BsBag}></Icon>
            </Button>
          </HStack>
        </VStack>
      </Flex>

      {/* screenshot-pics */}

      <HStack w="98%" m="auto" justifyContent={"flex-start"} mt="2%" mb="1%">
        <Grid templateColumns="repeat(3,1fr)" gap="20px">
          {product.image?.map((e, i) => (
            <Image
              onMouseOver={() => handleImage(e)}
              // onMouseUp={closeModal}
              key={i}
              h="97px"
              w="97px"
              src={e}
            ></Image>
          ))}
        </Grid>
      </HStack>

      {/* Tabs-section */}

      <Tabs w="98%" m="auto">
        <TabList
          color="#D9D9D9"
          fontSize={"18px"}
          lineHeight="22px"
          fontFamily="Montserrat"
        >
          <Tab fontWeight={"700"}>DESCRIPTION</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack textAlign={"start"} alignItems="start">
              <Text
                color="#282828"
                fontSize={"16px"}
                fontWeight={"400"}
                lineHeight="20.4px"
                fontFamily="Montserrat"
              >
                {product.description?.heading}
              </Text>

              <UnorderedList w="100%" pl="7%">
                {product.description?.bullet_points?.map((e, i) => (
                  <ListItem
                    key={i}
                    color="#282828"
                    fontSize={"16px"}
                    fontWeight={"400"}
                    lineHeight="20.4px"
                    fontFamily="Montserrat"
                  >
                    {e}
                  </ListItem>
                ))}
              </UnorderedList>
              <Text
                color="#282828"
                fontSize={"16px"}
                fontWeight={"400"}
                lineHeight="20.4px"
                fontFamily="Montserrat"
              >
                {product.description?.ending}
              </Text>
            </VStack>
          </TabPanel>
          <TabPanel>
            <UnorderedList
              w="100%"
              pl="7%"
              textAlign={"start"}
              color="#282828"
              fontSize={"16px"}
              fontWeight={"400"}
              lineHeight="20.4px"
              fontFamily="Montserrat"
            >
              {product.additionalinfo?.map((e, i) => (
                <ListItem key={i}>{e}</ListItem>
              ))}
            </UnorderedList>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* <BestProductsSection></BestProductsSection> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton /> */}
          <ModalBody p="7%">
            <Image h="400px" src={pic}></Image>
          </ModalBody>
          {/* <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
      {/* </>
  )
} */}
    </div>
  );
};

export default SingleProductPage;
