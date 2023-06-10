import {
  Box,
  Heading,
  Image,
  ListItem,
  Select,
  UnorderedList,
  Text,
  Img,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { AiFillApple } from "react-icons/ai";
import { BiCube } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { TbCoinRupee } from "react-icons/tb";
import { RiWechatLine } from "react-icons/ri";
import "@fontsource/poppins"; //
import SmallAss1 from "./CartAss";
import WeeklyDeal from "../Components/weeklyDeal";

const Middle = () => {
  const [oldPhones, setOldPhones] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedBodyDamage, setSelectedBodyDamage] = useState("");
  const [selectedBodyDamage1, setSelectedBodyDamage1] = useState("");
  const [selectedBodyDamage2, setSelectedBodyDamage2] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://shy-puce-cheetah-hose.cyclic.app/old"
      );
      const data = await response.json();
      setOldPhones(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleModelChange = (event) => {
    const selectedModel = event.target.value;
    setSelectedModel(selectedModel);
    const selectedPhone = oldPhones.find(
      (phone) => phone.modelName === selectedModel
    );
    setSelectedBodyDamage(selectedPhone?.bodyDamage || "");
    setSelectedBodyDamage1(selectedPhone?.returnNoDamage || "");
    setSelectedBodyDamage2(selectedPhone?.screenDamage || "");
  };
  return (
    <Box m={"auto"} mt={["13%", "13%", "3%"]} w={"95%"}>
      <Heading fontSize={"30px"} textAlign={"left"}>
        Exchange Your Old Phone &Get ₹2200.00-₹57800.00 credit towards your new
        iPhone.
      </Heading>

      <Box
        display={"flex"}
        flexDirection={["column", "column", "row"]}
        gap={"20px"}
        m={"auto"}
        mt={["14%", "14%", "4%"]}
        w={"95%"}
      >
        <Box
          w={["100%", "100%", "30%"]}
          bg="#edf2f7"
          padding={"10px"}
          textAlign={"left"}
          p={"0px 28px"}
        >
          <Heading fontSize={"20px"} m="5% 0" textAlign={"left"}>
            Old Phone will be rejected during pickup if
          </Heading>
          <UnorderedList textAlign={"left"}>
            <ListItem>Lorem ipsum dolor sit amet</ListItem>
            <ListItem>Consectetur adipiscing elit</ListItem>
            <ListItem>Integer molestie lorem at massa</ListItem>
            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
          </UnorderedList>
          <Heading fontSize={"20px"} m="5% 0">
            Exchange tip
          </Heading>
          <UnorderedList mb="100%">
            <ListItem>Lorem ipsum dolor sit amet</ListItem>
          </UnorderedList>
        </Box>

        <Box w={["100%", "100%", "60%"]} padding={"5px"}>
          <Heading fontSize={"16px"} m="1% 0" textAlign={"left"}>
            Exchange your old product
          </Heading>
          <Heading fontSize={"20px"} m="1% 0 2% 0" textAlign={"left"}>
            Which phone would you like to exchnage ?
          </Heading>

          <Select mt="2%" w={"sm"} variant="filled" placeholder="Apple" />
          <Select
            value={selectedModel}
            onChange={handleModelChange}
            mt="2%"
            w={"sm"}
            variant="filled"
            placeholder="Please Select Your Phone Model"
          >
            {oldPhones.map((oldPhone, index) => (
              <option key={index} value={oldPhone.modelName}>
                {oldPhone.modelName}
              </option>
            ))}
          </Select>
          <Heading fontSize={"22px"} mt="5%" textAlign={"left"}>
            Please Select Your phone condition
          </Heading>
          <UnorderedList>
            <ListItem textAlign={"left"}>
              If conditions of your old phone doesn't match as declared below,
              you can still get the partial discount,by paying diffrence in
              discount to our delivery agent
            </ListItem>
            <ListItem textAlign={"left"}>
              If your old phone falls verification at time of pickup,you can pay
              the exchange discount amount by Card or Cash and still get thr new
              phone delivered.
            </ListItem>
          </UnorderedList>

          {selectedModel && (
            <Box
              mt={["12%", "12%", "1%"]}
              display={"flex"}
              border={"1px solid #c1c1c1"}
              borderRadius={"20px"}
              p={"20px"}
              gap={"30px"}
            >
              <Box
                borderRight={"1px solid #c1c1c1"}
                padding={"10px"}
                textAlign={"left"}
                w={"32%"}
              >
                <Box mb="5%" display={"flex"}>
                  <input type="radio" />{" "}
                  <Heading fontSize={"20px"} textAlign={"left"} pl={"5px"}>
                    No damage
                  </Heading>
                </Box>
                <Heading
                  mb="5%"
                  fontSize={"18px"}
                  color={"red"}
                  pl={"20px"}
                  textAlign={"left"}
                >
                  ₹ {selectedBodyDamage1}
                </Heading>
                <Text
                  color={"gray"}
                  fontSize={"13px"}
                  fontWeight={"700"}
                  pl={"20px"}
                >
                  No damage on body(dents,cracks) or screen(discoloration.dead
                  pixel,cracks,spot,lines)
                </Text>
              </Box>
              <Box
                borderRight={"1px solid #c1c1c1"}
                mt={"15px"}
                w={"30%"}
                pr={"5px"}
              >
                <Box mb="5%" display={"flex"}>
                  <input type="radio" />
                  <Heading fontSize={"20px"} pl={"2px"}>
                    Only body damage
                  </Heading>
                </Box>
                <Heading
                  mb="5%"
                  fontSize={"18px"}
                  color={"red"}
                  pl={"16px"}
                  textAlign={"left"}
                >
                  ₹ {selectedBodyDamage}
                </Heading>
                <Text
                  color={"gray"}
                  fontSize={"13px"}
                  fontWeight={"700"}
                  pl={"12px"}
                  pr={"10px"}
                  textAlign={"left"}
                >
                  Cracks oe dent on body phone de-shaped
                </Text>
                <Box display="flex" justifyContent="space-between">
                  <Image
                    boxSize="40px"
                    src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOO1JDPUNwcPiqzHYhaL_zpJA0Ymlr6mD9sSgTPad_JYdrk-o"
                    alt="Image 1"
                  />
                  <Image
                    boxSize="40px"
                    src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOO1JDPUNwcPiqzHYhaL_zpJA0Ymlr6mD9sSgTPad_JYdrk-o"
                    alt="Image 2"
                  />
                  <Image
                    boxSize="40px"
                    src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOO1JDPUNwcPiqzHYhaL_zpJA0Ymlr6mD9sSgTPad_JYdrk-o"
                    alt="Image 3"
                  />
                  <Image
                    boxSize="40px"
                    src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOO1JDPUNwcPiqzHYhaL_zpJA0Ymlr6mD9sSgTPad_JYdrk-o"
                    alt="Image 4"
                  />
                </Box>
              </Box>
              <Box padding={"10px"} w={"28%"} p={"10px"}>
                <Box mb="5%" display={"flex"}>
                  <input type="radio" />{" "}
                  <Heading fontSize={"20px"} pl={"5px"}>
                    Screen damage
                  </Heading>
                </Box>
                <Heading
                  mb="5%"
                  fontSize={"18px"}
                  color={"red"}
                  pl={"20px"}
                  textAlign={"left"}
                >
                  ₹ {selectedBodyDamage2}
                </Heading>
                <Text
                  color={"gray"}
                  fontSize={"13px"}
                  fontWeight={"700"}
                  textAlign={"left"}
                  pl={"13px"}
                >
                  Cracks,discoloration,dead pixel,spot or lines on screen,
                  <Text fontSize={"14px"} fontWeight={"800"}>
                    (Select this if `only screen` or `screen & body damage')
                  </Text>
                </Text>
                <Box display="flex" justifyContent="space-between">
                  <Image
                    boxSize="40px"
                    src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOO1JDPUNwcPiqzHYhaL_zpJA0Ymlr6mD9sSgTPad_JYdrk-o"
                    alt="Image 1"
                  />
                  <Image
                    boxSize="40px"
                    src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOO1JDPUNwcPiqzHYhaL_zpJA0Ymlr6mD9sSgTPad_JYdrk-o"
                    alt="Image 2"
                  />
                  <Image
                    boxSize="40px"
                    src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOO1JDPUNwcPiqzHYhaL_zpJA0Ymlr6mD9sSgTPad_JYdrk-o"
                    alt="Image 3"
                  />
                  <Image
                    boxSize="40px"
                    src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOO1JDPUNwcPiqzHYhaL_zpJA0Ymlr6mD9sSgTPad_JYdrk-o"
                    alt="Image 4"
                  />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Box m="6% 0">
        <Heading fontSize={"30px"} textAlign={"left"}>
          AppleCare+ coverage. Protect your new iPhone.
        </Heading>

        <Box
          p={"10px"}
          mt={["8%", "8%", "2%"]}
          display={"grid"}
          gridTemplateColumns={[
            "repeat(1,1fr)",
            "repeat(1,1fr)",
            "repeat(2,1fr)",
          ]}
          gap={"20px"}
        >
          <Box
            borderRadius={"20px"}
            padding={"10px"}
            border={"1px solid #c1c1c1"}
            pt={"10px"}
          >
            <Box display={"flex"} gap={"5px"} pl={"20px"} pt={"10px"}>
              <AiFillApple color="red" fontSize={"19px"} />
              <Heading fontSize={"19px"}>AppleCare+</Heading>
            </Box>
            <Text
              color={"gray"}
              fontSize={"17px"}
              fontWeight={"600"}
              textAlign={"left"}
              pl={"25px"}
              pt={"10px"}
            >
              From ₹ 4817.00/mo.
            </Text>
            <Text
              color={"gray"}
              fontSize={"17px"}
              fontWeight={"600"}
              textAlign={"left"}
              pl={"25px"}
            >
              or MRP ₹28900(inc.of all taxes)
            </Text>
            <br />
            <hr />
            <UnorderedList mt="2%" pl={"10px"}>
              <Text
                color={"gray"}
                fontSize={"14px"}
                fontWeight={"600"}
                textAlign={"left"}
                pl={"22px"}
                pt={"10px"}
              >
                <ListItem>
                  Get unlimited repairs for accidental damage
                  protection,Apple-certified repairs,and priority access to
                  Apple expert.
                </ListItem>
                <br />
              </Text>
            </UnorderedList>
          </Box>
          <Box
            borderRadius={"20px"}
            padding={"10px"}
            border={"1px solid #c1c1c1"}
            p={"10px"}
            pt={"10px"}
          >
            <Heading
              fontSize={"19px"}
              textAlign={"left"}
              pl={"10px"}
              pt={"10px"}
            >
              No AppleCare+Coverage
            </Heading>
          </Box>
        </Box>
      </Box>

      <Box mb={["25%", "25%", "15%"]}>
        <Heading fontSize={"30px"}>Choose Accessories</Heading>

        <SmallAss1 />
      </Box>

      <Box
        mb={["15%", "15%", "10%"]}
        bg="#edf2f7"
        display={"grid"}
        p="10px"
        gridTemplateColumns={[
          "repeat(1,1fr)",
          "repeat(1,1fr)",
          "repeat(3,1fr)",
        ]}
      >
        <Box padding={"20px"} textAlign={"center"}>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <BiCube fontSize={"59px"} bg="#c1c1c1" />
          </Box>
          <Heading mt="3%" fontSize={"20px"}>
            Free delivery and pickup
          </Heading>
          <Text mt="1%">Get free delivery or pick up at your Apple Store</Text>
          <Box
            justifyContent={"center"}
            alignItems={"center"}
            mt="1%"
            color={"blue"}
            display={"flex"}
            gap={"2px"}
          >
          Learn more
            <IoIosArrowForward fontSize={"14px"} />
          </Box>
        </Box>
        <Box padding={"20px"} textAlign={"center"}>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <TbCoinRupee fontSize={"59px"} />
          </Box>
          <Heading mt="3%" fontSize={"20px"}>
            EMI available
          </Heading>
          <Text mt="1%">Get free delivery or pick up at your Apple Store</Text>
          <Box
            justifyContent={"center"}
            alignItems={"center"}
            mt="1%"
            color={"blue"}
            display={"flex"}
            gap={"2px"}
          >
           Learn more
            <IoIosArrowForward fontSize={"14px"} />
          </Box>
        </Box>
        <Box padding={"20px"} textAlign={"center"}>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <RiWechatLine fontSize={"59px"} />
          </Box>
          <Heading mt="3%" fontSize={"20px"}>
            Get help buying
          </Heading>
          <Text mt="1%">Get free delivery or pick up at your Apple Store</Text>
          <Box
            justifyContent={"center"}
            alignItems={"center"}
            mt="1%"
            color={"blue"}
            display={"flex"}
            gap={"2px"}
          >
           Learn more
            <IoIosArrowForward fontSize={"14px"} />
          </Box>
        </Box>
      </Box>

      <WeeklyDeal />
    </Box>
  );
};

export default Middle;
