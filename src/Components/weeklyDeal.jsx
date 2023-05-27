import React from "react";
import {
  Grid,
  Box,
  Image,
  Text,
  Heading,
  Button,
  background,
} from "@chakra-ui/react";
import Counter1 from "./c1";
import "@fontsource/poppins";

const WeeklyDeal = () => {
  return (
    <div style={{ width: "90%", margin: "auto", background: "#f1f5f8" }}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        gap={4}
        w="90%"
        margin={"auto"}
        bg={"#f1f5f8"}
      >
        <Box width={"100%"} p={"10"}>
          <Image src="design.PNG" alt="Image" width={"100%"} height={"310px"} />
        </Box>
        <Box display={"grid"} justifyContent={"center"} pt={"70px"}>
          <Heading fontSize={"24"} fontFamily={"Poppins"}>
            Weekly deal
          </Heading>
          <Text fontSize={"14"} mt={"-60px"} fontFamily={"Poppins"}>
            Mega sale hurry up!
          </Text>
          <Counter1 />

          <Button
            fontFamily={"Poppins"}
            variant="outline"
            borderColor="black"
            color="black"
            bg="white"
            _hover={{ bg: "gray.100" }}
            _active={{ bg: "gray.200" }}
            w={"50%"}
            m={"auto"}
          >
            See Collection
          </Button>
        </Box>
      </Grid>
    </div>
  );
};

export default WeeklyDeal;
