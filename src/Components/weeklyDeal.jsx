import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Image,
  Text,
  Heading,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import "@fontsource/poppins";

const WeeklyDeal = () => {
  const [days, setDays] = useState(200);
  const [hours, setHours] = useState(200);
  const [minutes, setMinutes] = useState(200);
  const [seconds, setSeconds] = useState(200);

  useEffect(() => {
    const timer = setInterval(() => {
      // Decrease seconds
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      // Decrease minutes and reset seconds
      else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
      // Decrease hours and reset minutes and seconds
      else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      }
      // Decrease days and reset hours, minutes, and seconds
      else if (days > 0) {
        setDays(days - 1);
        setHours(23);
        setMinutes(59);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [days, hours, minutes, seconds]);

  const gridColumnTemplate = useBreakpointValue({
    base: "repeat(1, 1fr)",
    md: "repeat(2, 1fr)",
    lg: "repeat(2, 1fr)",
  });

  return (
    <Box width="90%" margin="auto" background="#f1f5f8">
      <Grid
        templateColumns={gridColumnTemplate}
        gap={4}
        w="90%"
        margin="auto"
        bg="#f1f5f8"
      >
        <Box width="100%" p={10}>
          <Image
            src="https://i.ibb.co/YdGypj3/design.png"
            alt="Image"
            width="100%"
            height="auto"
          />
        </Box>
        <Box display="grid" placeItems="center" pt={[-20, 0, 0, 8]} pb={10}>
          <Heading fontSize={["20px", "24px"]} fontFamily="Poppins">
            Weekly deal
          </Heading>
          <Text fontSize={["12px", "14px"]} mt={[3, -2]} fontFamily="Poppins">
            Mega sale, hurry up!
          </Text>
          <Box
            display="flex"
            gap="6"
            mt={["8px", "0px", "0px", "0px"]}
            pb={"10px"}
          >
            <Box>
              <Button
                height="10"
                width="10"
                borderRadius="full"
                bg="white"
                color="black"
                _hover={{ bg: "gray.100" }}
                _active={{ bg: "gray.200" }}
                fontSize={["12px", "14px"]}
              >
                {days}
              </Button>
              <br />
              <Text fontSize={["10px", "12px"]} fontWeight="bold">
                Day
              </Text>
            </Box>
            <Box>
              <Button
                height="10"
                width="10"
                borderRadius="full"
                bg="white"
                color="black"
                _hover={{ bg: "gray.100" }}
                _active={{ bg: "gray.200" }}
                fontSize={["12px", "14px"]}
              >
                {hours}
              </Button>
              <br />
              <Text fontSize={["10px", "12px"]} fontWeight="bold">
                Hrs
              </Text>
            </Box>
            <Box>
              <Button
                height="10"
                width="10"
                borderRadius="full"
                bg="white"
                color="black"
                _hover={{ bg: "gray.100" }}
                _active={{ bg: "gray.200" }}
                fontSize={["12px", "14px"]}
              >
                {minutes}
              </Button>
              <br />
              <Text fontSize={["10px", "12px"]} fontWeight="bold">
                Min
              </Text>
            </Box>
            <Box>
              <Button
                height="10"
                width="10"
                borderRadius="full"
                bg="white"
                color="black"
                _hover={{ bg: "gray.100" }}
                _active={{ bg: "gray.200" }}
                fontSize={["12px", "14px"]}
              >
                {seconds}
              </Button>
              <br />
              <Text fontSize={["10px", "12px"]} fontWeight="bold">
                Sec
              </Text>
            </Box>
          </Box>

          <Button
            fontFamily="Poppins"
            variant="outline"
            borderColor="black"
            color="black"
            bg="white"
            _hover={{ bg: "gray.100" }}
            _active={{ bg: "gray.200" }}
          >
            See Collection
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default WeeklyDeal;
