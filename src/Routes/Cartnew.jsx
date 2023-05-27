import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  Heading,
  Text,
  Image,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  Input,
  FormLabel,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import "@fontsource/poppins";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CartProduct from "../Components/Cart/CartProduct";
import AddressBook from "./AddressBook";
const Cartnew = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [promoCode, setPromoCode] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary actions with the promoCode value
    console.log(promoCode);
  };

  const handleChange = (event) => {
    setPromoCode(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const response = await axios.get(
        "https://shy-puce-cheetah-hose.cyclic.app/cart",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const updateQuantity = async (id, quantity) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const data = {
      quantity: quantity,
    };
    const response = await axios.patch(
      `https://shy-puce-cheetah-hose.cyclic.app/cart/update/${id}`,
      data,
      config
    );
    console.log(response);
    fetchData(); // call fetchData after updating quantity
  };

  const updateTotal = (products) => {
    let t = products?.reduce((a, e, i) => a + e.price * e.quantity, 0);
    setTotal(t);
  };

  const [total, setTotal] = useState(0);
  localStorage.setItem("productlength", JSON.stringify(products.length));
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    updateTotal(products);
  }, [products]);

  if (total == 0) {
    return (
      <div style={{ marginTop: "100px" }}>
        <Box
          m="15px"
          bg="white"
          borderRadius="10px"
          display="flex"
          flexDirection="column"
          gap="10px"
          p="20px"
        >
          <Box m="auto" w="fit-content">
            {" "}
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"
              alt=""
            />
          </Box>
          <Box>
            <Text fontFamily={"Poppins"}>
              Hey! It's lonely here.
              <br />
              Your bag seems to have no company.
              <br />
              Why not add some products?
            </Text>
          </Box>
          <Box w="fit-content" m="auto">
            <Link to="/">
              {" "}
              <button
                style={{
                  backgroundColor: "black",
                  color: "white",
                  width: "150px",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                SHOP NOW
              </button>
            </Link>
          </Box>
        </Box>
      </div>
    );
  } else {
    return (
      <div style={{ marginTop: "120px" }}>
        <Flex bg="white" h="50px" alignItems="center">
          <Box ml="30px" mr="15px">
            <Link to="/">Home</Link>
          </Box>
          <MdKeyboardArrowRight />
          <Box ml="15px" fontWeight="600">
            Cart
          </Box>
          <Spacer />
        </Flex>
        <Box
          m="15px"
          bg="white"
          borderRadius="10px"
          display="flex"
          flexDirection={{ lg: "row", sm: "column", md: "row", base: "column" }}
        >
          <Flex
            flexDirection="column"
            w={{ lg: "50%", md: "50%", sm: "100%", base: "100%" }}
          >
            <Heading as="h5" m="10px 0px" size="sm" fontFamily={"Poppins"}>
              CART SUMMARY
            </Heading>
            <Box
              bg="white"
              borderRadius="10px"
              m="12px 30px"
              border="1px solid #e4e4e4"
            >
              {products.map((el) => (
                <CartProduct
                  key={el.id}
                  id={el._id}
                  image={el.image}
                  title={el.title}
                  price={el.price}
                  quantity={el.quantity}
                  updateQuantity={updateQuantity}
                />
              ))}
            </Box>
            <Box>
              <Heading as="h5" m="10px 0px" size="sm">
                PRICE DETAILS
              </Heading>
              <Box
                bg="white"
                borderRadius="10px"
                m="12px 30px"
                border="1px solid #e4e4e4"
                p="10px"
              >
                <Flex flexDirection="column" w="100%">
                  <Flex justifyContent="space-between">
                    <Text>Sub Total</Text> <Text>₹{total}</Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text>Tax</Text> <Text></Text>₹getTax
                  </Flex>

                  <Flex justifyContent="space-between">
                    <Text>Shipping</Text>

                    <Text color="green">ship</Text>
                  </Flex>
                </Flex>
                <div
                  style={{
                    borderTop: "1px dashed grey",
                    width: "100%",
                    alignSelf: "flex-end",
                    margin: "10px auto",
                  }}
                ></div>
                <Flex justifyContent="space-between">
                  <Text fontWeight="600" fontSize="20px">
                    Total
                  </Text>
                  <Text fontWeight="600" fontSize="20px">
                    final price
                  </Text>
                </Flex>
              </Box>
              <Button colorScheme="blue">Place Order</Button>
            </Box>
          </Flex>
          <Flex
            flexDirection="column"
            w={{ lg: "50%", md: "50%", sm: "100%", base: "100%" }}
          >
            <br />

            <Box
              bg="white"
              borderRadius="10px"
              m="35px 30px"
              border="1px solid #e4e4e4"
              p="15px"
            >
              <AddressBook />
            </Box>

            <Box
              bg="white"
              borderRadius="10px"
              m="35px 30px"
              border="1px solid #e4e4e4"
              p="15px"
            >
              <Heading fontSize={"21px"}>Promo Code*</Heading>
              <Box
                as="form"
                onSubmit={handleSubmit}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
                pt={"20px"}
                pb={"20px"}
              >
                <Input
                  value={promoCode}
                  onChange={handleChange}
                  placeholder="Enter promo code"
                  variant="filled"
                  size="md"
                  maxWidth="300px"
                  mr={2}
                />
                <Button type="submit" colorScheme="green">
                  Submit
                </Button>
              </Box>
            </Box>
          </Flex>
        </Box>
      </div>
    );
  }
};

export default Cartnew;
