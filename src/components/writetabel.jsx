// components/WriteTable.jsx
import {
    Box,
    Button,
    Flex,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    FormControl,
    FormLabel,
  } from "@chakra-ui/react";
// import { Box, Button, Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const WriteTable = () => {
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
const [editData, setEditData] = useState({ id: "", name: "", email: "" });


  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/data");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Gagal fetch data:", err);
    }
  };

  const handleEdit = (id) => {
    const selected = data.find((item) => item.id === id);
    if (selected) {
      setEditData(selected);
      onOpen();
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus data ini?");
    if (!konfirmasi) return;
  
    try {
      const res = await fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        alert("Data berhasil dihapus");
        fetchData(); // refresh data
      } else {
        alert("Gagal menghapus data");
      }
    } catch (err) {
      console.error("Error saat hapus:", err);
      alert("Terjadi kesalahan saat menghapus");
    }
  };
  
  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/update/${editData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editData.name,
          email: editData.email,
        }),
      });
  
      if (res.ok) {
        alert("Data berhasil diperbarui");
        onClose();
        fetchData();
      } else {
        alert("Gagal memperbarui data");
      }
    } catch (err) {
      console.error("Gagal update:", err);
      alert("Terjadi kesalahan saat memperbarui data");
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box bg="white" p={5} borderRadius="lg" boxShadow="md"  overflowX="auto">
    <Box maxHeight="70vh" overflowY="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Nama</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, i) => (
            <Tr key={item.id}>
              <Td color="black">{i + 1}</Td>
              <Td color="black">{item.name}</Td>
              <Td color="black">{item.email}</Td>
              <Td>
                <Flex gap={2}>
                  <Button colorScheme="blue" size="sm" onClick={() => handleEdit(item.id)}>
                    Edit
                  </Button>
                  <Button colorScheme="red" size="sm" onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
    {/* Modal tetap seperti sebelumnya */}
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel color="black">Nama</FormLabel>
            <Input
              color="black"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="black">Email</FormLabel>
            <Input
              color="black"
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
            Simpan
          </Button>
          <Button onClick={onClose}>Batal</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </Box>
  
  );
};


export default WriteTable;
