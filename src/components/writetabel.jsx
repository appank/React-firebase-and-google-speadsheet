// components/WriteTable.jsx
import { Box, Button, Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const WriteTable = () => {
  const [data, setData] = useState([]);

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
    alert(`Edit data ID: ${id}`);
    // Tambahkan modal atau navigasi ke form edit
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
  
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box bg="white" p={5} borderRadius="lg" boxShadow="md" overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
          <Th >No</Th>
          {/* <Th >ID</Th> */}
            <Th>Nama</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, i) => (
            <Tr key={item.id}>
                <Td color="black">{i + 1}</Td>
              {/* <Td color="black" >{item.id}</Td> */}
              <Td color="black" >{item.name}</Td>
              <Td color="black" >{item.email}</Td>
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
  );
};


export default WriteTable;
