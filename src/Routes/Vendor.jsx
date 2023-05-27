import React, { useEffect, useState } from 'react'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  UnorderedList,
  ListItem,
  SimpleGrid,
  Grid,
  GridItem,
  Input,
  FormControl,
  Textarea,
  useDisclosure,
  useToast,
  Center, // add Center component from Chakra UI
  CircularProgress, // add CircularProgress component from Chakra UI
} from "@chakra-ui/react";
import {
  Box,
  Icon,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import VendorBox from './VendorBox';
import { MdBookmarkBorder } from "react-icons/md";
import axios from 'axios';

const Vendor = () => {

  const [vendordata, setVendorData] = useState([])
  const [topvendordata, setTopVendorData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://erin-tough-viper.cyclic.app/vendor/');
      setVendorData(response.data.data);
      setLoading(false) // set loading to false once data is fetched
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  };

  const fetchTopProducts = async () => {
    try {
      const response = await axios.get('https://erin-tough-viper.cyclic.app/vendor?rating=4');
      setTopVendorData(response.data.data);
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchTopProducts();
  }, [])

  return (
    <Box mt="140px">
      <Tabs w="98%" m="auto">
        <TabList
          color="#D9D9D9"
          fontSize={"18px"}
          lineHeight="22px"
          fontFamily="Montserrat"
        >
          <Tab fontWeight={"700"}><MdBookmarkBorder/> POPULAR VENDOR</Tab>
          <Tab fontWeight={"700"}><MdBookmarkBorder/> ALL VENDORS</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {loading ? ( // render loading spinner if data is still being fetched
              <Center height="100vh">
                <CircularProgress isIndeterminate color="blue.500" />
              </Center>
            ) : (
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                }}
                gap="10px"
              >
                {topvendordata &&
                  topvendordata?.map((el) => (
                    <VendorBox title={el.name} image={el.img} id={el._id} numReviews={el.comment} rating={el.rating} />
                  ))}
              </Grid>
            )}
          </TabPanel>
          <TabPanel>
          {loading ? ( 
              <Center height="100vh">
                <CircularProgress isIndeterminate color="blue.500" />
              </Center>
            ) : (
                    <Grid
                templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap="10px"
              
              
            >
            {vendordata &&
                vendordata?.map((el) => (
          <VendorBox title={el.name} image={el.img} id={el._id} numReviews={el.comment} rating={el.rating} />
          ))}
          </Grid>
           )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default Vendor
