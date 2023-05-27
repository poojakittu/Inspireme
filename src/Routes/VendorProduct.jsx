import React from "react";
import { Box,  Flex,  Heading,  Image, Text, 
   } from "@chakra-ui/react";


import { useState } from "react";
import {
 
  
  Grid,
  Skeleton,
} from "@chakra-ui/react";
import { BsFillPeopleFill } from "react-icons/bs";
import "../style/product.css";



import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const VendorProduct = () => {
    const { id } = useParams();
    const [vendordata, setVendorData] = useState([])
    const [vendorname, setVendorName] = useState("")
const[loading, setLoading] = useState(true)

    const fetchProducts = async () => {
        try {
        
          const response = await axios.get(`https://erin-tough-viper.cyclic.app/product/vendorwisedata/${id}`);
          setLoading(false)
          setVendorData(response.data.data);

        } catch (error) {
            setLoading(false)
          console.error(error);
        }
      };

      const fetchVendorName = async () => {
        try {
        
          const response = await axios.get(`https://erin-tough-viper.cyclic.app/vendor/${id}`);
         
          setVendorName(response.data.data);

        } catch (error) {
           
          console.error(error);
        }
      };

      

    

      useEffect(()=>{
        fetchProducts();
        fetchVendorName();
      },[])

  return (
    <Box mt="140px">
        {vendorname&&vendorname?.map((el)=>(
            <Flex m="auto" w="76%" gap="10px" justifyContent="left" alignItems="center">
            <BsFillPeopleFill />
            <Heading justifyContent="center" alignItems="center" fontSize="22px" fontWeight="500" > {el.name}</Heading>
            </Flex>
        ))

        }
       <div className="main">
      
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
            vendordata?.map((e, i) => (
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
                  Unit Price : ₹ {e.unitPrice}
                </Text>
                <Text
                  mb="1%"
                  fontWeight={"700"}
                  lineHeight="18px"
                  color="#282828"
                  fontSize="18px"
                >
                  Pack Price : ₹ {e.packedPrice}
                </Text>
                <Text mb="2%">{e.star}</Text>
               
              </Box>
            ))
          )}
        </div>
       
      </div>
    </Box>
  )
}

export default VendorProduct
