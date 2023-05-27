import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useToast } from "@chakra-ui/react";

const PrivateRoute = ({ children }) => {
  const { state } = useContext(AuthContext);
  const toast = useToast();

  if (!state.isAuth) {
    toast({
      title: "Unauthorized",
      description: "Please Login First.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
