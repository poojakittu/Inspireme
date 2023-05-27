import { Box, Grid, Icon, Heading, Text, Link } from "@chakra-ui/react";
import { FiInfo } from "react-icons/fi";
import { CiDollar } from "react-icons/ci";
import { RxCube } from "react-icons/rx";
import "@fontsource/roboto";

function GridBox() {
  return (
    <Grid
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
      gap={6}
      alignItems="center"
      mt={"140px"}
    >
      {/* Part 1 */}
      <Box p={4} borderRadius="md" fontFamily={"Roboto"}>
      <Icon as={RxCube} boxSize={14} color="gray" />
        <Heading as="h3" fontSize="27px" mt={4} fontFamily={"Roboto"}>
          Free next-day delivery
        </Heading>
        <Text
          fontFamily={"Roboto"}
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
          <Box fontWeight={"800"} fontSize={"20px"}>
            Learn more (<span>"&deg;"F</span>)
          </Box>
        </Link>
      </Box>

      {/* Part 2 */}
      <Box p={4} borderRadius="md" fontFamily={"Roboto"}>
        <Icon as={CiDollar} boxSize={14} color="gray" />
        <Heading as="h3" fontSize="27px" mt={4} fontFamily={"Roboto"}>
          Find the Card for you
        </Heading>
        <Text
          fontFamily={"Roboto"}
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
          <Box fontWeight={"800"} fontSize={"20px"}>
            Learn more (<span>"&deg;"F</span>)
          </Box>
        </Link>
      </Box>
    </Grid>
  );
}

export default GridBox;
