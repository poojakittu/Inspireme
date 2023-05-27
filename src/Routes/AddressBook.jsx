import {
  Box,
  Heading,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function AddressBook() {
  const toast = useToast();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [isAddAddressModalOpen2, setIsAddAddressModalOpen2] = useState(false);
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
      const response = await fetch("http://localhost:5000/address", {
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

    const url = `http://localhost:5000/address/delete/${id}`;

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
      const response = await fetch("http://localhost:5000/address/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(newAddress),
      });

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
          "Your address has been added Please Select Delivery Adress from Select button",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      {addresses.length > 0 ? (
        <Box>
          <Heading size="md" mb={4}>
            Select Address / Add Address
          </Heading>
          <Flex m="auto" alignItems="center" justifyContent="center" gap="40px">
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
        <Box mt={8} textAlign="left" borderWidth="1px" borderRadius="lg" p={4}>
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
          <Text>Alternate Number:{selectedAddress.alternatephone}</Text>
        </Box>
      )}
    </Box>
  );
}
export default AddressBook;
