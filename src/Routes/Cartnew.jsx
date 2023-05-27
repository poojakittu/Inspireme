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
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CartProduct from "../Components/Cart/CartProduct";
import AddressBook from "./AddressBook";
const Cartnew = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

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
            <Text>
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
            {/* <Box bg="whitesmoke" borderRadius="10px" m="15px 30px">
          <Heading as="h5" m="10px 0px" size="sm">
            BONUS OFFERS
          </Heading>

          <Flex flexDirection="column" w="100%">
            <Flex m="15px 30px">
              <Image
                border="1px solid black"
                borderRadius="5px"
                width="36px"
                height="48px"
                src=""
                alt=""
              />
              <Flex flexDirection="column" w="100%" ml="10px">
                <Text
                  alignSelf="flex-start"
                  h="50%"
                  line-height="14px"
                  fontSize="12px"
                >
                  cartImages.description
                </Text>
                <Heading alignSelf="flex-start" h="50%" as="h6" size="xs">
                  cartImages[0].price
                </Heading>
              </Flex>
              <button
                // onClick={() => dispatch(addToCart(cartImages[0]))}
                style={{
                  width: "180px",
                  color: "white",
                  backgroundColor: "black",
                  borderRadius: "5px",
                  margin: "6px",
                }}
              >
                ADD TO CART
              </button>
            </Flex>

            <div
              style={{
                borderTop: "1px dashed grey",
                width: "90%",
                margin: "auto",
              }}
            ></div>

            <Flex m="15px 30px">
              <Image
                border="1px solid black"
                borderRadius="5px"
                width="36px"
                height="48px"CartProduc
                src=""
                alt=""
              />
              <Flex
                justifyContent="space-between"
                ml="10px"
                flexDirection="column"
                w="100%"
              >
                <Text
                  alignSelf="flex-start"
                  h="50%"
                  line-height="14px"
                  fontSize="12px"
                >
                  cartImages[1].description
                </Text>
                <Heading alignSelf="flex-start" h="50%" size="xs">
                  cartImages[1].price
                </Heading>
              </Flex>
              <button
                style={{
                  width: "180px",
                  color: "white",
                  backgroundColor: "black",
                  borderRadius: "5px",
                  margin: "6px",
                }}
              >
                ADD TO CART
              </button>
            </Flex>
          </Flex>
        </Box> */}
            <Heading as="h5" m="10px 0px" size="sm">
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
                  {/* {isdiscount ? (
                <Flex justifyContent="space-between">
                  <Text>Discount</Text>{" "}
                  <Text color="green">-₹{discount}</Text>
                </Flex>
              ) : (
                <div></div>
              )} */}
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
          </Flex>
        </Box>
      </div>
    );
  }
};

export default Cartnew;
