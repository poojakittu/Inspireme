import { Flex, Heading, Text, Image } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

export default function CartProduct({
  id,
  image,
  title,
  price,
  quantity,
  updateQuantity,
}) {
  const [quantity1, setQuantity1] = useState(quantity);
  const toast = useToast();
  const handleIncreaseQuantity = () => {
    const updatedQuantity = quantity1 + 1;
    setQuantity1(updatedQuantity);
    updateQuantity(id, updatedQuantity);
  };

  const handleDecreaseQuantity = () => {
    const updatedQuantity = quantity1 - 1;
    if (updatedQuantity >= 0) {
      setQuantity1(updatedQuantity);
      updateQuantity(id, updatedQuantity);
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `${token}` };
    axios
      .delete(`https://shy-puce-cheetah-hose.cyclic.app/cart/delete/${id}`, {
        headers,
      })
      .then((response) => {
        toast({
          title: `${title} Removed Successfully From Cart!!`,

          status: "success",

          isClosable: true,
          position: "top",
        });
        window.location.reload();
      })
      .catch((error) => {
        toast({
          title: "Error In Removing Product From Cart!!",

          status: "failure",

          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <div>
      <Flex key={id} p="6px">
        <Image
          borderRadius="5px"
          width="36px"
          height="48px"
          src={image}
          alt=""
        />
        <Flex
          justifyContent="space-between"
          ml="10px"
          flexDirection="column"
          w="100%"
        >
          <Text
            alignSelf="flex-start"
            h="50%"
            line-height="14px"
            fontSize="12px"
          >
            {title}{" "}
          </Text>
          <Heading alignSelf="flex-start" h="50%" size="xs">
            ₹{price}
          </Heading>
        </Flex>
        {/* <button style={{ width: "180px", color: "white", backgroundColor: "black", borderRadius: "5px", margin: '6px'  }}>ADD TO CART</button>
         */}
        <button onClick={() => handleDelete(id)}>
          {" "}
          <RiDeleteBinLine />
        </button>
        <div
          style={{
            border: "1px solid #e4e4e4",
            display: "flex",
            width: "100px",
            justifyContent: "space-evenly",
            height: "50%",
            alignSelf: "center",
            borderRadius: "5px",
            margin: "0px 10px",
          }}
        >
          <button onClick={handleDecreaseQuantity}>-</button>
          <span>{quantity1}</span>
          <button onClick={handleIncreaseQuantity}>+</button>
        </div>
      </Flex>
      <div
        style={{ borderTop: "1px solid #e4e4e4", width: "90%", margin: "auto" }}
      ></div>
    </div>
  );
}
