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
  Stack,
  Select,
} from "@chakra-ui/react";
import "@fontsource/poppins";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CartProduct from "../Components/Cart/CartProduct";

const Cartnew = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoCode1, setPromoCode1] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [isAddAddressModalOpen2, setIsAddAddressModalOpen2] = useState(false);
  const [name, setname] = useState("");
  const [total, setTotal] = useState(0);
  

  const [newAddress, setNewAddress] = useState({
    name: "",
    Mobile: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatephone: "",
    addresstype: "",
  });
  const token = localStorage.getItem("token");

  const fetchAddresses = async () => {
    try {
      const response = await fetch("https://shy-puce-cheetah-hose.cyclic.app/address", {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAddresses(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [token]);

  const handleAddressSelect = (address) => {
    try {
      setSelectedAddress(address);
      setname(address.name);
      setIsAddAddressModalOpen2(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddAddress = () => {
    setIsAddAddressModalOpen(true);
  };

  const handleAddAddressModalClose = () => {
    setIsAddAddressModalOpen(false);
  };

  const handleAddAddress2 = () => {
    setIsAddAddressModalOpen2(true);
  };

  const handleAddAddressModalClose2 = () => {
    setIsAddAddressModalOpen2(false);
  };

  const handleNewAddressChange = (event) => {
    setNewAddress({
      ...newAddress,
      [event.target.name]: event.target.value,
    });
  };

  const handleDelete = async (id) => {
    // replace with the actual token

    const url = `https://shy-puce-cheetah-hose.cyclic.app/address/delete/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        console.log("Hello");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Address deleted successfully!");
    } catch (error) {
      console.error("Error while deleting address:", error);
    }
  };
 

  const handleSubmit = async () => {
    try {
      // Check if name and address are filled
      if (!newAddress.name ) {
        // Display the toast notification for missing fields
        toast({
          title: "Incomplete Address",
          description: "Please enter your name ",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }else if (!newAddress.address) {
        // Display the toast notification for missing fields
        toast({
          title: "Incomplete Address",
          description: "Please enter your Address",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      else if (!newAddress.pincode) {
        // Display the toast notification for missing fields
        toast({
          title: "Incomplete Pincode",
          description: "Please enter your Pincode",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      else if (!newAddress.city) {
        // Display the toast notification for missing fields
        toast({
          title: "Incomplete City",
          description: "Please enter your City",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      else if (!newAddress.Mobile) {
        // Display the toast notification for missing fields
        toast({
          title: "Incomplete Mobile",
          description: "Please enter your Mobile",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      else if (!newAddress.state) {
        // Display the toast notification for missing fields
        toast({
          title: "Incomplete State",
          description: "Please enter your State",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
  
      const response = await fetch(
        "https://shy-puce-cheetah-hose.cyclic.app/address/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(newAddress),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      await fetchAddresses(); // Fetch addresses again after adding a new address
  
      setIsAddAddressModalOpen(false);
      setNewAddress({
        name: "",
        Mobile: "",
        pincode: "",
        locality: "",
        address: "",
        city: "",
        state: "",
        landmark: "",
        alternatephone: "",
        addresstype: "",
      });
  
      // Display the toast notification
      toast({
        title: "Address Added",
        description:
          "Your address has been added. Please select the delivery address from the Select button.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };


  const handleOrderClick = () => {
    if (!selectedAddress) {
      // Display the toast notification for missing selected address
      toast({
        title: "No Address Selected",
        description: "Please select an address for the order",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const orderData = {
      username: selectedAddress.name,
      Mobile: selectedAddress.Mobile,
      pincode: selectedAddress.pincode,
      locality: selectedAddress.locality,
      address: selectedAddress.address,
      city: selectedAddress.city,
      state: selectedAddress.state,
      landmark: selectedAddress.landmark,
      alternatephone: selectedAddress.alternatephone,
      addresstype: selectedAddress.addresstype,
      oldmobileModel: products[0].oldmobileModel,
      mobileCondition: products[0].mobileCondition,
      orderStatus: "Pending",
      shippingAddress: selectedAddress.address,
      totalprice: total,
      products: products.map((product) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        singleItemPrice: product.price,
        totalitemPrice: product.price * product.quantity,
        display: product.display,
        storage: product.storage,
        quantity: product.quantity,
        colour: product.color,
        status: "Pending",
      })),
      promoCode:promoCode1,
      addressId: selectedAddress._id,
    };

    const token = localStorage.getItem("token");

    axios
      .post("https://shy-puce-cheetah-hose.cyclic.app/order/add", orderData, {
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
        navigate("/orders")
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
  };

  const handleSubmit1 = (event) => {
    event.preventDefault();
    // Perform any necessary actions with the promoCode value
    setPromoCode1(promoCode);
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
                  key={el._id}
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
              <Button colorScheme="blue" onClick={handleOrderClick}>
                Place Order
              </Button>
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
              <Box>
                {addresses.length > 0 ? (
                  <Box>
                    <Heading size="md" mb={4}>
                      Select Address / Add Address
                    </Heading>
                    <Flex
                      m="auto"
                      alignItems="center"
                      justifyContent="center"
                      gap="40px"
                    >
                      <Button onClick={handleAddAddress} mb={4}>
                        Add Address
                      </Button>
                      <Button onClick={handleAddAddress2} mb={4}>
                        Select Address
                      </Button>
                    </Flex>
                  </Box>
                ) : (
                  <Box justifyContent="center">
                    <Heading size="md" mb={4}>
                      Add Address
                    </Heading>
                    <Button onClick={handleAddAddress} mb={4}>
                      Add Address
                    </Button>
                  </Box>
                )}
                <Modal
                  isOpen={isAddAddressModalOpen2}
                  onClose={handleAddAddressModalClose2}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Select The Address For Delivery</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {addresses.map((address) => (
                        <Box
                          key={address._id}
                          p={4}
                          textAlign="left"
                          borderWidth="1px"
                          borderRadius="lg"
                          mb={4}
                          cursor="pointer"
                          onClick={() => handleAddressSelect(address)}
                          bg={
                            selectedAddress?._id == address._id
                              ? "lightgreen"
                              : "gray.100"
                          }
                        >
                          <Text>
                            {address.name},{address.locality},{address.address},{" "}
                            {address.city}, {address.state}
                          </Text>
                          <Text>PinCode: {address.pincode}</Text>
                          <Text>Mobile Number: {address.Mobile}</Text>
                          <Button
                            colorScheme="red"
                            mt={4}
                            onClick={() => handleDelete(address._id)}
                          >
                            Remove
                          </Button>
                        </Box>
                      ))}
                    </ModalBody>
                  </ModalContent>
                </Modal>
                <Modal
                  isOpen={isAddAddressModalOpen}
                  onClose={handleAddAddressModalClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Add New Address</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Stack spacing={4}>
                        <FormControl>
                          <FormLabel>Name</FormLabel>
                          <Input
                            type="text"
                            name="name"
                            value={newAddress.name}
                            onChange={handleNewAddressChange}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Mobile</FormLabel>
                          <Input
                            type="tel"
                            name="Mobile"
                            value={newAddress.Mobile}
                            onChange={handleNewAddressChange}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Pincode</FormLabel>
                          <Input
                            type="text"
                            name="pincode"
                            value={newAddress.pincode}
                            onChange={handleNewAddressChange}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Locality</FormLabel>
                          <Input
                            type="text"
                            name="locality"
                            value={newAddress.locality}
                            onChange={handleNewAddressChange}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Address</FormLabel>
                          <Input
                            type="text"
                            name="address"
                            value={newAddress.address}
                            onChange={handleNewAddressChange}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>City</FormLabel>
                          <Input
                            type="text"
                            name="city"
                            value={newAddress.city}
                            onChange={handleNewAddressChange}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>State</FormLabel>
                          <Input
                            type="text"
                            name="state"
                            value={newAddress.state}
                            onChange={handleNewAddressChange}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Landmark</FormLabel>
                          <Input
                            type="text"
                            name="landmark"
                            value={newAddress.landmark}
                            onChange={handleNewAddressChange}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Alternate Phone</FormLabel>
                          <Input
                            type="tel"
                            name="alternatephone"
                            value={newAddress.alternatephone}
                            onChange={handleNewAddressChange}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Address Type</FormLabel>
                          <Select
                            name="addresstype"
                            value={newAddress.addresstype}
                            onChange={handleNewAddressChange}
                          >
                            <option value="home">Home</option>
                            <option value="work">Work</option>
                          </Select>
                        </FormControl>
                        <Button onClick={handleSubmit} colorScheme="blue">
                          Submit
                        </Button>
                      </Stack>
                    </ModalBody>
                  </ModalContent>
                </Modal>
                {selectedAddress && (
                  <Box
                    mt={8}
                    textAlign="left"
                    borderWidth="1px"
                    borderRadius="lg"
                    p={4}
                  >
                    <Heading fontWeight="450" fontSize="23px">
                      Deliver to this address
                    </Heading>
                    <Text>
                      {selectedAddress.name}, {selectedAddress.locality},{" "}
                      {selectedAddress.address}, {selectedAddress.city},{" "}
                      {selectedAddress.state}
                    </Text>
                    <Text>PinCode:{selectedAddress.pincode}</Text>
                    <Text>Mobile Number:{selectedAddress.Mobile}</Text>
                    <Text>
                      Alternate Number:{selectedAddress.alternatephone}
                    </Text>
                  </Box>
                )}
              </Box>
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
                onSubmit={handleSubmit1}
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
