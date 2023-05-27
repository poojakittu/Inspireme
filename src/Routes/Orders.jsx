import { useState, useEffect } from 'react';
import { Container, List, ListItem, Text, Badge, Box, Image, Divider, Flex } from '@chakra-ui/react';

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from a mock API
    fetch('https://shy-puce-cheetah-hose.cyclic.app/order')
      .then(response => response.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <Container maxW="container.lg" bg="gray.100" p={4} borderRadius="lg" mt="130px" boxShadow="md">
      <Text fontSize="4xl" fontWeight="bold" mb={6}>My Orders</Text>
      <List spacing={6}>
        {orders.map(order => (
          <ListItem key={order.id} bg="white" borderRadius="md" boxShadow="md"
            _hover={{ bg: 'gray.200' }}
            _focus={{ boxShadow: 'outline' }}>
            <Box p={6}>
              <Flex alignItems="center" justifyContent="space-between" mb={4}>
                <Text fontWeight="bold">Order #{order.id}</Text>
                <Badge colorScheme={order.completed ? 'green' : 'orange'}>{order.completed ? 'Delivered' : 'Processing'}</Badge>
              </Flex>
              <Flex alignItems="center" mb={4}>
                <Image src="https://via.placeholder.com/120x120" alt="Product Image" mr={4} borderRadius="md" />
                <Box>
                  <Text fontWeight="bold">Product Name</Text>
                  <Text>Price: $10</Text>
                </Box>
              </Flex>
              <Divider my={4} />
              <Flex alignItems="center" justifyContent="space-between">
                <Box>
                  <Text fontWeight="bold">Delivery Details:</Text>
                  <Text>John Doe</Text>
                  <Text>123 Main St.</Text>
                  <Text>Anytown, USA 12345</Text>
                  <Text>Delivery Date: 12/31/2023</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Payment Details:</Text>
                  <Text>Card ending in 1234</Text>
                  <Text>Amount: $10</Text>
                </Box>
              </Flex>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default MyOrders;
