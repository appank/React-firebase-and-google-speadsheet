
import {
    Button,
    Center,
    Flex,
    Input,
    Text,
    useToast,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { UserAuth } from "../context/AuthContext";
  import { useNavigate } from "react-router-dom";
  
  function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { registerWithEmail } = UserAuth();
    const toast = useToast();
    const navigate = useNavigate();
  
    const handleRegister = async () => {
      try {
        await registerWithEmail(email, password);
        toast({
          title: "Registrasi berhasil",
          status: "success",
          position: "top",
        });
        navigate("/login");
      } catch (err) {
        toast({
          title: "Registrasi gagal",
          description: err.message,
          status: "error",
          position: "top",
        });
      }
    };
  
    return (
      <Center w="100%" h="100vh" px="10px">
        <Flex flexDir="column" maxW="400px" w="100%" gap="20px">
          <Text fontSize="lg">Daftar Akun Baru</Text>
          <Input color="black"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input color="black"
            type="password"
            placeholder="Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleRegister} colorScheme="teal">
            Daftar
          </Button>
          <Text color="gray.600">
            already have an account?{" "}
            <a href="/login" style={{ color: "blue" }}>
              Masuk
            </a>
          </Text>
        </Flex>
      </Center>
    );
  }
  
  export default Register;
  