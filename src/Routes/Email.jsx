import React, { useState, useContext } from "react";
import {
  Box,
  Button,

  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import emailjs from "emailjs-com";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

emailjs.init("1bX-27Z6OMl9Yg_xt");

const Test = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const toast = useToast();
  const { state, loginUser, logoutUser } = useContext(AuthContext);

  const [verifiedOTP, setVerifiedOTP] = useState(false);
  const [otpCode, setOTPCode] = useState("");

  const generateOTP = () => {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  const generatedOTP = generateOTP();
  const handleSendOTP = async () => {
    if (email === "" || email === undefined || email === null) {
      toast({
        title: "Error",
        description: "Please Enter Your Correct Email Id",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const response = await fetch(
        "https://shy-puce-cheetah-hose.cyclic.app/otp/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp: generatedOTP,
          }),
        }
      );

      if (response.ok) {
        setOTP(generatedOTP);
        try {
          const response = await emailjs.send(
            "service_0fkgmse",
            "template_oi8rtkb",
            {
              to_email: email,
              otp: generatedOTP,
            }
          );

          if (response.status === 200) {
            setOtpSent(true);
          } else {
            toast({
              title: "Error",
              description: "Failed to send OTP. Please try again.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        } catch (error) {
          console.log(error);
          toast({
            title: "Error",
            description: "Failed to send OTP. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Please enter your email.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleLogin = async () => {
    if (otpCode === "" || otpCode === undefined) {
      toast({
        title: "Error",
        description: "Please Enter Your OTP",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const response = await fetch(
        "https://shy-puce-cheetah-hose.cyclic.app/otp/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otpCode,
          }),
        }
      );

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        setVerifiedOTP(true);
        loginUser(token);
        toast({
          title: "OTP Verified Successfully!!",

          status: "success",

          isClosable: true,
          position: "top",
        });
      } else {
        // Handle error
        toast({
          title: "INVALID OTP!!",

          status: "failure",

          isClosable: true,
          position: "top",
        });
      }
    }
  };

  if (verifiedOTP === true) {
    return <Navigate to="/inspire" />;
  }

  return (
    <Box mt={"200px"}>
      <VStack spacing={4} p={4}>
        {!otpSent ? (
          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            alignItems="center"
          >
            <Input
              type="email"
              placeholder="Your Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              w={{ base: "100%", md: "300px" }}
              color="black"
              borderRadius="10px"
              border="3px solid black"
              borderColor="black"
              mb={{ base: "10px", md: "0" }}
              mr={{ base: "0", md: "50px" }}
              bg={"#edf2f7"}
              required
            />

            <Button
              bg="black"
              color="white"
              px="20px"
              py="10px"
              borderRadius="50px"
              width="150px"
              mt={{ base: "40px", md: "0" }}
              onClick={handleSendOTP}
            >
              Generate OTP
            </Button>
          </Box>
        ) : (
          <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          alignItems="center"
          >
            <Input
              type="text"
              placeholder="OTP"
              value={otpCode}
              onChange={(e) => setOTPCode(e.target.value)}
              w={"300px"}
              color={"black"}
              borderRadius="10px"
              mb={{ base: "10px", md: "0" }}
              mr={{ base: "0", md: "50px" }}
              bg={"#edf2f7"}
              required
            />
            <Button
              bg="black"
              color="white"
              px="20px"
              py="10px"
              borderRadius="50px"
              width="150px"
              mt={{ base: "40px", md: "0" }}
              onClick={(e) => handleLogin(e.target.value)}
            >
              Verify Now
            </Button>
          </Box>
        )}
        {loggedIn && (
          <Text fontSize="2xl" color="green">
            Logged in successfully!
          </Text>
        )}
      </VStack>
    </Box>
  );
};
export default Test;
