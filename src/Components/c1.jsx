import { useState, useEffect } from "react";
import { Box, Text, Button } from "@chakra-ui/react";

const Counter1 = () => {
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

  useEffect(() => {
    const timerValues = JSON.parse(localStorage.getItem("timerValues"));
    if (timerValues) {
      setDays(timerValues.days);
      setHours(timerValues.hours);
      setMinutes(timerValues.minutes);
      setSeconds(timerValues.seconds);
    }
  }, []);

  useEffect(() => {
    const timerValues = {
      days,
      hours,
      minutes,
      seconds,
    };
    localStorage.setItem("timerValues", JSON.stringify(timerValues));
  }, [days, hours, minutes, seconds]);

  return (
    <Box display="flex" gap="6" mt="-80px">
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
  );
};

export default Counter1;
