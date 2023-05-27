import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Input,
  Textarea,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import axios from "axios";

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [modelName, setModelName] = useState("");
  const [networkServiceProvider, setNetworkServiceProvider] = useState("");
  const [os, setOs] = useState("");
  const [technology, setTechnology] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [phoneColours, setPhoneColours] = useState([
    { color: "", img1: "", img2: "", img3: "", img4: "" },
  ]);
  const [highlights, setHighlights] = useState("");

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setCategory(value.split(","));
  };

  const handlePhoneColourChange = (e, index) => {
    const { name, value } = e.target;
    const updatedColours = [...phoneColours];
    updatedColours[index][name] = value;
    setPhoneColours(updatedColours);
  };

  const handleAddColour = () => {
    setPhoneColours([
      ...phoneColours,
      { color: "", img1: "", img2: "", img3: "", img4: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      price,
      subTitle,
      brand,
      modelName,
      networkServiceProvider,
      os,
      technology,
      description,
      category,
      phoneColour: phoneColours,
      highlights,
    };

    try {
      // Send the form data to the server
      await axios.post("http://localhost:5000/product/add", formData);
      console.log("Form submitted successfully");
      // Reset the form fields
      setTitle("");
      setPrice("");
      setSubTitle("");
      setBrand("");
      setModelName("");
      setNetworkServiceProvider("");
      setOs("");
      setTechnology("");
      setDescription("");
      setCategory([]);
      setPhoneColours([{ color: "", img1: "", img2: "", img3: "", img4: "" }]);
      setHighlights("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box p={4} width={"30%"} m={"auto"}>
      <Text fontSize="2xl" mb={4}>
        Product Form
      </Text>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl id="price" isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>

          <FormControl id="subTitle" isRequired>
            <FormLabel>Sub Title</FormLabel>
            <Input
              type="text"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </FormControl>

          <FormControl id="brand" isRequired>
            <FormLabel>Brand</FormLabel>
            <Input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </FormControl>

          <FormControl id="modelName" isRequired>
            <FormLabel>Model Name</FormLabel>
            <Input
              type="text"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />
          </FormControl>

          <FormControl id="networkServiceProvider" isRequired>
            <FormLabel>Network Service Provider</FormLabel>
            <Input
              type="text"
              value={networkServiceProvider}
              onChange={(e) => setNetworkServiceProvider(e.target.value)}
            />
          </FormControl>

          <FormControl id="os" isRequired>
            <FormLabel>OS</FormLabel>
            <Input
              type="text"
              value={os}
              onChange={(e) => setOs(e.target.value)}
            />
          </FormControl>

          <FormControl id="technology" isRequired>
            <FormLabel>Technology</FormLabel>
            <Input
              type="text"
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
            />
          </FormControl>

          <FormControl id="description" isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl id="category" isRequired>
            <FormLabel>Category</FormLabel>
            <Input
              type="text"
              value={category}
              onChange={handleCategoryChange}
            />
          </FormControl>

          <FormControl id="phoneColours" isRequired>
            <FormLabel>Phone Colours</FormLabel>
            {phoneColours.map((phoneColour, index) => (
              <Grid templateColumns="repeat(2, 1fr)" gap={4} key={index}>
                <FormControl>
                  <FormLabel>Color</FormLabel>
                  <Input
                    type="text"
                    name="color"
                    value={phoneColour.color || ""}
                    onChange={(e) => handlePhoneColourChange(e, index)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Image 1</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhoneColourChange(e, index)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Image 2</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhoneColourChange(e, index)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Image 3</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhoneColourChange(e, index)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Image 4</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhoneColourChange(e, index)}
                  />
                </FormControl>
              </Grid>
            ))}
            <Button onClick={handleAddColour}>Add Colour</Button>
          </FormControl>

          <FormControl id="highlights" isRequired>
            <FormLabel>Highlights</FormLabel>
            <Input
              type="text"
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ProductForm;
