import { Box, Flex, Text, Image, Button, Icon, useTheme } from '@chakra-ui/react';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';

const mockOrders = [
  {
    id: 1,
    orderNumber: '1234567890',
    orderDate: 'March 23, 2023',
    orderStatus: 'Delivered',
    shippingAddress: '123 Main St, Anytown, USA',
    products: [
      {
        id: 1,
        name: 'Product 1',
        quantity: 2,
        price: 10.0,
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        name: 'Product 2',
        quantity: 1,
        price: 5.0,
        image: 'https://via.placeholder.com/150',
      },
    ],
    total: 25.0,
    deliveryStatus: 'Delivered',
    estimatedDeliveryDate: 'March 25, 2023',
  },
  {
    id: 2,
    orderNumber: '0987654321',
    orderDate: 'March 20, 2023',
    orderStatus: 'In Progress',
    shippingAddress: '456 Elm St, Anytown, USA',
    products: [
      {
        id: 3,
        name: 'Product 3',
        quantity: 3,
        price: 15.0,
        image: 'https://via.placeholder.com/150',
      },
    ],
    total: 45.0,
    deliveryStatus: 'In Transit',
    estimatedDeliveryDate: 'March 24, 2023',
  },
];

const Myorders = () => {
  const [orders, setOrders] = useState(mockOrders);
  const theme = useTheme();

  const handleCancelOrder = (id) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === id) {
        return { ...order, orderStatus: 'Canceled' };
      } else {
        return order;
      }
    });
    setOrders(updatedOrders);
  };

  return (
    <Flex mt="140px" direction="column" align="center">
      {orders.map((order) => (
        <Box
          key={order.id}
          bg={theme.colors.gray[100]}
          borderRadius={theme.radii.lg}
          boxShadow={theme.shadows.md}
          p={4}
          mb={4}
          w={{ base: '90%', sm: '80%', md: '70%' }}
          maxW="800px"
        >
          <Flex justify="space-between" mb={4} align={{ base: 'flex-start', md: 'center' }}>
            <Text fontSize="2xl" fontWeight="bold">
              Order Number: {order.orderNumber}
            </Text>
            <Text color={order.orderStatus === 'Delivered' ? 'green.500' : 'gray.500'} fontSize="lg" fontWeight="medium">
              {order.orderStatus}
              </Text>
              <Button variant="outline" colorScheme="red" size="sm" onClick={() => handleCancelOrder(order.id)}>
Cancel Order
</Button>
</Flex>
<Flex direction={{ base: 'column', md: 'row' }} justify="space-between">
<Box flex={1} mr={{ md: 4 }}>
<Text fontSize="lg" fontWeight="bold" mb={2}>
Shipping Address:
</Text>
<Text>{order.shippingAddress}</Text>
<Text fontSize="lg" fontWeight="bold" mt={4} mb={2}>
Products:
</Text>
{order.products.map((product) => (
<Flex key={product.id} align="center" mb={2}>
<Image src={product.image} alt={product.name} mr={2} w={16} />
<Text>
{product.name} ({product.quantity}) - ${product.price}
</Text>
</Flex>
))}
</Box>
<Box flexShrink={0} mt={{ base: 4, md: 0 }}>
<Text fontSize="lg" fontWeight="bold" mb={2}>
Order Summary:
</Text>
<Text>
Total: ${order.total}
</Text>
<Text>
Delivery Status: {order.deliveryStatus}
</Text>
<Text>
Estimated Delivery Date: {order.estimatedDeliveryDate}
</Text>
</Box>
</Flex>
</Box>
))}
</Flex>
);
};

export default Myorders;