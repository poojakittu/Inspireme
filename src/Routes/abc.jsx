import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the data from your backend API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/product/alldata"); // Change the URL to your actual API endpoint
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      {products?.map((product) => (
        <Box key={product._id} borderWidth="1px" p="4" borderRadius="md" mb="4">
          <Text fontSize="lg" fontWeight="bold">
            {product.title}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {product.subTitle}
          </Text>
          <Text fontSize="sm">Price: {product.price}</Text>
          <Text fontSize="sm">Brand: {product.brand}</Text>
          <Text fontSize="sm">Model Name: {product.modelName}</Text>
          <Text fontSize="sm">
            Network Service Provider: {product.networkServiceProvider}
          </Text>
          <Text fontSize="sm">OS: {product.os}</Text>
          <Text fontSize="sm">Technology: {product.technology}</Text>
          <Text fontSize="sm">Description: {product.description}</Text>
          <Text fontSize="sm">Category: {product.category.join(", ")}</Text>

          {/* Render phone colours */}
          <Box mt="2">
            <Text fontSize="sm" fontWeight="bold">
              Phone Colours:
            </Text>
            {product.phoneColour.map((colour,image) => (
              <Box key={colour.color} display="flex" alignItems="center" mt="2">
                <Box
                  width="20px"
                  height="20px"
                  borderRadius="full"
                  backgroundColor={colour.color}
                  marginRight="2"
                />
                <Text>{colour.color}</Text>
              </Box>
            ))}
          </Box>

          {/* Render highlights */}
          <Box mt="2">
            <Text fontSize="sm" fontWeight="bold">
              Highlights:
            </Text>
            {product.Highlights.map((highlight) => (
              <Text key={highlight} fontSize="sm" ml="2">
                {highlight}
              </Text>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default App;
