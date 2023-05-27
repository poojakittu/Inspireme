import React from 'react'
import { Box, 
   
     Heading, 
     Text,
     Icon, 
 } from '@chakra-ui/react'
import Carousels from './Carousels'

import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const BestProductsSection = () => {
    const [bestproducts,setBestProducts]=useState([])
  
    
   
      const fetchProducts = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get('https://erin-tough-viper.cyclic.app/product/allproductdata?category=women&title=kurta&rating=3.9', {
            headers: {
              Authorization: `${token}`
            }
          });
          setBestProducts(response.data.data);
        } catch (error) {
          console.error(error);
        }
      };
      
    

     useEffect(()=>{
        fetchProducts();
     },[])


  return (
    <>
        <Text mt="5%">RECOMMENDED FOR YOU</Text>
        <Heading color="blue.700" mb="2%">BEST PRODUCTS</Heading>

        <Box w="98%" m="auto" >
            {bestproducts.length>0 ? 
        <Carousels items={bestproducts}></Carousels>
        :
        <Text>No Data Available</Text>
            }
        </Box>
       
        

       
    </>
  )
}

export default BestProductsSection