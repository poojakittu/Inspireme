import { Flex, Heading, Text, Image } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function CartProduct({
  id,
  image,
  title,
  price,
  quantity,
  updateQuantity,
  colour,
  productId
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
    if (updatedQuantity >= 1) {
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
      <Link to={`/new/${productId}`}>
        <Image borderRadius="5px" height="58px" src={image} alt="" />
        </Link>
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
          <Heading alignSelf="flex-start" h="50%" size="xs">
            {colour}
          </Heading>
        </Flex>
        <button onClick={() => handleDelete(id)}>
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
