import { useContext, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./Login.module.css";
import {
  useToast,
  Button,
  Text,
  Box,
  Input,
} from "@chakra-ui/react";
import { AuthContext } from "../AuthContext";
import { Navigate, NavLink } from "react-router-dom";
function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otpCode, setOTPCode] = useState("");
  const { state, loginUser, logoutUser } = useContext(AuthContext);
  const [sentOTP, setSentOTP] = useState(false);
  const [verifiedOTP, setVerifiedOTP] = useState(false);

  const handleSendOTP = async () => {
    const response = await fetch(
      "https://shy-puce-cheetah-hose.cyclic.app/otp/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    if (response.ok) {
      setSentOTP(true);
      toast({
        title: "OTP Sent Successfully!!",

        status: "success",

        isClosable: true,
        position: "top",
      });
    } else {
      // Handle error
      toast({
        title: "Error In Sending OTP!!",

        status: "failure",

        isClosable: true,
        position: "top",
      });
    }
  };
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
  const handleVerifyOTP = async () => {
    const response = await fetch(
      "https://shy-puce-cheetah-hose.cyclic.app/otp/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          otpCode,
        }),
      }
    );

    if (response.ok) {
      const { token } = await response.json();
      // Store token in headers for subsequent requests
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
  };
  const token = localStorage.getItem("token");
  // const handleProtectedResource = async () => {

  //   const response = await fetch(
  //     "https://erin-tough-viper.cyclic.app/user/protected_resource",
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );

  //   if (response.ok) {
  //     // Handle success
  //   } else {
  //     // Handle error
  //   }
  // };

  if (!sentOTP && !token) {
    return (
      <Box mt="130px">
        <div style={{ marginTop: "120px" }} className={styles.container}>
          <div className={styles.img_left}>
            <img
              className={styles.image}
              src="https://img.freepik.com/free-vector/online-shopping-banner-mobile-app-templates-concept-flat-design_1150-34862.jpg?w=740&t=st=1678536301~exp=1678536901~hmac=6e4572eecbc52167869f41a67566639208396a61acb6ff15fa20c303ae9810f3"
            />
          </div>
          <div className={styles.img_right}>
            <div className={styles.hi_image}>
              <img src="https://media.sugarcosmetics.com/upload/Hi!.png" />
            </div>
            <div className={styles.logininput}>
              <h3>Login/Sign Up Using Phone</h3>
            </div>

            <div className={styles.input_box}>
              {" "}
              <form>
                <PhoneInput
                  country={"us"}
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  countryCodeEditable={false}
                  onChangeCountry={setCountryCode}
                  inputStyle={{ width: "100%" }}
                />
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
                <Button onClick={handleSendOTP}>Send OTP</Button>
              </form>
            </div>
          </div>
        </div>
        <Box m="auto" textAlign="center" color="grey">
          <Text>
            Registering for this site allows you to access your order status and
            history. Just fill in the above fields, and we'll get a new account
            set up for you in no time. We will only ask you for information
            necessary to make the purchase process faster and easier.
          </Text>
        </Box>
      </Box>
    );
  }

  if (!verifiedOTP && !token) {
    return (
      <Box mt="130px">
        <div style={{ marginTop: "120px" }} className={styles.container}>
          <div className={styles.img_left}>
            <img
              className={styles.image}
              src="https://img.freepik.com/free-vector/online-shopping-banner-mobile-app-templates-concept-flat-design_1150-34862.jpg?w=740&t=st=1678536301~exp=1678536901~hmac=6e4572eecbc52167869f41a67566639208396a61acb6ff15fa20c303ae9810f3"
            />
          </div>
          <div className={styles.img_right}>
            <div className={styles.hi_image}>
              <img src="https://media.sugarcosmetics.com/upload/Hi!.png" />
            </div>
            <div className={styles.logininput}>
              <h3>Login/Sign Up Using Phone</h3>
            </div>

            <div className={styles.input_box}>
              {" "}
              <form>
                <PhoneInput
                  country={countryCode}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  countryCodeEditable={false}
                  inputStyle={{ width: "100%" }}
                />

                <Input
                  value={otpCode}
                  onChange={(e) => setOTPCode(e.target.value)}
                  placeholder="OTP Code"
                />
                <Button onClick={handleVerifyOTP}>Verify OTP</Button>
              </form>
            </div>
          </div>
        </div>
        <Box m="auto" textAlign="center" color="grey">
          <Text>
            Registering for this site allows you to access your order status and
            history. Just fill in the above fields, and we'll get a new account
            set up for you in no time. We will only ask you for information
            necessary to make the purchase process faster and easier.
          </Text>
        </Box>
      </Box>
    );
  }
  return <Navigate to="/inspire" />;

  // return <Box mt="130px">
  //   <Text>USER LOGGED IN!</Text>
  //   <Button onClick={handleLogout} mt="20px" p="20px" mb="20px">
  //     LOGOUT
  //   </Button>
  //   </Box>;
}
export default Login;
