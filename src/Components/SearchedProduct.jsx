import { useState, useEffect } from "react";
import { Box, Button, Flex, Image, Text, useToast, Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription, } from "@chakra-ui/react";
    import { withRouter } from "react-router-dom";
  import { BiShoppingBag } from "react-icons/bi";

  import {
    
    Grid,
    Skeleton,
  } from "@chakra-ui/react";
 
  import "../style/product.css";
  
 
  import { Link } from "react-router-dom";
  import axios from "axios";
  import Filters from "../Routes/Filters";
 
const SearchedProduct = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast =  useToast()
  const query = localStorage.getItem("searchquery");
  useEffect(() => {
   
    console.log(query)
    setSearchQuery(query);

    async function fetchSearchResults() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`https://erin-tough-viper.cyclic.app/product/allproductdata?q=${query}&t=${Date.now()}`);
       console.log(response.data)
        setSearchResults(response.data.data);
        setLoading(false)
      } catch (error) {
        console.error(error);
        toast({
          title: "An error occurred.",
          description: "Could not fetch search results.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
    
    if (query) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  
  const handleAddToCart = ({productId, title, image, price, selectedColor}) => {
    const data = {
      productId:productId,
      title: title,
      image: image,
      price: price,
      color: "selectedColor", 
      size: "M", 
      shipping: "standard", 
      quantity: 1, 
    };
    const token = localStorage.getItem("token");
    
    axios.post("https://erin-tough-viper.cyclic.app/cart/add", data, {
  headers: {
    Authorization: `${token}`
  }
})
.then((response) => {
  toast({
    title: "Product Added Successfully!!",

    status: "success",

    isClosable: true,
    position: "top",
  })
})
.catch((error) => {
  toast({
    title: "Error In Adding Product To Cart!!",

    status: "error",

    isClosable: true,
    position: "top",
  })
});
  };

  return (
    <Box mt="140px">
      <h1>Search Results for "{searchQuery}"</h1>
      <div className="main">
        <Filters />
        {searchResults&&searchResults?.length !== 0 ?
        <div className="products">
          {loading ? (
            <Box m="50px">
              <Grid gap="10px" templateColumns="repeat(4, 1fr)">
                <Skeleton height="314px" width="207px" />
                <Skeleton height="314px" width="207px" />
                <Skeleton height="314px" width="207px" />
                <Skeleton height="314px" width="207px" />
                <Skeleton height="314px" width="207px" />
                <Skeleton height="314px" width="207px" />
                <Skeleton height="314px" width="207px" />
              </Grid>
            </Box>
          ) : (
            searchResults?.map((e, i) => (
              <Box
                key={i}
                mb="1%"
                mt="2%"
                textAlign="center"
                line-spacing="0.05em"
                fontFamily="Montserrat"
                justifyContent="center"
                alignItems="center"
              >
                <Link to={`/product/${e._id}`}>
                  <Box overflow="hidden" h="318px">
                    <Image
                      className="productimg"
                      src={e.image}
                      h="318px"
                      w="237.12px"
                      mb="2%"
                      m="auto"
                    />
                  </Box>
                </Link>
                <Text
                  mb="2%"
                  color="#282828"
                  fontWeight={"400"}
                  lineHeight="17px"
                  fontSize="16px"
                >
                  {e.colour.length} color available
                </Text>
                <Text
                  mb="2%"
                  mt="2%"
                  color={"#AAAAAA"}
                  fontWeight={"400"}
                  lineHeight="12.19px"
                  fontSize="14px"
                >
                  {e.category}
                </Text>
                <Text
                  mb="2%"
                  color="#282828"
                  fontWeight={"400"}
                  lineHeight="17px"
                  fontSize="16px"
                >
                  {e.title}
                </Text>
                <Text
                  mb="1%"
                  fontWeight={"700"}
                  lineHeight="18px"
                  color="#282828"
                  fontSize="18px"
                >
                  Unit Price : {e.unitPrice}
                </Text>
                <Text
                  mb="1%"
                  fontWeight={"700"}
                  lineHeight="18px"
                  color="#282828"
                  fontSize="18px"
                >
                  Pack Price : {e.packedPrice}
                </Text>
                <Text mb="2%">{e.star}</Text>
                <Button
                  fontSize={12}
                  fontWeight={"bold"}
                  border="2px solid #282828"
                  gap="5px"
                  mt="2%"
                  borderRadius={"2px"}
                  onClick={() => handleAddToCart({
                    title: e.title,
                    image: e.image[0],
                    price: e.price,
                    color: "selectedColor",
                    size: "M", 
                    shipping: "standard", 
                    quantity: 1,
                    productId: e._id})}
                >
                  <BiShoppingBag /> ADD TO CART
                </Button>
              </Box>
            ))
          )}
        </div>
        : 
        
        <Box m="auto"  w="100%" textAlign="center"  >
          
          <Alert status='error'>
  <AlertIcon />
  <AlertTitle>No Product Availble For Selected Filter !</AlertTitle>
  <AlertDescription>Change The Selected Filter To View Products.</AlertDescription>
</Alert>
        </Box>
        
}
      </div>
    </Box>
  );
};

export default SearchedProduct;
