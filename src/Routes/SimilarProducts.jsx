import React from 'react'
import { Box, 
   
     Heading, 
     Text,
     Icon,
     useToast, 
 } from '@chakra-ui/react'
import Carousels from '../Components/Carousels'

import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const SimilarProduct = ({query}) => {
  
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast =  useToast()
    useEffect(() => {
   
        console.log(query)
      
    
        async function fetchSearchResults() {
          try {
         
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
        
      
          fetchSearchResults();
        
      }, [query]);


  return (
    <>
        <Text mt="5%">RECOMMENDED FOR YOU</Text>
        <Heading color="blue.700" mb="2%">Similar Products</Heading>

        <Box w="98%" m="auto" >
        <Carousels items={searchResults}></Carousels>
        </Box>
       
        

       
    </>
  )
}

export default SimilarProduct;