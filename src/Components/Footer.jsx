import React from "react";
import {
  Flex,
  Box,
  UnorderedList,
  Text,
  List,
  ListItem,
  Grid,
  Heading,
  ListIcon,
} from "@chakra-ui/react";
import { FiMapPin } from "react-icons/fi";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import "./Footer.css";

function Footer() {
  return (
    <Box
      pt={["20px", "60px"]}
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      mt={["20px", "60px"]}
      bg="#f1f5f8"
    >
      <Box w={["90%", "90%", "90%", "90%"]} margin="auto" pb="10px">
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]}
          gap="20px"
        >
          <Box>
            <Heading className="hdd">About Inspire</Heading>
            <List textAlign={["center", "left", "left", "left"]}>
              <ListItem
                className="footerItems"
                justifyContent="right"
                p={["0px 14px 0px 0px", null, "0px 14px 0px 0px", "0px 14px 0px 0px"]}
              >
                Requires an installment agreement or a 2-year contract and plan
                (which may include restrictions on switching service providers
                and roaming, even after contract expiration); sold separately to
                qualified customers. Credit check required; must be 18 or older;
                upgrade or activation fee from your wireless service provider
                may apply.
              </ListItem>
            </List>
          </Box>
          <Box pl={["0px", "40px"]}>
            <Heading className="hdd">Store</Heading>
            <UnorderedList textAlign={["center", "left", "left", "left"]}>
              <ListItem className="footerItems firsti">iPhone</ListItem>
              <ListItem className="footerItems">iPad</ListItem>
              <ListItem className="footerItems">Mac</ListItem>
              <ListItem className="footerItems">Apple Watch</ListItem>
              <ListItem className="footerItems">Macbook Air</ListItem>
              <ListItem className="footerItems">Macbook Pro</ListItem>
              <ListItem className="footerItems">Outlook Calendar</ListItem>
              <ListItem className="footerItems">Accessories</ListItem>
            </UnorderedList>
          </Box>
          <Box>
            <Heading className="hdd">Links</Heading>
            <UnorderedList textAlign={["center", "left", "left", "left"]}>
              <ListItem className="footerItems firsti">Privacy Policy</ListItem>
              <ListItem className="footerItems">Return Policy</ListItem>
              <ListItem className="footerItems">Shipping Policy</ListItem>
              <ListItem className="footerItems">FAQs</ListItem>
              <ListItem className="footerItems">About us</ListItem>
              <ListItem className="footerItems">Contact us</ListItem>
            </UnorderedList>
          </Box>
          <Box>
            <Heading className="hdd">Support</Heading>
            <br />
            <List textAlign={["center", "left", "left", "left"]}>
              <ListItem className="footerItems">
              <ListIcon as={PhoneIcon} />
                <b>+91-98989898989</b>
              </ListItem>
              <br />
              <ListItem className="footerItems" fontSize="12px">
                <ListIcon as={EmailIcon} />
                care@inspireinfo.com
              </ListItem>
              <ListItem className="footerItems">
                <ListIcon as={FiMapPin} color="black" />
                Head Office: 406 & 407, Red Rose Building, 49-50, Nehru Place,
                New Delhi-110019
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Box>
      <Box p="20px 0">
        <Flex w="90%" m="auto" justifyContent="center" alignItems="center">
          <Text fontSize="12px" textAlign="center">
            All rights reserved by Inspire Info Pvt. Ltd. | Design & Developed
            by Digit People
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}

export default Footer;

               
