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
import "@fontsource/poppins";
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
            <Heading
              fontSize={["24px", "26px"]}
              textAlign="left"
              pl={["0px", "13px"]}
              fontFamily={"Poppins"}
            >
              About Inspire
            </Heading>
            <List mt="4" textAlign="left">
              <ListItem
                className="footerItems"
                p={["0", "0 14px"]}
                textAlign="left"
                fontFamily={"Poppins"}
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
            <Heading
              className="hdd"
              fontSize={["24px", "26px"]}
              fontFamily="Poppins"
            >
              Store
            </Heading>
            <UnorderedList mt="4" textAlign="left">
              <ListItem className="footerItems firsti" fontFamily="Poppins">
                iPhone
              </ListItem>
              <ListItem className="footerItems" fontFamily="Poppins">
                iPad
              </ListItem>
              <ListItem className="footerItems" fontFamily="Poppins">
                Mac
              </ListItem>
              <ListItem className="footerItems" fontFamily="Poppins">
                Apple Watch
              </ListItem>
              <ListItem className="footerItems" fontFamily="Poppins">
                Macbook Air
              </ListItem>
              <ListItem className="footerItems" fontFamily="Poppins">
                Macbook Pro
              </ListItem>
              <ListItem className="footerItems" fontFamily="Poppins">
                Outlook Calendar
              </ListItem>
              <ListItem className="footerItems" fontFamily="Poppins">
                Accessories
              </ListItem>
            </UnorderedList>
          </Box>
          <Box>
            <Heading
              className="hdd"
              fontSize={["24px", "26px"]}
              fontFamily="Poppins"
            >
              Links
            </Heading>
            <UnorderedList mt="4" textAlign="left">
              <ListItem className="footerItems firsti" fontFamily="Poppins">
                Privacy Policy
              </ListItem>
              <ListItem className="footerItems" fontFamily="Poppins">
                Return Policy
              </ListItem>
              <ListItem className="footerItems" fontFamily="Poppins">
                Shipping Policy
              </ListItem>
              <ListItem className="footerItems" fontFamily="Poppins">
                FAQs
              </ListItem>
              <ListItem className="footerItems" fontFamily="Poppins">
                About us
              </ListItem>
              <ListItem className="footerItems" fontFamily="Poppins">
                Contact us
              </ListItem>
            </UnorderedList>
          </Box>
          <Box>
            <Heading
              className="hdd"
              fontSize={["24px", "26px"]}
              fontFamily="Poppins"
            >
              Support
            </Heading>

            <List
              textAlign="left"
              mt={["6px", "6px"]}
              ml={["0px", "0px", "0px", "0px"]}
            >
              <ListItem className="footerItems">
                <ListIcon as={PhoneIcon} fontFamily="Poppins" />
                <b>+91-98989898989</b>
              </ListItem>

              <ListItem className="footerItems" fontSize="12px">
                <ListIcon as={EmailIcon} fontFamily="Poppins" />
                care@inspireinfo.com
              </ListItem>

              <ListItem className="footerItems">
                <ListIcon as={FiMapPin} color="black" fontFamily="Poppins" />
                Head Office: 406 & 407, Red Rose Building, 49-50, Nehru Place,
                New Delhi-110019
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Box>
      <Box p="20px 0">
        <Flex w="90%" m="auto" justifyContent="center" alignItems="center">
          <Text fontSize="12px" textAlign="center" fontFamily="Poppins">
            All rights reserved by Inspire Info Pvt. Ltd. | Design & Developed
            by Digit People
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}

export default Footer;
