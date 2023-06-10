import { Box, Grid, Icon, Heading, Text, Link } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { CiDollar } from "react-icons/ci";
import { RxCube } from "react-icons/rx";
import "@fontsource/poppins";

function GridBox() {
  return (
    <Grid
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
      gap={6}
      alignItems="center"
      mt={"140px"}
    >
      {/* Part 1 */}
      <Box p={4} borderRadius="md"  fontFamily={"Poppins"}>
        <Icon as={RxCube} boxSize={14} color="gray" />
        <Heading as="h3" fontSize="27px" mt={4}  fontFamily={"Poppins"}>
          Free next-day delivery
        </Heading>
        <Text
           fontFamily={"Poppins"}
          fontSize="22px"
          w={"70%"}
          m={"auto"}
          fontWeight={"800"}
          color={"#555555"}
          mt={7}
          mb={7}
        >
          On select in-stock Apple products order by 5:00 p.m
        </Text>
        <Link color="blue.500">
        <Box
            justifyContent="center"
            alignItems="center"
            color="blue"
            display="flex"
            gap="2px"
            fontFamily="Poppins"
            fontWeight={"800"}
            fontSize={"20px"}
          >
          Learn more
            <IoIosArrowForward fontSize="18px" />
          </Box>
        </Link>
      </Box>

      {/* Part 2 */}
      <Box p={4} borderRadius="md"  fontFamily={"Poppins"}>
        <Icon as={CiDollar} boxSize={14} color="gray" />
        <Heading as="h3" fontSize="27px" mt={4}  fontFamily={"Poppins"}>
          Find the Card for you
        </Heading>
        <Text
           fontFamily={"Poppins"}
          fontSize="22px"
          w={"80%"}
          m={"auto"}
          fontWeight={"800"}
          mt={7}
          mb={5}
          color={"#555555"}
        >
          Get 3% Daily Cash with Apple Card or get special financing
        </Text>
        <Link color="blue.500">
          <Box
            justifyContent="center"
            alignItems="center"
            color="blue"
            display="flex"
            gap="2px"
            fontFamily="Poppins"
            fontWeight={"800"}
            fontSize={"20px"}
          >
           Learn more
            <IoIosArrowForward fontSize="18px" />
          </Box>
        </Link>
      </Box>
    </Grid>
  );
}

export default GridBox;
