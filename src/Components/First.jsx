import { Grid, Box, Image, Text, Heading } from "@chakra-ui/react";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import { Link } from "react-router-dom";
import "@fontsource/poppins";


const First = () => {
  return (
    <Box mt="270px">
      <Heading
        fontFamily={"Poppins"}
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
        fontFamily={"Poppins"}
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
            <Image
              src="applep.jpg"
              alt="iphone"
              width={"151.07px"}
              height={"151.07px"}
              m="auto"
            />
            <br />
            <Text fontSize={"30px"} color={"#282828"} fontWeight="400" fontFamily={"Poppins"}>
              iPhone
            </Text>
          </Box>
        </Link>

        <Link to="/mac">
          <Box>
            <Image
              src="mac.jpg"
              alt="Dan Abramov"
              width={"151.07px"}
              height={"151.07px"}
              m="auto"
            />
            <br />
            <Text fontSize={"30px"} color={"#282828"} fontWeight="400" fontFamily={"Poppins"}>
              Mac
            </Text>
          </Box>
        </Link>
        <Link to="/mac">
          <Box
          >
            <Image
              src="imac.jpg"
              alt="Dan Abramov"
              width={"151.07px"}
              height={"151.07px"}
              m="auto"
            />
            <br />
            <Text fontSize={"30px"} color={"#282828"} fontWeight="400" fontFamily={"Poppins"}>
              iMac
            </Text>
          </Box>
        </Link>
        <Link to="/ipad">
          <Box>
            <Image
              src="watch.jpg"
              alt="Dan Abramov"
              width={"151.07px"}
              height={"151.07px"}
              m="auto"
            />
            <br />
            <Text fontSize={"30px"} color={"#282828"} fontWeight="400" fontFamily={"Poppins"}>
              iPad
            </Text>
          </Box>
        </Link>
        <Link to="/watch">
          <Box>
            <Image
              src="watch.jpg"
              alt="Dan Abramov"
              width={"151.07px"}
              height={"151.07px"}
              m="auto"
            />
            <br />
            <Text fontSize={"30px"} color={"#282828"} fontWeight="400" fontFamily={"Poppins"}>
              Watch
            </Text>
          </Box>
        </Link>
        <Link to="/acc">
          <Box>
            <Image
              src="ass.png"
              alt="Dan Abramov"
              width={"151.07px"}
              height={"151.07px"}
              m="auto"
            />
            <br />
            <Text fontSize={"30px"} color={"#282828"} fontWeight="400"  fontFamily={"Poppins"}>
              Accessories
            </Text>
          </Box>
        </Link>
      </Grid>
    </Box>
  );
};

export default First;
