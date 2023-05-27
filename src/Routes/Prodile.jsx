import { useState } from 'react';
import { 
  Container, 
  Box, 
  Text, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  Stack, 
  Divider, 
  List, 
  ListItem, 
  Badge, 
  Accordion, 
  AccordionItem, 
  AccordionButton, 
  AccordionPanel, 
  AccordionIcon 
} from '@chakra-ui/react';

function ProfilePage() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [password, setPassword] = useState('********');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Container maxW="container.lg" bg="white" p={4} borderRadius="lg" mt="120px" boxShadow="md">
      <Text fontSize="4xl" fontWeight="bold" mb={6}>My Profile</Text>
      <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} mb={6}>
        <Box flex="1" mr={{ md: 6 }}>
          <Text fontWeight="bold" mb={2}>Account Information</Text>
          <Divider />
          <FormControl mt={4}>
            <FormLabel>Name</FormLabel>
            <Input type="text" value={name} onChange={handleNameChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={handleEmailChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Phone Number</FormLabel>
            <Input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={handlePasswordChange} />
          </FormControl>
          <Button colorScheme="blue" mt={6}>Save Changes</Button>
        </Box>
        <Box flex="1">
          <Text fontWeight="bold" mb={2}>Orders</Text>
          <Divider />
          <Accordion mt={4} allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Order #123
                </Box>
                <Box flex="1" textAlign="center">
                  01/01/2022
                </Box>
                <Box flex="1" textAlign="right">
                  <Badge colorScheme="green">Delivered</Badge>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Stack direction={{ base: 'column', md: 'row' }} spacing={3}>
                  <Box flex="1">
                    <Text fontWeight="bold">Order #123</Text>
                    <Text fontSize="sm" color="gray.500">Placed on 01/01/2022</Text>
                  </Box>
                  <Box>
                    <Badge colorScheme="green">Delivered</Badge>
                    </Box>
            </Stack>
            <List mt={4}>
              <ListItem>
                <Text fontWeight="bold">Item #1</Text>
                <Text fontSize="sm" color="gray.500">Lorem ipsum dolor sit amet</Text>
                <Text fontSize="sm" color="gray.500">Qty: 1</Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Item #2</Text>
                <Text fontSize="sm" color="gray.500">Consectetur adipiscing elit</Text>
                <Text fontSize="sm" color="gray.500">Qty: 2</Text>
              </ListItem>
            </List>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Order #456
            </Box>
            <Box flex="1" textAlign="center">
              02/02/2022
            </Box>
            <Box flex="1" textAlign="right">
              <Badge colorScheme="yellow">Shipped</Badge>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={3}>
              <Box flex="1">
                <Text fontWeight="bold">Order #456</Text>
                <Text fontSize="sm" color="gray.500">Placed on 02/02/2022</Text>
              </Box>
              <Box>
                <Badge colorScheme="yellow">Shipped</Badge>
              </Box>
            </Stack>
            <List mt={4}>
              <ListItem>
                <Text fontWeight="bold">Item #1</Text>
                <Text fontSize="sm" color="gray.500">Sed do eiusmod tempor incididunt</Text>
                <Text fontSize="sm" color="gray.500">Qty: 1</Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Item #2</Text>
                <Text fontSize="sm" color="gray.500">Ut labore et dolore magna aliqua</Text>
                <Text fontSize="sm" color="gray.500">Qty: 3</Text>
              </ListItem>
            </List>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Order #789
            </Box>
            <Box flex="1" textAlign="center">
              03/03/2022
            </Box>
            <Box flex="1" textAlign="right">
              <Badge colorScheme="gray">Cancelled</Badge>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={3}>
              <Box flex="1">
                <Text fontWeight="bold">Order #789</Text>
                <Text fontSize="sm" color="gray.500">Placed on 03/03/2022</Text>
              </Box>
              <Box>
                <Badge colorScheme="gray">Cancelled</Badge>
              </Box>
            </Stack>
            <List mt={4}>
              <ListItem>
                <Text fontWeight="bold">Item #1</Text>
                <Text fontSize="sm" color="gray.500">Duis aute irure dolor in reprehenderit</Text>
                <Text fontSize="sm" color="gray.500">Qty: 2</Text>
              </ListItem>
              <ListItem>
              <Text fontWeight="bold">Item #2</Text>
<Text fontSize="sm" color="gray.500">Excepteur sint occaecat cupidatat non proident</Text>
<Text fontSize="sm" color="gray.500">Qty: 1</Text>
</ListItem>
</List>
</AccordionPanel>
</AccordionItem>
</Accordion>
</Box>
</Box>
</Container>
);
};

export default ProfilePage;







