import {
  Box,
  HStack,
  Image,
  Text,
  Icon,
  useDisclosure,
  Input,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import "@fontsource/poppins";
import { FaShoppingCart } from "react-icons/fa";
import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { RiLogoutCircleFill } from "react-icons/ri";
import { Search2Icon } from "@chakra-ui/icons";
import { BsFillBagFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import "@fontsource/cinzel-decorative";
import { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";
import Iphone from "../Routes/IPhone";

const Navbar = () => {
  const options = [
    { name: "iPhone ", path: "/iphone" },
    { name: "Mac", path: "/mac" },
    { name: "iPad", path: "/ipad" },
    { name: "Watch", path: "/watch" },
    { name: "AirPods", path: "/airpods" },
    { name: "Tv & Home", path: "/tv" },
    { name: "Accessories", path: "/acc" },
  ];
  const { state, logoutUser } = useContext(AuthContext);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://shy-puce-cheetah-hose.cyclic.app/cart",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setTotalValue(response.data.Total);
    } catch (error) {
      console.error(error);
    }
  };

  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("/");
  const token = localStorage.getItem("token");
  console.log(query);
  const toast = useToast();
  const handleLogout = () => {
    localStorage.removeItem("token");
    logoutUser();
    toast({
      title: "Logged Out Successfully!!",

      status: "success",

      isClosable: true,
      position: "top",
    });
    window.location.reload();
  };

  const productlength = localStorage.getItem("productlength");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = React.useRef();
  const [searchDisplay, setSearchDisplay] = useState("none");

  const handleSearch = () => {
    searchDisplay == "none"
      ? setSearchDisplay("inline-block")
      : setSearchDisplay("none");
  };

  const handleSearchBox = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchEnter = (event) => {
    if (event.key === "Enter" && query.trim() !== "") {
      localStorage.setItem("searchquery", query);
      window.location.href = `/search?q=${query}`;
    }
  };

  const handleOptionClick = (path) => {
    setSelectedOption(path);
  };

  return (
    <>
      <br />
      <Box
        m="auto"
        w="100%"
        position="fixed"
        top="0"
        left="0"
        zIndex="999"
        backgroundColor="white"
        bg="#EFEFEF"
        display="flex"
        justifyContent="center"
        fontFamily={"Poppins"}
        fontSize={"14px"}
        justifyItems={"center"}
        textAlign={"center"}
        pt={"15px"}
        pb={"15px"}
      >
        <Text mb={"10px"}>Register Yours Domain With Our Store</Text>
        <Button
          bg="black"
          height="16px"
          color="white"
          borderRadius={"10px"}
          fontSize={"10px"}
          ml={"9px"}
          p={"12px"}
          mb={"8px"}
        >
          <Link to="/login"> Register Now</Link>
        </Button>
        <br />
      </Box>
      <Box
        m="auto"
        w="100%"
        position="fixed"
        top="14"
        left="0"
        zIndex="999"
        backgroundColor="white"
        padding="0% 20% 0% 2%"
      >
        <HStack w="100%">
          <Box mt="1%" mb="1%">
            <Link to="/">
              <Image
                m="auto"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM0AAABFCAYAAADpX2LcAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAB3ASURBVHhe7Z1ndFXXlcc3VQgQRSAEolcBogtkejPFBgxxnDg2cSbdkziZyayVNd/n46zJxNMyHzKZiROXxHaIY9NsTDGmg+i9id5EEV0CBGL2b9973rt6ek/oSQ87wP3jo3vfvafus/c+++xzznW9+woJESJEjVHfv4YIEaKGCIUmRIgkEQpNiBBJIhSaECGSRCg0IUIkiVBoQoRIEqHQhAiRJEKhCREiSYRCEyJEkgiFJkSNUVFRIffu3ZMnfRNJuI0mxAMBiyAwp06dlNLSMunSpbOkpzeV+vWfTJ0bCk2IB6K8vFyOHj0iCxcukPPFxTJ16nQZUVAgzZs3fyIFJxSaENXi9u3bcvDgQVnyycdyRAWnQs2zpk2byjQVnJGjR0uLFi2eOMEJhSZEQty8eVP27tkjy5YtlRMnjks9FY769erZvKZx48YycdIkGTduvLRp01bq6fMnBaHQhIiL69evy/Zt22TVqpVy8uRJadSokXTt1k2aNW0mR48dlevXrtkIM1aFZsKEiZKTk+OnfPwRCk2IKrh69aps3bpFVq9eJWfPnLFRpWev3jJt2nRp27atCtLnsmnjRo13xeKPHDlKnp4yRTp16my/H3d84UITr7i6DO3kh919584d/0lVNGnSxDo+RPWAltd0BNm4cYOsXbvGJv3Qrl/fvjJx8hTp3r27NGzYUG7cuC6rV63SOGvl8uVLmk5kWP5wmTp1qnTr1t3P7fHFFyY0eGDKysrk9q1bxuB31S6mA2BmOiY9PV0aNGhgcZMRIvI6cOCAHGOSWlEh9fRfEBX6Ly9voPTs2fOJdZHWBLABI8yGDetlzZrVcuniRZvwDxw4SCZNmiydOneO0I/+KS0tlfXr1sqqz1fKBY3LswEDB5hnrWfPXo/1HOehCs3du3etI86dOysXlbAV9yqk7FaZ3FLhcSNDg4YNVHDSpFWrVpKV1U46dOhg9zUhOlWn8z75eLGs1M5jguq/8K6ax30VpOeff8EmrQhpKDhVgbK5fLlE1q9fL+t0hLl8+bK5k/N19Biv85X27dtXoht0p38Y4QsLC2XF8qVy9uxZU3p9cnPNjOvTJ/expXWDf1L49ykDnYCwHD9+TE6fPq1D/lX4Vxo2amyLYk3Sm0iaji4NlInL75TLFY178sQJOVx0WOOfMIHClZmWlubnmBjl5Xfk0OFDOtIctXIRGDrV6QKufdW86N69h3Xi46wBawNoduHCBVn12WeyTkcO+g3aFxQ8ZYomO7uywABoCF1RQh07dpTMzEwTGtJeLimx/Jo3z5A2bdpErIfHCSlXBWj7C+fPK/OfshElI6OF5OR0tFGkgRIfATqv7yHslStXpFxHo4yMDMlWbdaiRYaOSudlyZIlsnDhfDmqglATIAdOGOjgYOB5KCiJgdBgim3bucPmMy1btpIRIwpk3PgJ0q5ddkLauecIxaBBg2X2nK/YfIb+xz29a9dOszQeR6R0pKEDrujQjruyhQpLC+0ABIghfM+e3bJrxw7Zt2+vHCkqkuPHjpkr88yZM3Lxwnm5oWkgOGZBo4aNdJQ6bqMP99nZ2VW0ncMdHakOHTooxzS/4AgD3O/cvv2kRw9vThMKUFVAsZs3S3XUv20jzNhx40xgagpompWVZSMUgtdE56djxowxUztRvz3KSNmchmxu3Lhhk30m94woGzduNCG5qKMKjoBYkMYxMVd+IzQQv5ler+lw31hNNCaX+fn5cTuAOc3nOp8p1LLu3ccR4DEB4L6i4r5MVRt75MiRZk6EQlMVKCtGf0KXLl2kdevW/pvkQD5stykruym5uf0fW49lyoQGgiEwMCWE+2zFcjly5IjcunXLj1EZMDBzGuYvTNaDoEotW7aU5mq2lalQcJ0xY6YMGTLUjxEF5V66dMlMvXggL9YWYISg0CVq9sMUKsqsaf41iZvKNpAXlkK8OUiickBsWS6feAquJu2pLs6D3jvUNF5tkTKhgVDYsId1Uj5//kdmWpG1ZU8D3L0CgjJ0Dxk6zFaaL6h5dkLNMSaTCAENJm4j3x3N3IjV6Bde+NqXtg6AcKMAaGdjrTMmSG1MD9oFnRh5CbSXfEyJKMOinR/G5JlyqD/tgOY4Wbh+mcD7Rp1oL+7tmtAzSD9TuPob2tEWwsOgXSxSKjRnz56R9979owrO4YiAOLBvKVO1PcyPx4XQpUtXczffvn1L50Elsnv3XtmwfqONHKQnQASuMBMrz3O+8ryt6ThAPOZG57RstcRMPoP2GeYZi3Js86BTqOe+vWoyXrygRG4ciUoi0mZmtrX4MBWdwnb4o0ePyYVz5+Qa86779yStUZqNknl5eZI3YECl+sQDDFtSUqL1PCHni8/L5SuXvTUrZRre4SCxDtf5G3llZ7ez1fUePXrEZQIY7dSpU+bKr1+vfiVzlPwy22TaHI68mF8ePHjAlFjJ5Us6ct8yk7elmsAort69+0h7vcYDpi9eyRKdp8bX3PelX7/+5j0D0AsHQKnOj+o3QABcGo+2eOLoc9q+f98+83oyB0IJsX+tm/JGz169zEQPlkf/l5beVMV6wubA59Xc99b8yrTPK4x2aWlNfI9dprnIoV+zZs0S1LtuSJnQ0JF/+cs8WbtmrTGmy5Yrc5RBgwbJYDWv2rfvoFol3RiWxrpRBUAYGHT+/A+tkwHviIPQtVeif1VHmwHKqO45mwqXL1tqq9iUqw9JZGnd/bTp02Xs2PHGgMR5+603Zf/+/ZpnVYL2799fZs16zrIoLNwk27dvVSEusUVZGLJCXzgmp1P65PaVmTNnRRgnFrhht2/fJju2b7cR1Wl76mF08uOxEZI2Usc0VRDk3a9/nowfP8EcIUGwjrJy5QrbymJtDELrByM/O2OG0WblypVyVM3k69eveeXqe8pCO6Pd22d3kNFjx8hQHfVjBbS4uFg++WSxMXiVcny88srfGM3oC+a0v/mfX1u6eLQdMWKEjBk9VjZt2igbNbB/jVGDtChFhOW52XO0LkNVwTUwJQfNd+7YIVu2Fsqpk6ekVIXljiobFsetvxWOdg2hnSoElEWOKuVhw/K1bnkPVGrJIiXeMyrPhH/xokWmPYNAm01/5lnb2NexYyfrqAYNvOEUYgGuBDoS335OTgdjahjM4mhHc4XATWHUPn0iQzmMsP/APtsVQHyY265aD+7RSH1Um3ZXrU0a5k84KFhDIi2mn4tLyGqbZZpq7Zo1smb1KluUpZPoPBNuDbSXupB3sY5Aly5dNEalTUEwmi1Z8omsXvW5jcIwsTPJnKJw4Dfb7u9pvtSLEYI0x08cVxrm2IKvS0P79u/32hysO/e0p52OVKyHsTt5z+7dtu2F+hqTaR5Wlt6Tz6WSS952GY3P6O/6hDg3b95Qht0pJ1SBuTJi6YWDpl27dpYOeqxdu9qUw+0AbbnSbuaWV69dlfXr1kuJWhPUwbWJNtP/o8eMNR6gr6AXPLVs2adah5MmZJG+8NsSbA9tpDyEl10KeGmxDrAyUik4yRvlcUCFC1VzMJwHiQ4xn3l2hkk8Gnfp0k/ld2/8Vt556y3ZuXOHdVoQEIrQo0cvmTBxUoSg/OWe+CeVeCygBUGZBOJE0vhXg18nA/fuZyCuxdd3V9R0WrF8hWlCiB/tWBKRNpoXz1ln2r1rl6xfv85/6oG0bEnZpCMgJgj5AK8cj2bB4JXhwd3DeEe14xctWmj0c7SNBfEt+GUwN2Stq0jNZJjV8ovk77XDpaFs4n+uI9dBFUJg8Q20N5C//9zu/X9BWP1cHQNxASPBqdOnZeuWLWaeAu+d13eAXQQIFjxAX897/z3bZY1pe1fbEQtLpXl46f1yfRCfdCzYLlb6JXIU1QYpERpclWg9oCSwa4uWLWXM2HFmM28uLJS33nxTPlWti+bu1LmTrQPEamYAwTATnnpqZGStwBEVIl9XTcWcx/12V3cP3O/gs0rwHwfjWVAGOqEmwM7d2OU3LU6kbMGUgrl95ucf+WsatCRtRDMCGJH5RuGmTaZ9LYdAOcxDsLlp4+jRYyRXTTzME97BXBa0XOpzT8ORosOyUQXQyybaZneNDZhHp3UuhsBURTSeB+98zEmdI631dwQ4RON4cOmC6WOi2IPYeASYmB3TCKgTbtqIGce8E7NqoJrwmKVg0cIFsnXbVlMcHqJ52S+91lc+STfLhXlvVCkRnAgxymEOsjObfkoFUiI0xzhfocOgdbT+oxFdu3Y1O3nv3j1mF18quWgu45fnftNMNUahWBs6CHYJ9OjZI0IkQP53yj3TpTo4RvfgxLgqrNMI3PNAy7qr+dPB/KZsNwpYnlTFqlOZU3hfXHzOJqmAzjmG80AnrEG4evTt20++8dLL8uI3XpIXvvZ1+cEPX5XZs79ibcZEs+AzFoD5OT2JtkSpRN75Fffa4HIXM/GoUzAwl+Hqwbvy0zEbaTBZceKAaFxFsJxYmsXAe8/Vu3cRyQ/hDJqmtIO2UgecHnhGUR47dmy3EQI6ImDEJ4krG48q++K++73vy2s/+al857vfs10MmGBWJnkH6o/Jxp66s2dPR8quC1IiNGgQKlNftQaVZt7Sv1+emSjMC7Arc3XonTR5smrYTkYYOj8RyIt82mS2sd8+3Q0Q/ZYSATgCpQqQM0JUrR8T8Ly8AdJRR4WGDaOjIlFgG8r3PHbefIudDYB7bHeYwoujne7Xld9ts9qZ0kCrEhCWcePH2+bI/OHDZaKapjNmzpS5qmBeffVH8tO/+3tztzstnBjRMkBDHclhrm++8i2Z+81XTFiDIJYLtBuzF08bplF1/VMbuDIcmLcM0Qk/Tp3WmZmSN2Cg0QFBwdQt8033YBryYM/iiIKn5KWX55oSxkvI9fmvvmDP4S3aT3BpaQsj6KaNm0xI64rUCI1OWD14FWXIzGqXJUVFh2w7TOtWrWXw4CHSuXOXSIOqg2ss6zSAX0GmS3WHaqb+jZc/Ltlxalq+9tpP5Uc/fk1+9rN/sO3xzhVKiHamd+UvppgH9y4Aje/avWfPLjuvwtYfRk2Ei85mAfd7qj2//uKLMnPmc2beDho8OOIWduasy6cS9JH32HuHiTd92jPGXGN0cj1W8/rxaz+x/Oy9RdZ60hZ74o1oODaYC3iI044kYcpF/wVzwqP1/e//UH7wg1flb3/0mvz85/8oo0aNthEEtzxzsagJZxcDebBswdIDCoQ+cAFHyQAVPJRRZUB3yH9f9u3fZ86LuiIl3HfDt+VdAxo3amyamUm7NUgbmt3e2/wXt8Nj4OK4eYVB8wFoz2bNmto9eacK5OTK5TwIDMsmUjw6uMzpqOz20fWMKu3Qurg5BG1vHTje4K7ORGKD5PyPPpTXf/kL+cW//LP82+u/lN/85teyYMF8tb83mWsVbU9c0ror4J4RPR68eN41Nzc38sUYl5Z5w+zZc2xhljhEtqvBi4OnraTEmzMaUkBir15e30NTRlS8mZjnKAIm/wgB7w8fOhQzF/OUpLnJNW6nzl2la5cu9obnpHFKFO+fExpXJumZM3HPPshTZ07b+7ogJUKT0TzDrlTMKqoVZgJ2XTsANG7EYbMHb/N3IA+076nTp/wnHiBEk7QmplUcjC4pgEdgHd20Y3B505FBsA2HhTM6LgiXzmNCuzXm7K5mA2tSgCgungNMwNwJJwobTrds3mzngn7/uzfk9df/Vf7zP/7dPpl0Rjs5MofxQVHVgbK6du0eMef47RiLBUZMZFCvHs+8ernqMVri2vUQFKo6IND2jjkdpYMKTpSpKwMnD84Pg3uvcV0tSktvyGalFU6WSqGw0LyY167p3Npva+W61/NH0mL/d+2REqHp4H9UwVUSj8eVq1cinc0H5tjFDB7UCe4928vxswcJi2Zqm9U2wtDxiF5buLxg+NatM81UAO65acUGjZxcVAvawK7fgqeeMiF0TSYvCzAj8TS4hbnIOw1MXJmUI0T//av/spOUPAPknYiGpOUdV0ZHRskgeIfwuLmi1NN8CAqXJS70u/cqu8DrCuoDUDj0X0aLjMizIOAXhNaZZg6uzeXKVwjGG2/8X9Xw2/+VP/zhbdvGRXryDwY3OsOXdUVKhAbtRcVch925c9s0BgwI8MuzHQVJ53114D07A5YvXRZZx3EdyMImHha2S6QajkdgcurtNHMQMHdNWIk2YBaxzZ4Vfe6DnsKo3vQARRxV3DvyIDC/wJTjIxc4GB5EP0DdEZhEcSPCRFF+VRyNYTicLamEq0UTpWvz5hwu9BRSLGifCY3rDFcn++vB0SVRiAV5RfJTOJ6qC1IiNOwZgjEMWnEajqZkbgOzMNxv3brV9nyZGzGmIYDfaBq8HMuWLZNt27caEXjuCMII069fZQ9QquGVlRKymIeI3RC4ldmj1i47y+gU9B5CBaOH/YrC0Yj6QM+VKz8z1z6/vQjepRI0vnfxNjXGwqUtvxtnodB/58rjGmsW1hXsBGFFP6hAgjBhV6UVaaPCb5KB5ygu4iQbzFLQayDrWiNFI0229O7Tx+4bqRbDLYgbmnUFmIRONHPjk49ly5bNtsDJ7gEEiNGHTkJYMMlYvWURlDTACKWheUYLGTo037bioAnd8yBR64QAMVNA1whwo7KI+e1vf1e+9a3v2D61UaPG2L6yTtoWNipmqCmFIBkC7QnSAPf97t27jJH1Z8JKEhf6cBap8oTaA++cd8wJJYXW8800GBdLwZAy4nqAcTHNEoERkCMhXp1cE6NKk7p10HniiPx8KRg6TIbnD5cRw0dUCgUjEoSCAtuZwrH3uiJlJzc5YcnpTMBmOTqMPUjAaT0+3sAR5nOcJ79y1TqWiTBbRRiJVqxYLnv37Y0IhQPEZL1kypQp9pz3aA2A4GHHchLUMZmDy4PRyX0jgDhs5WAxMlqGpuNWQ3rTdNvOgXs8CMrcs2ePHeOOp4HJG49Vr169/SdRUA5twIHBToD+eXkycOBAq1fv3r1VEeRIps6j8PKUlpVG3a1+WmuV1htXPm5V6Hno0CFTMkHglrc2aVw+WMIaBs4A6uYJWz3bHb1i+bKAQDmaebRo0aKlDB7iLQ9cV0E9cGC/FJ+PP3kmv+HDC0xpcs+8i9V375sQXn7A3WNWs2+Qg26xcAKM46Oo6LDR28GlZ2c5NPvGS3NliAoA7nOOWgfDgIGD7As6sYHnLHuwDy1Yt9ogJSONMUzfvtYIGovd2Kt3H2ma3tRGFAcqi6nGrt8FCz6Sd955S95+6/fy/rz31Wb3NjW6SZwDeeMCnjplqs010LhueI8VkrqgbmT0odWhTjCP+8AEQoZZxUo7SmXr1s026pqXTpULAjRhwiT52tdflJfnzjUBov1GAyrlVwx3NQribhzTqhJ85mNLPx/8QykxkjOJ5gQtn1yChkEaB8nYtFnTiKPFJs/RaHUG+TllFwtXny4qrG4ubNDHrp/ZtXDWNsheMh6IDdCHNtJm9hCyBgb/0R+e4nYja92QGuNdgXkxbhzb2NsbszDEDx02zLxIzgUIqDTEc8yFgLlVWttO7hOJeOTZr38/M2naaEcycrnnDimgQcpA19KWUydOyKLFC+XDDz+Q999/T/7wzjvy9ttv6vVtefePf1Tzc4l9pQcFQ1sJdDq7mfFsBTvW8TPHEdDUuO55Ha/dPHIMBgOx34oPl69bt042bFxvioojFCAyWmp0Vx4KqlXLVgmPOdQVlMMalqtjPPB9tY6dorutIwRQkA4eYBMsxyNoA8+4ogi2qbXywQfz5M/z/iTz58837yM7pDlGsW7NatuJHxzBaouUCQ0E5/9bMvnpp6WF2vGHDh6Uu/fumgcJE8StGdBIRzOEB+JUIpAGGARtN3LkaJkz53kVmDZ2dLq8/G6lNZq/SmhTbpffsTMgdCJ08A6fFdu8DUWBOckGTMwQtCYMwL61zZsL7UCdMbTmY3TyaYWiwKzxXOE+veIAWjqmZHEYIflIhXfevHm2cBqPaVxubH/q0rWbfZHmYYG+rQ42BywYqVaKt5Xf8Ya1ScNNFQ52jy/9dIkdeIOGCAOOEnbR79q1y/Y7susepbH0009l0cKFMu+DP8u+vfujyqIOSJnQAA6WsQ9o4qSnrQP4gDZDJPufOCfRV+1RhMENv9jwDoxGMIR3DHqoPDtjpsycNcu+i4ZvHhucRTk08l8r6F88RMxbsKFNIQSZxGcAzCU6Hlfy4kUL5OPFi+zgHYuZOEnAfVvFjq54t9N5A2d2qkdUypzgkAe04/twsbA4WiViQlczF3VkZ/7l0n8ZGKhzk4EDve0+ICI49tc72IcL/k86ijOSv/fuuyZEbjuXH93aTgMRFHgnf3h+QvMwGaRUaADCgqdi8tNTzDO0QzUuGoEJJtvgp+ncZPLEiTJq1CgZNjTfJmfshh6tv/ky43PPzZHZOrrwrbSdO3fKLg3pTdJtAugWHGPhiArcffBZFUSIWjluJE01/EIM4gXTBH8DRlVOKbKtI3ahzgHzidFzw4YNtnjJyU4+f+Wcz15+eq9XtiFBu5p8md/kQNMgaP4T+8siqr6x9zQiWG8CJhk7hRH4KKJtAsRzV3efCA96Xx3gIT6ozpGJqPBXri9zFEZpTvhiskHPqmVi1VRIZzX5pk9/RrrqKFo1TvJIudAAt7DHSMEuVjYBYlcy8nB+PKdjJ/tg9gQVHojztAoYxwX4pClnvhE0GKm4+Kx07d5NhubnGyHjAZoGtWJVDQkbBp/pvc/Hbqj28tDAyGf/6Z84cM8pw5UTvHfJYFg8V1OmTrPF2OhiYjQNfecFmMDbW2Xd6efhgKBMnjzFRmvydWnj4f597wWjGwzC6ORGZq9oV240A8pmvsheO6yESF0dSOeHym3maj8rAeuB50ErIkIfBf1bEzC3mTnrOfPkxZ66jNBP76GbW+2P1s8uZtIieDNmzDIPWpW21RIP5bO0gGGQkSZHJ7ccSOPMN8PnQbVBcZWeU0HisBQuRo7TFhUdsTMjZ8+cVYLfM399gdq2zIeiWrMy6HxMD9zYzAlgEAiDa5L1IrvXZ33VrGEB1mM6sZEPMwgzkbjEIz73zVQ4cTlX1rieyxn3K3OT2HJoK8/ooB49e1p8nmWx5ScryxbXEDi8PwhqkIkceMJzO1ilIypuXEw8diezvhBkHD5EEs/l7AEhFPtYHy5YisKDZC7mQLnQDuXWS+mLA2f48BE2n3DvAJ/POnT4oH1YI0JPv83cE1B+bJIkDfM1vqlAeTBsJdpqu7A26E8cHjWBd/Q9xxwggNHlns6ToZPRUMv06ObRjjpQHu3AZY4FM37CBFtDDDqP6oqUfVijOtBh2KF41VgfuXTxgu2MLiu7RRcbQ2DSoPGyCNoJVbd4xwfDMkLD+kPsJI++p3W5uX1MCCAqzUVoiovPm5aKbXx6epr01FGig5qHQSA0rNNw7p8PuQfTGYtpXjAEh++CIB2LvOfPF9u5eM6uc8KzrNT7CDyal/QwmKMDm0PxOmKiOvevA/Xn/wuzWOdB2PXeQ+8CHPPgwma7PQuZtjZ27ozviLhjX3/h66d8CwHnAvZ+PFsf5kc43XpbPE7hIxiujrQH5wfHu43W9tSjD/fsTmcEptyagvbgYeXEJ7uvacf1a9elVHmH3QW8RxkiFCxxNM+Aj7KsTmyYdetUqcQXIjTAFYO2YCKMS5oOVNpqg9NsvgLTuAZC9JoCxiQkaoppSNV0DghxIi+K01bxCO1pusQuy9hygqBupL11yxMWPqdr5961mVSb8tLSGkdokUgzkk9NhIZDa5hc5EW5uGQZoSgbt68T0OomxuRFmxPRCpA+SKva0rYmIF/HO7QDbypw+UIzAm1O1A+pwBcmNLGIV2wygvIo40Ekr44OpK2p0GDasaXJ5Rcs91GmdXX0+yLaldpxKwnQuNjwpCBe24MhZYjJ66GU8SUg2I7Y8EXgSxOaECEeVYRC86hDLRWsFQyWxEZLiFQiFJpHFM4UYVIdCfrM3Xur4SEeBkLKPoLAi2Ru7wpvsyKBnQfunnCvIrE3MUTd8KV5z0LUHqyf8C3noqKiyPYYBxZRweDBg203QnUu5RC1Qyg0jyDosgetGSEsD3Ot4klGKDSPMKrrui/K/fokIhSaECGSROgICBEiSYRCEyJEkgiFJkSIJBEKTYgQSSIUmhAhkkQoNCFCJIlQaEKESBKh0IQIkSRCoQkRIimI/D/3LENiXKjV1gAAAABJRU5ErkJggg=="
              />
            </Link>
          </Box>
          <HStack
            mt="1%"
            display={["none", "none", "none", "flex"]}
            justifyContent="center"
            gap="40px"
            paddingLeft="160px"
          >
            {options?.map((e, i) => (
              <Text
                key={i}
                // color={currentRoute==routesArr[i]?"#225886":""}
                // textDecoration={currentRoute==routesArr[i]?"underline":""}
                fontSize={{ md: "14px", lg: "16px" }}
                h="20px"
                fontFamily={"Poppins"}
                fontWeight="800"
                lineHeight={"20px"}
                cursor="pointer"
                borderBottom={selectedOption === e.path && "2px solid black"}
                onClick={() => handleOptionClick(e.path)}
              >
                <Link to={e.path}>{e.name}</Link>
              </Text>
            ))}
          </HStack>

          <Input
            w={["15%", "15%", "15%", "12%"]}
            m="auto"
            display={["none", "none", searchDisplay, searchDisplay]}
            placeholder="Search"
            borderRadius={"7px"}
            position="absolute"
            size={"sm"}
            border="2px solid #ccc"
            right={["0px", "0px", "0%", "10%"]}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleSearchEnter}
            ml={"140px"}
          />

          <HStack
            alignItems={"center"}
            position="absolute"
            right={["18%", "19%", "8%", "3%"]}
            justifyContent={"space-around"}
            display={["flex", "flex", "flex", "flex"]}
            w={"10%"}
          >
            <Icon as={Search2Icon} boxSize={7} onClick={handleSearch}></Icon>

            <Link to="/cart">
              <Icon position="relative" as={BsFillBagFill} boxSize={7} />
              <Text
                position="absolute"
                top="2"
                borderRadius="50%"
                textAlign="center"
                color="white"
                w="20px"
                h="20px"
                left="75px"
                transform="translateX(-50%)"
              >
                {totalValue}
              </Text>
            </Link>
            {state.isAuth ? (
              <Box onClick={handleLogout}>
                {" "}
                <Icon as={RiLogoutCircleFill} boxSize={8} mt={"4px"} />
              </Box>
            ) : (
              <Link to="/login">
                <Icon as={FaUserAlt} boxSize={7} />
              </Link>
            )}
          </HStack>
          <Icon
            position="absolute"
            right="2%"
            as={GiHamburgerMenu}
            boxSize={5}
            onClick={onOpen}
            display={["block", "block", "block", "none"]}
          />
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent bg="#ccc">
              <DrawerCloseButton />
              <DrawerHeader m="auto" w="100%">
                <Text
                  w="123px"
                  m="auto"
                  mt="5%"
                  h="19px"
                  fontFamily="Cinzel Decorative"
                  textAlign={"center"}
                  color={"#282828"}
                  fontSize="20.2257px"
                  lineHeight={"19px"}
                >
                  <Box mt="1%" mb="1%">
                    <Link to="/">
                      <Image
                        m="auto"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM0AAABFCAYAAADpX2LcAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAB3ASURBVHhe7Z1ndFXXlcc3VQgQRSAEolcBogtkejPFBgxxnDg2cSbdkziZyayVNd/n46zJxNMyHzKZiROXxHaIY9NsTDGmg+i9id5EEV0CBGL2b9973rt6ek/oSQ87wP3jo3vfvafus/c+++xzznW9+woJESJEjVHfv4YIEaKGCIUmRIgkEQpNiBBJIhSaECGSRCg0IUIkiVBoQoRIEqHQhAiRJEKhCREiSYRCEyJEkgiFJkSNUVFRIffu3ZMnfRNJuI0mxAMBiyAwp06dlNLSMunSpbOkpzeV+vWfTJ0bCk2IB6K8vFyOHj0iCxcukPPFxTJ16nQZUVAgzZs3fyIFJxSaENXi9u3bcvDgQVnyycdyRAWnQs2zpk2byjQVnJGjR0uLFi2eOMEJhSZEQty8eVP27tkjy5YtlRMnjks9FY769erZvKZx48YycdIkGTduvLRp01bq6fMnBaHQhIiL69evy/Zt22TVqpVy8uRJadSokXTt1k2aNW0mR48dlevXrtkIM1aFZsKEiZKTk+OnfPwRCk2IKrh69aps3bpFVq9eJWfPnLFRpWev3jJt2nRp27atCtLnsmnjRo13xeKPHDlKnp4yRTp16my/H3d84UITr7i6DO3kh919584d/0lVNGnSxDo+RPWAltd0BNm4cYOsXbvGJv3Qrl/fvjJx8hTp3r27NGzYUG7cuC6rV63SOGvl8uVLmk5kWP5wmTp1qnTr1t3P7fHFFyY0eGDKysrk9q1bxuB31S6mA2BmOiY9PV0aNGhgcZMRIvI6cOCAHGOSWlEh9fRfEBX6Ly9voPTs2fOJdZHWBLABI8yGDetlzZrVcuniRZvwDxw4SCZNmiydOneO0I/+KS0tlfXr1sqqz1fKBY3LswEDB5hnrWfPXo/1HOehCs3du3etI86dOysXlbAV9yqk7FaZ3FLhcSNDg4YNVHDSpFWrVpKV1U46dOhg9zUhOlWn8z75eLGs1M5jguq/8K6ax30VpOeff8EmrQhpKDhVgbK5fLlE1q9fL+t0hLl8+bK5k/N19Biv85X27dtXoht0p38Y4QsLC2XF8qVy9uxZU3p9cnPNjOvTJ/expXWDf1L49ykDnYCwHD9+TE6fPq1D/lX4Vxo2amyLYk3Sm0iaji4NlInL75TLFY178sQJOVx0WOOfMIHClZmWlubnmBjl5Xfk0OFDOtIctXIRGDrV6QKufdW86N69h3Xi46wBawNoduHCBVn12WeyTkcO+g3aFxQ8ZYomO7uywABoCF1RQh07dpTMzEwTGtJeLimx/Jo3z5A2bdpErIfHCSlXBWj7C+fPK/OfshElI6OF5OR0tFGkgRIfATqv7yHslStXpFxHo4yMDMlWbdaiRYaOSudlyZIlsnDhfDmqglATIAdOGOjgYOB5KCiJgdBgim3bucPmMy1btpIRIwpk3PgJ0q5ddkLauecIxaBBg2X2nK/YfIb+xz29a9dOszQeR6R0pKEDrujQjruyhQpLC+0ABIghfM+e3bJrxw7Zt2+vHCkqkuPHjpkr88yZM3Lxwnm5oWkgOGZBo4aNdJQ6bqMP99nZ2VW0ncMdHakOHTooxzS/4AgD3O/cvv2kRw9vThMKUFVAsZs3S3XUv20jzNhx40xgagpompWVZSMUgtdE56djxowxUztRvz3KSNmchmxu3Lhhk30m94woGzduNCG5qKMKjoBYkMYxMVd+IzQQv5ler+lw31hNNCaX+fn5cTuAOc3nOp8p1LLu3ccR4DEB4L6i4r5MVRt75MiRZk6EQlMVKCtGf0KXLl2kdevW/pvkQD5stykruym5uf0fW49lyoQGgiEwMCWE+2zFcjly5IjcunXLj1EZMDBzGuYvTNaDoEotW7aU5mq2lalQcJ0xY6YMGTLUjxEF5V66dMlMvXggL9YWYISg0CVq9sMUKsqsaf41iZvKNpAXlkK8OUiickBsWS6feAquJu2pLs6D3jvUNF5tkTKhgVDYsId1Uj5//kdmWpG1ZU8D3L0CgjJ0Dxk6zFaaL6h5dkLNMSaTCAENJm4j3x3N3IjV6Bde+NqXtg6AcKMAaGdjrTMmSG1MD9oFnRh5CbSXfEyJKMOinR/G5JlyqD/tgOY4Wbh+mcD7Rp1oL+7tmtAzSD9TuPob2tEWwsOgXSxSKjRnz56R9979owrO4YiAOLBvKVO1PcyPx4XQpUtXczffvn1L50Elsnv3XtmwfqONHKQnQASuMBMrz3O+8ryt6ThAPOZG57RstcRMPoP2GeYZi3Js86BTqOe+vWoyXrygRG4ciUoi0mZmtrX4MBWdwnb4o0ePyYVz5+Qa86779yStUZqNknl5eZI3YECl+sQDDFtSUqL1PCHni8/L5SuXvTUrZRre4SCxDtf5G3llZ7ez1fUePXrEZQIY7dSpU+bKr1+vfiVzlPwy22TaHI68mF8ePHjAlFjJ5Us6ct8yk7elmsAort69+0h7vcYDpi9eyRKdp8bX3PelX7/+5j0D0AsHQKnOj+o3QABcGo+2eOLoc9q+f98+83oyB0IJsX+tm/JGz169zEQPlkf/l5beVMV6wubA59Xc99b8yrTPK4x2aWlNfI9dprnIoV+zZs0S1LtuSJnQ0JF/+cs8WbtmrTGmy5Yrc5RBgwbJYDWv2rfvoFol3RiWxrpRBUAYGHT+/A+tkwHviIPQtVeif1VHmwHKqO45mwqXL1tqq9iUqw9JZGnd/bTp02Xs2PHGgMR5+603Zf/+/ZpnVYL2799fZs16zrIoLNwk27dvVSEusUVZGLJCXzgmp1P65PaVmTNnRRgnFrhht2/fJju2b7cR1Wl76mF08uOxEZI2Usc0VRDk3a9/nowfP8EcIUGwjrJy5QrbymJtDELrByM/O2OG0WblypVyVM3k69eveeXqe8pCO6Pd22d3kNFjx8hQHfVjBbS4uFg++WSxMXiVcny88srfGM3oC+a0v/mfX1u6eLQdMWKEjBk9VjZt2igbNbB/jVGDtChFhOW52XO0LkNVwTUwJQfNd+7YIVu2Fsqpk6ekVIXljiobFsetvxWOdg2hnSoElEWOKuVhw/K1bnkPVGrJIiXeMyrPhH/xokWmPYNAm01/5lnb2NexYyfrqAYNvOEUYgGuBDoS335OTgdjahjM4mhHc4XATWHUPn0iQzmMsP/APtsVQHyY265aD+7RSH1Um3ZXrU0a5k84KFhDIi2mn4tLyGqbZZpq7Zo1smb1KluUpZPoPBNuDbSXupB3sY5Aly5dNEalTUEwmi1Z8omsXvW5jcIwsTPJnKJw4Dfb7u9pvtSLEYI0x08cVxrm2IKvS0P79u/32hysO/e0p52OVKyHsTt5z+7dtu2F+hqTaR5Wlt6Tz6WSS952GY3P6O/6hDg3b95Qht0pJ1SBuTJi6YWDpl27dpYOeqxdu9qUw+0AbbnSbuaWV69dlfXr1kuJWhPUwbWJNtP/o8eMNR6gr6AXPLVs2adah5MmZJG+8NsSbA9tpDyEl10KeGmxDrAyUik4yRvlcUCFC1VzMJwHiQ4xn3l2hkk8Gnfp0k/ld2/8Vt556y3ZuXOHdVoQEIrQo0cvmTBxUoSg/OWe+CeVeCygBUGZBOJE0vhXg18nA/fuZyCuxdd3V9R0WrF8hWlCiB/tWBKRNpoXz1ln2r1rl6xfv85/6oG0bEnZpCMgJgj5AK8cj2bB4JXhwd3DeEe14xctWmj0c7SNBfEt+GUwN2Stq0jNZJjV8ovk77XDpaFs4n+uI9dBFUJg8Q20N5C//9zu/X9BWP1cHQNxASPBqdOnZeuWLWaeAu+d13eAXQQIFjxAX897/z3bZY1pe1fbEQtLpXl46f1yfRCfdCzYLlb6JXIU1QYpERpclWg9oCSwa4uWLWXM2HFmM28uLJS33nxTPlWti+bu1LmTrQPEamYAwTATnnpqZGStwBEVIl9XTcWcx/12V3cP3O/gs0rwHwfjWVAGOqEmwM7d2OU3LU6kbMGUgrl95ucf+WsatCRtRDMCGJH5RuGmTaZ9LYdAOcxDsLlp4+jRYyRXTTzME97BXBa0XOpzT8ORosOyUQXQyybaZneNDZhHp3UuhsBURTSeB+98zEmdI631dwQ4RON4cOmC6WOi2IPYeASYmB3TCKgTbtqIGce8E7NqoJrwmKVg0cIFsnXbVlMcHqJ52S+91lc+STfLhXlvVCkRnAgxymEOsjObfkoFUiI0xzhfocOgdbT+oxFdu3Y1O3nv3j1mF18quWgu45fnftNMNUahWBs6CHYJ9OjZI0IkQP53yj3TpTo4RvfgxLgqrNMI3PNAy7qr+dPB/KZsNwpYnlTFqlOZU3hfXHzOJqmAzjmG80AnrEG4evTt20++8dLL8uI3XpIXvvZ1+cEPX5XZs79ibcZEs+AzFoD5OT2JtkSpRN75Fffa4HIXM/GoUzAwl+Hqwbvy0zEbaTBZceKAaFxFsJxYmsXAe8/Vu3cRyQ/hDJqmtIO2UgecHnhGUR47dmy3EQI6ImDEJ4krG48q++K++73vy2s/+al857vfs10MmGBWJnkH6o/Jxp66s2dPR8quC1IiNGgQKlNftQaVZt7Sv1+emSjMC7Arc3XonTR5smrYTkYYOj8RyIt82mS2sd8+3Q0Q/ZYSATgCpQqQM0JUrR8T8Ly8AdJRR4WGDaOjIlFgG8r3PHbefIudDYB7bHeYwoujne7Xld9ts9qZ0kCrEhCWcePH2+bI/OHDZaKapjNmzpS5qmBeffVH8tO/+3tztzstnBjRMkBDHclhrm++8i2Z+81XTFiDIJYLtBuzF08bplF1/VMbuDIcmLcM0Qk/Tp3WmZmSN2Cg0QFBwdQt8033YBryYM/iiIKn5KWX55oSxkvI9fmvvmDP4S3aT3BpaQsj6KaNm0xI64rUCI1OWD14FWXIzGqXJUVFh2w7TOtWrWXw4CHSuXOXSIOqg2ss6zSAX0GmS3WHaqb+jZc/Ltlxalq+9tpP5Uc/fk1+9rN/sO3xzhVKiHamd+UvppgH9y4Aje/avWfPLjuvwtYfRk2Ei85mAfd7qj2//uKLMnPmc2beDho8OOIWduasy6cS9JH32HuHiTd92jPGXGN0cj1W8/rxaz+x/Oy9RdZ60hZ74o1oODaYC3iI044kYcpF/wVzwqP1/e//UH7wg1flb3/0mvz85/8oo0aNthEEtzxzsagJZxcDebBswdIDCoQ+cAFHyQAVPJRRZUB3yH9f9u3fZ86LuiIl3HfDt+VdAxo3amyamUm7NUgbmt3e2/wXt8Nj4OK4eYVB8wFoz2bNmto9eacK5OTK5TwIDMsmUjw6uMzpqOz20fWMKu3Qurg5BG1vHTje4K7ORGKD5PyPPpTXf/kL+cW//LP82+u/lN/85teyYMF8tb83mWsVbU9c0ror4J4RPR68eN41Nzc38sUYl5Z5w+zZc2xhljhEtqvBi4OnraTEmzMaUkBir15e30NTRlS8mZjnKAIm/wgB7w8fOhQzF/OUpLnJNW6nzl2la5cu9obnpHFKFO+fExpXJumZM3HPPshTZ07b+7ogJUKT0TzDrlTMKqoVZgJ2XTsANG7EYbMHb/N3IA+076nTp/wnHiBEk7QmplUcjC4pgEdgHd20Y3B505FBsA2HhTM6LgiXzmNCuzXm7K5mA2tSgCgungNMwNwJJwobTrds3mzngn7/uzfk9df/Vf7zP/7dPpl0Rjs5MofxQVHVgbK6du0eMef47RiLBUZMZFCvHs+8ernqMVri2vUQFKo6IND2jjkdpYMKTpSpKwMnD84Pg3uvcV0tSktvyGalFU6WSqGw0LyY167p3Npva+W61/NH0mL/d+2REqHp4H9UwVUSj8eVq1cinc0H5tjFDB7UCe4928vxswcJi2Zqm9U2wtDxiF5buLxg+NatM81UAO65acUGjZxcVAvawK7fgqeeMiF0TSYvCzAj8TS4hbnIOw1MXJmUI0T//av/spOUPAPknYiGpOUdV0ZHRskgeIfwuLmi1NN8CAqXJS70u/cqu8DrCuoDUDj0X0aLjMizIOAXhNaZZg6uzeXKVwjGG2/8X9Xw2/+VP/zhbdvGRXryDwY3OsOXdUVKhAbtRcVch925c9s0BgwI8MuzHQVJ53114D07A5YvXRZZx3EdyMImHha2S6QajkdgcurtNHMQMHdNWIk2YBaxzZ4Vfe6DnsKo3vQARRxV3DvyIDC/wJTjIxc4GB5EP0DdEZhEcSPCRFF+VRyNYTicLamEq0UTpWvz5hwu9BRSLGifCY3rDFcn++vB0SVRiAV5RfJTOJ6qC1IiNOwZgjEMWnEajqZkbgOzMNxv3brV9nyZGzGmIYDfaBq8HMuWLZNt27caEXjuCMII069fZQ9QquGVlRKymIeI3RC4ldmj1i47y+gU9B5CBaOH/YrC0Yj6QM+VKz8z1z6/vQjepRI0vnfxNjXGwqUtvxtnodB/58rjGmsW1hXsBGFFP6hAgjBhV6UVaaPCb5KB5ygu4iQbzFLQayDrWiNFI0229O7Tx+4bqRbDLYgbmnUFmIRONHPjk49ly5bNtsDJ7gEEiNGHTkJYMMlYvWURlDTACKWheUYLGTo037bioAnd8yBR64QAMVNA1whwo7KI+e1vf1e+9a3v2D61UaPG2L6yTtoWNipmqCmFIBkC7QnSAPf97t27jJH1Z8JKEhf6cBap8oTaA++cd8wJJYXW8800GBdLwZAy4nqAcTHNEoERkCMhXp1cE6NKk7p10HniiPx8KRg6TIbnD5cRw0dUCgUjEoSCAtuZwrH3uiJlJzc5YcnpTMBmOTqMPUjAaT0+3sAR5nOcJ79y1TqWiTBbRRiJVqxYLnv37Y0IhQPEZL1kypQp9pz3aA2A4GHHchLUMZmDy4PRyX0jgDhs5WAxMlqGpuNWQ3rTdNvOgXs8CMrcs2ePHeOOp4HJG49Vr169/SdRUA5twIHBToD+eXkycOBAq1fv3r1VEeRIps6j8PKUlpVG3a1+WmuV1htXPm5V6Hno0CFTMkHglrc2aVw+WMIaBs4A6uYJWz3bHb1i+bKAQDmaebRo0aKlDB7iLQ9cV0E9cGC/FJ+PP3kmv+HDC0xpcs+8i9V375sQXn7A3WNWs2+Qg26xcAKM46Oo6LDR28GlZ2c5NPvGS3NliAoA7nOOWgfDgIGD7As6sYHnLHuwDy1Yt9ogJSONMUzfvtYIGovd2Kt3H2ma3tRGFAcqi6nGrt8FCz6Sd955S95+6/fy/rz31Wb3NjW6SZwDeeMCnjplqs010LhueI8VkrqgbmT0odWhTjCP+8AEQoZZxUo7SmXr1s026pqXTpULAjRhwiT52tdflJfnzjUBov1GAyrlVwx3NQribhzTqhJ85mNLPx/8QykxkjOJ5gQtn1yChkEaB8nYtFnTiKPFJs/RaHUG+TllFwtXny4qrG4ubNDHrp/ZtXDWNsheMh6IDdCHNtJm9hCyBgb/0R+e4nYja92QGuNdgXkxbhzb2NsbszDEDx02zLxIzgUIqDTEc8yFgLlVWttO7hOJeOTZr38/M2naaEcycrnnDimgQcpA19KWUydOyKLFC+XDDz+Q999/T/7wzjvy9ttv6vVtefePf1Tzc4l9pQcFQ1sJdDq7mfFsBTvW8TPHEdDUuO55Ha/dPHIMBgOx34oPl69bt042bFxvioojFCAyWmp0Vx4KqlXLVgmPOdQVlMMalqtjPPB9tY6dorutIwRQkA4eYBMsxyNoA8+4ogi2qbXywQfz5M/z/iTz58837yM7pDlGsW7NatuJHxzBaouUCQ0E5/9bMvnpp6WF2vGHDh6Uu/fumgcJE8StGdBIRzOEB+JUIpAGGARtN3LkaJkz53kVmDZ2dLq8/G6lNZq/SmhTbpffsTMgdCJ08A6fFdu8DUWBOckGTMwQtCYMwL61zZsL7UCdMbTmY3TyaYWiwKzxXOE+veIAWjqmZHEYIflIhXfevHm2cBqPaVxubH/q0rWbfZHmYYG+rQ42BywYqVaKt5Xf8Ya1ScNNFQ52jy/9dIkdeIOGCAOOEnbR79q1y/Y7susepbH0009l0cKFMu+DP8u+vfujyqIOSJnQAA6WsQ9o4qSnrQP4gDZDJPufOCfRV+1RhMENv9jwDoxGMIR3DHqoPDtjpsycNcu+i4ZvHhucRTk08l8r6F88RMxbsKFNIQSZxGcAzCU6Hlfy4kUL5OPFi+zgHYuZOEnAfVvFjq54t9N5A2d2qkdUypzgkAe04/twsbA4WiViQlczF3VkZ/7l0n8ZGKhzk4EDve0+ICI49tc72IcL/k86ijOSv/fuuyZEbjuXH93aTgMRFHgnf3h+QvMwGaRUaADCgqdi8tNTzDO0QzUuGoEJJtvgp+ncZPLEiTJq1CgZNjTfJmfshh6tv/ky43PPzZHZOrrwrbSdO3fKLg3pTdJtAugWHGPhiArcffBZFUSIWjluJE01/EIM4gXTBH8DRlVOKbKtI3ahzgHzidFzw4YNtnjJyU4+f+Wcz15+eq9XtiFBu5p8md/kQNMgaP4T+8siqr6x9zQiWG8CJhk7hRH4KKJtAsRzV3efCA96Xx3gIT6ozpGJqPBXri9zFEZpTvhiskHPqmVi1VRIZzX5pk9/RrrqKFo1TvJIudAAt7DHSMEuVjYBYlcy8nB+PKdjJ/tg9gQVHojztAoYxwX4pClnvhE0GKm4+Kx07d5NhubnGyHjAZoGtWJVDQkbBp/pvc/Hbqj28tDAyGf/6Z84cM8pw5UTvHfJYFg8V1OmTrPF2OhiYjQNfecFmMDbW2Xd6efhgKBMnjzFRmvydWnj4f597wWjGwzC6ORGZq9oV240A8pmvsheO6yESF0dSOeHym3maj8rAeuB50ErIkIfBf1bEzC3mTnrOfPkxZ66jNBP76GbW+2P1s8uZtIieDNmzDIPWpW21RIP5bO0gGGQkSZHJ7ccSOPMN8PnQbVBcZWeU0HisBQuRo7TFhUdsTMjZ8+cVYLfM399gdq2zIeiWrMy6HxMD9zYzAlgEAiDa5L1IrvXZ33VrGEB1mM6sZEPMwgzkbjEIz73zVQ4cTlX1rieyxn3K3OT2HJoK8/ooB49e1p8nmWx5ScryxbXEDi8PwhqkIkceMJzO1ilIypuXEw8diezvhBkHD5EEs/l7AEhFPtYHy5YisKDZC7mQLnQDuXWS+mLA2f48BE2n3DvAJ/POnT4oH1YI0JPv83cE1B+bJIkDfM1vqlAeTBsJdpqu7A26E8cHjWBd/Q9xxwggNHlns6ToZPRUMv06ObRjjpQHu3AZY4FM37CBFtDDDqP6oqUfVijOtBh2KF41VgfuXTxgu2MLiu7RRcbQ2DSoPGyCNoJVbd4xwfDMkLD+kPsJI++p3W5uX1MCCAqzUVoiovPm5aKbXx6epr01FGig5qHQSA0rNNw7p8PuQfTGYtpXjAEh++CIB2LvOfPF9u5eM6uc8KzrNT7CDyal/QwmKMDm0PxOmKiOvevA/Xn/wuzWOdB2PXeQ+8CHPPgwma7PQuZtjZ27ozviLhjX3/h66d8CwHnAvZ+PFsf5kc43XpbPE7hIxiujrQH5wfHu43W9tSjD/fsTmcEptyagvbgYeXEJ7uvacf1a9elVHmH3QW8RxkiFCxxNM+Aj7KsTmyYdetUqcQXIjTAFYO2YCKMS5oOVNpqg9NsvgLTuAZC9JoCxiQkaoppSNV0DghxIi+K01bxCO1pusQuy9hygqBupL11yxMWPqdr5961mVSb8tLSGkdokUgzkk9NhIZDa5hc5EW5uGQZoSgbt68T0OomxuRFmxPRCpA+SKva0rYmIF/HO7QDbypw+UIzAm1O1A+pwBcmNLGIV2wygvIo40Ekr44OpK2p0GDasaXJ5Rcs91GmdXX0+yLaldpxKwnQuNjwpCBe24MhZYjJ66GU8SUg2I7Y8EXgSxOaECEeVYRC86hDLRWsFQyWxEZLiFQiFJpHFM4UYVIdCfrM3Xur4SEeBkLKPoLAi2Ru7wpvsyKBnQfunnCvIrE3MUTd8KV5z0LUHqyf8C3noqKiyPYYBxZRweDBg203QnUu5RC1Qyg0jyDosgetGSEsD3Ot4klGKDSPMKrrui/K/fokIhSaECGSROgICBEiSYRCEyJEkgiFJkSIJBEKTYgQSSIUmhAhkkQoNCFCJIlQaEKESBKh0IQIkSRCoQkRIimI/D/3LENiXKjV1gAAAABJRU5ErkJggg=="
                      />
                    </Link>
                  </Box>
                </Text>
              </DrawerHeader>

              <DrawerBody h="77vh">
                <VStack
                  m="auto"
                  h="100%"
                  alignItems={"center"}
                  display={["flex", "flex", "flex", "none"]}
                  justifyContent="space-around"
                  w="80%"
                >
                  {options?.map((e, i) => (
                    <Text
                      key={i}
                      // color={currentRoute==routesArr[i]?"#225886":""}
                      // textDecoration={currentRoute==routesArr[i]?"underline":""}
                      fontSize={{ md: "14px", lg: "16px" }}
                      h="20px"
                      fontFamily={"Montserrat"}
                      fontWeight="800"
                      lineHeight={"20px"}
                      cursor="pointer"
                      borderBottom={
                        selectedOption === e.path && "2px solid black"
                      }
                      onClick={() => handleOptionClick(e.path)}
                    >
                      <Link to={e.path}>{e.name}</Link>
                    </Text>
                  ))}
                </VStack>
              </DrawerBody>

              <DrawerFooter>
                <Button
                  variant="outline"
                  m="auto"
                  bg="blue.700"
                  onClick={onClose}
                >
                  Close
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </HStack>

        <Input
          w="100%"
          m="auto"
          size={"sm"}
          placeholder="Search"
          mt="0.5%"
          mb="0.5%"
          border="2px solid #ccc"
          borderRadius={"7px"}
          display={[searchDisplay, searchDisplay, "none", "none"]}
          value={query}
          onChange={handleSearchBox}
          onKeyPress={handleSearchEnter}
          ml={"30px"}
        />
      </Box>
    </>
  );
};

export default Navbar;
