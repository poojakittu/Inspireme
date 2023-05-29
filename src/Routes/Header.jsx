import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  Flex,
  HStack,
  useToast,
  ListItem,
  Select,
  UnorderedList,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import "@fontsource/roboto";
import { useParams } from "react-router-dom";

import { AiFillApple } from "react-icons/ai";
import { BiCube } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { TbCoinRupee } from "react-icons/tb";
import { RiWechatLine } from "react-icons/ri";
import "@fontsource/poppins"; //
import SmallAss1 from "./CartAss";
import WeeklyDeal from "../Components/weeklyDeal";

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
  const [oldPhones, setOldPhones] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedBodyDamage, setSelectedBodyDamage] = useState("");
  const [selectedBodyDamage1, setSelectedBodyDamage1] = useState("");
  const [selectedBodyDamage2, setSelectedBodyDamage2] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://shy-puce-cheetah-hose.cyclic.app/old"
      );
      const data = await response.json();
      setOldPhones(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleModelChange = (event) => {
    const selectedModel = event.target.value;
    setSelectedModel(selectedModel);
    const selectedPhone = oldPhones.find(
      (phone) => phone.modelName === selectedModel
    );
    setSelectedBodyDamage(selectedPhone?.bodyDamage || "");
    setSelectedBodyDamage1(selectedPhone?.returnNoDamage || "");
    setSelectedBodyDamage2(selectedPhone?.screenDamage || "");
  };

  let condition;
  if (selectedBodyDamage !== "" && selectedModel !== "") {
    condition = "No Body Damange";
  } else if (selectedBodyDamage1 !== "" && selectedModel !== "") {
    condition = "Only body damage";
  } else if (selectedBodyDamage2 !== "" && selectedModel !== "") {
    condition = "Screen Damange";
  } else if (selectedModel=="") {
    condition = "No data";
  }
  console.log(selectedModel);

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
    mobileCondition,
    oldmobileModel,
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
        oldmobileModel: oldmobileModel,
        mobileCondition: mobileCondition,
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

  console.log(selectedModel);
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
                  oldmobileModel: selectedModel,
                  mobileCondition: condition,
                  productId: product._id,
                })
              }
            >
              Buy Now
            </Button>
          </Box>
        </Box>
      </Box>

      {/* ^^^^^^^^^^^^^^^^^^^^^^^^ Header &&&&&&&&&&&&&&&&&&&&&&&& */}
      <Box mt={["13%", "13%", "3%"]}>
        <Heading fontSize={"30px"}>
          Exchange Your Old Phone &Get ₹2200.00-₹57800.00 credit towards your
          new iPhone.
        </Heading>

        <Box
          display={"flex"}
          flexDirection={["column", "column", "row"]}
          gap={"20px"}
          mt={["14%", "14%", "4%"]}
        >
          <Box
            w={["100%", "100%", "30%"]}
            bg="#edf2f7"
            padding={"10px"}
            textAlign={"left"}
            p={"0px 28px"}
          >
            <Heading fontSize={"20px"} m="5% 0" textAlign={"left"}>
              Old Phone will be rejected during pickup if
            </Heading>
            <UnorderedList textAlign={"left"}>
              <ListItem>Phone is not working condition</ListItem>
              <ListItem>
                IMIEI number does not match or Automated verification on Amazon
                app fails
              </ListItem>
              <ListItem>Screen lock or icloud lock is not disable</ListItem>
            </UnorderedList>
            <Heading fontSize={"20px"} m="5% 0">
              Exchange tip
            </Heading>
            <UnorderedList mb="100%">
              <ListItem>
                if old phone is rejected during pickup,you can pay the exchange
                dicount amount at the time of selivery by cash or card and keep
                the new phone
              </ListItem>
            </UnorderedList>
          </Box>

          <Box w={["100%", "100%", "60%"]} padding={"5px"}>
            <Heading fontSize={"16px"} m="1% 0" textAlign={"left"}>
              Exchange your old product
            </Heading>
            <Heading fontSize={"20px"} m="1% 0 2% 0" textAlign={"left"}>
              Which phone would you like to exchnage ?
            </Heading>

            <Select mt="2%" w={"sm"} variant="filled" placeholder="Apple" />
            <Select
              value={selectedModel}
              onChange={handleModelChange}
              mt="2%"
              w={"sm"}
              variant="filled"
              placeholder="Apple"
            >
              {oldPhones.map((oldPhone, index) => (
                <option key={index} value={oldPhone.modelName}>
                  {oldPhone.modelName}
                </option>
              ))}
            </Select>
            <Heading fontSize={"22px"} mt="5%" textAlign={"left"}>
              Please Select Your phone condition
            </Heading>
            <UnorderedList>
              <ListItem textAlign={"left"}>
                If conditions of your old phone doesn't match as declared below,
                you can still get the partial discount,by paying diffrence in
                discount to our delivery agent
              </ListItem>
              <ListItem textAlign={"left"}>
                If your old phone falls verification at time of pickup,you can
                pay the exchange discount amount by Card or Cash and still get
                thr new phone delivered.
              </ListItem>
            </UnorderedList>

            {selectedModel && (
              <Box
                mt={["12%", "12%", "1%"]}
                display="flex"
                flexDirection={["column", "column", "row"]}
                border="1px solid #c1c1c1"
                borderRadius="20px"
                p="20px"
                gap={["20px", "20px", "30px"]}
              >
                <Box
                  borderRight={["none", "none", "1px solid #c1c1c1"]}
                  padding="10px"
                  textAlign="left"
                  w={["100%", "100%", "32%"]}
                >
                  <Box mb="5%" display="flex">
                    <input type="radio" />
                    <Heading
                      fontSize={["18px", "18px", "20px"]}
                      textAlign="left"
                      pl="5px"
                    >
                      No damage
                    </Heading>
                  </Box>
                  <Heading
                    mb="5%"
                    fontSize={["16px", "16px", "18px"]}
                    color="red"
                    pl="20px"
                    textAlign="left"
                  >
                    ₹ {selectedBodyDamage1}
                  </Heading>
                  <Text
                    color="gray"
                    fontSize={["12px", "12px", "13px"]}
                    fontWeight="700"
                    pl="20px"
                  >
                    No damage on body (dents, cracks) or screen (discoloration,
                    dead pixel, cracks, spot, lines)
                  </Text>
                </Box>
                <Box
                  borderRight={["none", "none", "1px solid #c1c1c1"]}
                  mt={["15px", "15px", "0"]}
                  w={["100%", "100%", "30%"]}
                  pr={["0", "0", "5px"]}
                >
                  <Box mb="5%" display="flex">
                    <input type="radio" />
                    <Heading fontSize={["18px", "18px", "20px"]} pl="2px">
                      Only body damage
                    </Heading>
                  </Box>
                  <Heading
                    mb="5%"
                    fontSize={["16px", "16px", "18px"]}
                    color="red"
                    pl={["12px", "12px", "16px"]}
                    textAlign="left"
                  >
                    ₹ {selectedBodyDamage}
                  </Heading>
                  <Text
                    color="gray"
                    fontSize={["12px", "12px", "13px"]}
                    fontWeight="700"
                    pl={["8px", "8px", "12px"]}
                    pr={["0", "0", "10px"]}
                    textAlign="left"
                  >
                    Cracks or dents on body phone de-shaped
                  </Text>
                  <Box display="flex" justifyContent="space-between">
                    <Image
                      boxSize="40px"
                      src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOO1JDPUNwcPiqzHYhaL_zpJA0Ymlr6mD9sSgTPad_JYdrk-o"
                      alt="Image 1"
                    />
                    <Image
                      boxSize="40px"
                      src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOO1JDPUNwcPiqzHYhaL_zpJA0Ymlr6mD9sSgTPad_JYdrk-o"
                      alt="Image 2"
                    />
                    <Image
                      boxSize="40px"
                      src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOO1JDPUNwcPiqzHYhaL_zpJA0Ymlr6mD9sSgTPad_JYdrk-o"
                      alt="Image 3"
                    />
                    <Image
                      boxSize="40px"
                      src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOO1JDPUNwcPiqzHYhaL_zpJA0Ymlr6mD9sSgTPad_JYdrk-o"
                      alt="Image 4"
                    />
                  </Box>
                </Box>
                <Box padding={"10px"} w={["100%", "100%", "28%"]} p={"10px"}>
                  <Box mb="5%" display={"flex"}>
                    <input type="radio" />{" "}
                    <Heading fontSize={["18px", "18px", "20px"]} pl={"5px"}>
                      Screen damage
                    </Heading>
                  </Box>
                  <Heading
                    mb="5%"
                    fontSize={["16px", "16px", "18px"]}
                    color={"red"}
                    pl={"20px"}
                    textAlign={"left"}
                  >
                    ₹ {selectedBodyDamage2}
                  </Heading>
                  <Text
                    color={"gray"}
                    fontSize={["12px", "12px", "13px"]}
                    fontWeight={"700"}
                    textAlign={"left"}
                    pl={"13px"}
                  >
                    Cracks, discoloration, dead pixel, spot or lines on screen.
                    <Text fontSize={"14px"} fontWeight={"800"}>
                      (Select this if 'only screen' or 'screen & body damage')
                    </Text>
                  </Text>
                  <Box display="flex" justifyContent="space-between">
                    <Image
                      boxSize="40px"
                      src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOO1JDPUNwcPiqzHYhaL_zpJA0Ymlr6mD9sSgTPad_JYdrk-o"
                      alt="Image 1"
                    />
                    <Image
                      boxSize="40px"
                      src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOO1JDPUNwcPiqzHYhaL_zpJA0Ymlr6mD9sSgTPad_JYdrk-o"
                      alt="Image 2"
                    />
                    <Image
                      boxSize="40px"
                      src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOO1JDPUNwcPiqzHYhaL_zpJA0Ymlr6mD9sSgTPad_JYdrk-o"
                      alt="Image 3"
                    />
                    <Image
                      boxSize="40px"
                      src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOO1JDPUNwcPiqzHYhaL_zpJA0Ymlr6mD9sSgTPad_JYdrk-o"
                      alt="Image 4"
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        <Box m="6% 0">
          <Heading fontSize={"30px"} textAlign={"left"}>
            AppleCare+ coverage. Protect your new iPhone.
          </Heading>

          <Box
            p={"10px"}
            mt={["8%", "8%", "2%"]}
            display={"grid"}
            gridTemplateColumns={[
              "repeat(1,1fr)",
              "repeat(1,1fr)",
              "repeat(2,1fr)",
            ]}
            gap={"20px"}
          >
            <Box
              borderRadius={"20px"}
              padding={"10px"}
              border={"1px solid #c1c1c1"}
              pt={"10px"}
            >
              <Box display={"flex"} gap={"5px"} pl={"20px"} pt={"10px"}>
                <AiFillApple color="red" fontSize={"19px"} />
                <Heading fontSize={"19px"}>AppleCare+</Heading>
              </Box>
              <Text
                color={"gray"}
                fontSize={"17px"}
                fontWeight={"600"}
                textAlign={"left"}
                pl={"25px"}
                pt={"10px"}
              >
                From ₹ 4817.00/mo.
              </Text>
              <Text
                color={"gray"}
                fontSize={"17px"}
                fontWeight={"600"}
                textAlign={"left"}
                pl={"25px"}
              >
                or MRP ₹28900(inc.of all taxes)
              </Text>
              <br />
              <hr />
              <UnorderedList mt="2%" pl={"10px"}>
                <Text
                  color={"gray"}
                  fontSize={"14px"}
                  fontWeight={"600"}
                  textAlign={"left"}
                  pl={"22px"}
                  pt={"10px"}
                >
                  <ListItem>
                    Get unlimited repairs for accidental damage
                    protection,Apple-certified repairs,and priority access to
                    Apple expert.
                  </ListItem>
                  <br />
                </Text>
              </UnorderedList>
            </Box>
            <Box
              borderRadius={"20px"}
              padding={"10px"}
              border={"1px solid #c1c1c1"}
              p={"10px"}
              pt={"10px"}
            >
              <Heading
                fontSize={"19px"}
                textAlign={"left"}
                pl={"10px"}
                pt={"10px"}
              >
                No AppleCare+Coverage
              </Heading>
            </Box>
          </Box>
        </Box>

        <Box mb={["25%", "25%", "15%"]}>
          <Heading fontSize={"30px"}>Choose Accessories</Heading>

          <SmallAss1 />
        </Box>

        <Box
          mb={["15%", "15%", "10%"]}
          bg="#edf2f7"
          display={"grid"}
          p="10px"
          gridTemplateColumns={[
            "repeat(1,1fr)",
            "repeat(1,1fr)",
            "repeat(3,1fr)",
          ]}
        >
          <Box padding={"20px"} textAlign={"center"}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <BiCube fontSize={"59px"} bg="#c1c1c1" />
            </Box>
            <Heading mt="3%" fontSize={"20px"}>
              Free delivery and pickup
            </Heading>
            <Text mt="1%">
              Get free delivery or pick up at your Apple Store
            </Text>
            <Box
              justifyContent={"center"}
              alignItems={"center"}
              mt="1%"
              color={"blue"}
              display={"flex"}
              gap={"2px"}
            >
              <a>Learn more</a>
              <IoIosArrowForward fontSize={"14px"} />
            </Box>
          </Box>
          <Box padding={"20px"} textAlign={"center"}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <TbCoinRupee fontSize={"59px"} />
            </Box>
            <Heading mt="3%" fontSize={"20px"}>
              EMI available
            </Heading>
            <Text mt="1%">
              Get free delivery or pick up at your Apple Store
            </Text>
            <Box
              justifyContent={"center"}
              alignItems={"center"}
              mt="1%"
              color={"blue"}
              display={"flex"}
              gap={"2px"}
            >
              <a>Learn more</a>
              <IoIosArrowForward fontSize={"14px"} />
            </Box>
          </Box>
          <Box padding={"20px"} textAlign={"center"}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <RiWechatLine fontSize={"59px"} />
            </Box>
            <Heading mt="3%" fontSize={"20px"}>
              Get help buying
            </Heading>
            <Text mt="1%">
              Get free delivery or pick up at your Apple Store
            </Text>
            <Box
              justifyContent={"center"}
              alignItems={"center"}
              mt="1%"
              color={"blue"}
              display={"flex"}
              gap={"2px"}
            >
              <a>Learn more</a>
              <IoIosArrowForward fontSize={"14px"} />
            </Box>
          </Box>
        </Box>

        <WeeklyDeal />
      </Box>
    </Box>
  );
};

export default Header;
