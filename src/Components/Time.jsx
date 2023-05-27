import React, { useState, useEffect } from "react";
import { Box, Text, Button } from "@chakra-ui/react";

const Time = ({ seconds, days, hours, minutes }) => {
    console.log(seconds)
  return (
    <div>
      <Box display="flex" gap="6" mt="-60px">
        <Box>
          <Button
            height="20"
            width="20"
            borderRadius="full"
            bg="white"
            color="black"
            _hover={{ bg: "gray.100" }}
            _active={{ bg: "gray.200" }}
          >
            {days}
          </Button>
          <br />
          <Text>Day</Text>
        </Box>
        <Box>
          <Button
            height="20"
            width="20"
            borderRadius="full"
            bg="white"
            color="black"
            _hover={{ bg: "gray.100" }}
            _active={{ bg: "gray.200" }}
          >
            {hours}
          </Button>
          <br />
          <Text>Hrs</Text>
        </Box>
        <Box>
          <Button
            height="20"
            width="20"
            borderRadius="full"
            bg="white"
            color="black"
            _hover={{ bg: "gray.100" }}
            _active={{ bg: "gray.200" }}
          >
            {minutes}
          </Button>
          <br />
          <Text>Min</Text>
        </Box>
        <Box>
          <Button
            height="20"
            width="20"
            borderRadius="full"
            bg="white"
            color="black"
            _hover={{ bg: "gray.100" }}
            _active={{ bg: "gray.200" }}
          >
            {seconds}
          </Button>
          <br />
          <Text>Sec</Text>
        </Box>
      </Box>
    </div>
  );
};

export default Time;
