import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect,  useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
//import PhoneInput from "react-phone-input-2";
//import "react-phone-input-2/lib/style.css";
//import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
//import { auth } from "../firebase/FirebaseConfig";
import { Link } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
 // const otpRef = useRef();
 // const [showOTP, setShowOTP] = useState(false);
  //const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const {
    signInWithGoogle,
    signInWithEmail,
    currentUser,
    //setCurrentUser,
  } = UserAuth();

  const handleLoginWithEmail = async () => {
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      toast({ title: "Login successful", status: "success", position: "top" });
    } catch (err) {
      toast({
        title: "Login failed",
        description: err.message,
        status: "error",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  // const CaptchaVerify = () => {
  //   if (!window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(
  //       "recaptcha-container",
  //       {
  //         size: "invisible",
  //         callback: () => onSignIn(),
  //         "expired-callback": () => {},
  //       },
  //       auth
  //     );
  //   }
  // };

  // const onSignIn = () => {
  //   setLoading(true);
  //   CaptchaVerify();

  //   const verifier = window.recaptchaVerifier;
  //   const number = "+" + phone;

  //   signInWithPhoneNumber(auth, number, verifier)
  //     .then((confirmationResult) => {
  //       window.confirmationResult = confirmationResult;
  //       setLoading(false);
  //       setShowOTP(true);
  //       toast({
  //         title: `OTP sent successfully!`,
  //         status: "success",
  //         isClosable: true,
  //         position: "top",
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast({
  //         title: "OTP sending failed",
  //         description: error.message,
  //         status: "error",
  //         position: "top",
  //       });
  //       setLoading(false);
  //     });
  // };

  // const onRecieveOTP = () => {
  //   setLoading(true);
  //   window.confirmationResult
  //     .confirm(otpRef.current.value)
  //     .then(async (response) => {
  //       await setCurrentUser(response.user);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast({
  //         title: "OTP verification failed",
  //         description: error.message,
  //         status: "error",
  //         position: "top",
  //       });
  //       setLoading(false);
  //     });
  // };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <Center w="100%" h="100dvh" px="10px">
      <Flex flexDir="column" maxW="400px" w="100%" gap="20px">
        <Box id="recaptcha-container" />

        {/* OTP or Phone Auth */}
        {/* {showOTP ? (
          <Flex gap="10px" flexDir="column" align="center">
            <Text fontSize="lg">Enter the OTP</Text>
            <Input ref={otpRef} autoFocus textAlign="center" type="number" />
            <Button
              onClick={onRecieveOTP}
              isLoading={loading}
              colorScheme="blue"
              mt="10px"
            >
              Verify OTP
            </Button>
          </Flex>
        ) : (
          <Flex gap="10px" flexDir="column" align="center">
            <Text fontSize="lg">Sign in with phone number</Text>
            <PhoneInput
              value={phone}
              onChange={setPhone}
              country="id"
              className="phone-input"
            />
            <Button
              isLoading={loading}
              onClick={onSignIn}
              colorScheme="blue"
              mt="10px"
            >
              Receive OTP
            </Button>
          </Flex>
        )} */}

       

        {/* Email & Password */}
        <Text fontSize="lg" mt="20px">
          Sign in with Email
        </Text>
        <Input
          color="black"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
        color="black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          isLoading={loading}
          onClick={handleLoginWithEmail}
          colorScheme="teal"
        >
          Login
        </Button>
        <Text color="gray.600">
  Don't have an account?{" "}
  <Link to="/register" style={{ color: "blue" }}>
    Register
  </Link>
</Text>
 {/* Divider */}
 <Flex my="25px" align="center" px="10%">
          <Divider />
          <Text px="15px">OR</Text>
          <Divider />
        </Flex>

        {/* Google Sign-in */}
        <Button onClick={handleSignInWithGoogle} colorScheme="red">
          Sign in with Google
        </Button>
      </Flex>
    </Center>
  );
}

export default Login;
