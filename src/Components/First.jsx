import { Grid, Box, Image, Text, Heading } from "@chakra-ui/react";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import { Link } from "react-router-dom";
import "@fontsource/roboto";

const First = () => {
  return (
    <Box mt="270px">
      <Heading
        fontFamily={"Roboto"}
        color={"Black"}
        fontSize={"40px"}
        letterSpacing="0.01em"
        lineHeight={"37px"}
        fontWeight="980"
        textAlign={"center"}
      >
        Government Purchase Program
      </Heading>
      <Text
        fontSize={"22px"}
        fontFamily={"Roboto"}
        color={"Black"}
        letterSpacing="0.01em"
        lineHeight={"28px"}
        fontWeight="650"
        textAlign={"center"}
        pt="40px"
      >
        Please review the terms and conditions below before placing an order.
      </Text>
      <Grid
        pt="80px"
        width={"90%"}
        margin={"auto"}
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(6, 1fr)",
        }}
        gap={10}
        justifyContent={"center"}
      >
        <Link to="/iphone">
          <Box>
            <Image src="applep.jpg" alt="iphone" />
            <br />
            <Text fontSize={"30px"} color={"#282828"} fontWeight="400">
              iPhone
            </Text>
          </Box>
        </Link>

        <Link to="/mac">
          <Box>
            <Image src="watch.jpg" alt="Dan Abramov" />
            <br />
            <Text fontSize={"30px"} color={"#282828"} fontWeight="400">
              Mac
            </Text>
          </Box>
        </Link>
        <Link to="/airpods">
          <Box>
            <Image src="watch.jpg" alt="Dan Abramov" />
            <br />
            <Text fontSize={"30px"} color={"#282828"} fontWeight="400">
              iMac
            </Text>
          </Box>
        </Link>
        <Link to="/ipad">
          <Box>
            <Image src="watch.jpg" alt="Dan Abramov" />
            <br />
            <Text fontSize={"30px"} color={"#282828"} fontWeight="400">
              iPad
            </Text>
          </Box>
        </Link>
        <Link to="/watch">
          <Box>
            <Image src="watch.jpg" alt="Dan Abramov" />
            <br />
            <Text fontSize={"30px"} color={"#282828"} fontWeight="400">
              Watch
            </Text>
          </Box>
        </Link>
        <Link to="/acc">
          <Box>
            <Image src="watch.jpg" alt="Dan Abramov" />
            <br />
            <Text fontSize={"30px"} color={"#282828"} fontWeight="400">
              Accessories
            </Text>
          </Box>
        </Link>
      </Grid>
    </Box>
  );
};

export default First;
