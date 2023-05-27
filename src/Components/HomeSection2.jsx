import React, { useState } from 'react'
import {
  Button, 
  Grid, 
  GridItem, 
  Heading, 
  HStack, 
  Flex, 
  Input, 
  Select, 
  Textarea, 
  FormControl
} from '@chakra-ui/react'
import emailjs from 'emailjs-com';

const HomeSection2 = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    category: '',
    size: '',
    comment: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = 'http://localhost:5000/contact/add';
    const { name, email, phone, product, category, size, comment } = formData;

    const data = {
      name,
      Email: email,
      phone,
      product,
      category,
      size,
      comment
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log('Data posted successfully!');
    })
    .catch(error => {
      console.error('Error while posting data:', error);
    });

    const serviceId = 'your-service-id'; // replace with the actual service ID
    const templateId = 'your-template-id'; // replace with the actual template ID
    const userId = 'your-user-id'; // replace with the actual user ID

    const emailData = {
      to_name: 'Recipient Name',
      from_name: 'Your Name',
      message_html: `Name: ${name}<br>Email: ${email}<br>Phone: ${phone}<br>Product: ${product}<br>Category: ${category}<br>Size: ${size}<br>Comment: ${comment}`
    };

    emailjs.send(serviceId, templateId, emailData, userId)
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.error(error.text);
      });
  };

  return (
    <>
      <Flex w="98%" color={"darkgrey"} borderRadius="10px"
       gap={"2%"} m="auto" mt="7%" 
       flexDirection={["column","column","column","row"]}> 
       <iframe width="100%" height={["350.32px","400.32px","444.32px","516.32px"]} borderr-radius="10px"
       src="https://www.youtube.com/embed/mReZr_e70OA" 
       title="YouTube video player" frameBorder="0" 
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
       allowFullScreen></iframe>
       
       <FormControl onSubmit={handleSubmit}>
        <Heading color={"#225886"} fontSize={"25px"} 
        mt={["2%","2%","2px","0px"]}
        fontWeight={"800"} textTransform="uppercase">
Contact Us
</Heading>
<Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6} mt="2%">
<GridItem>
<Input type="text" placeholder="Your Name" name="name" value={formData.name} onChange={handleInputChange} required />
</GridItem>
<GridItem>
<Input type="email" placeholder="Your Email" name="email" value={formData.email} onChange={handleInputChange} required />
</GridItem>
<GridItem>
<Input type="tel" placeholder="Your Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} required />
</GridItem>
<GridItem>
<Input type="text" placeholder="Product" name="product" value={formData.product} onChange={handleInputChange} required />
{/* <Select placeholder="Product" name="product" value={formData.product} onChange={handleInputChange} required>
<option value="Product A">Product A</option>
<option value="Product B">Product B</option>
<option value="Product C">Product C</option>
</Select> */}
</GridItem>
<GridItem>
<Select placeholder="Sub-Category" name="category" value={formData.category} onChange={handleInputChange} required>
<option value="Category A">MEN</option>
<option value="Category B">WOMEN</option>
<option value="Category C">BRAND</option>
<option value="Category A">LEATHER</option>
<option value="Category B">FOOTWEAR</option>
<option value="Category C">HOME DECOR</option>
<option value="Category A">FRESH STOCKS</option>

</Select>
</GridItem>
<GridItem>
<Select placeholder="Size" name="size" value={formData.size} onChange={handleInputChange} required>
<option value="Category A">S</option>
<option value="Category B">L</option>
<option value="Category C">M</option>
<option value="Category A">XL</option>
<option value="Category B">XXL</option>
<option value="Category C">XXXL</option>
<option value="Category A">ALL SIZES</option>
</Select>
</GridItem>
</Grid>
<GridItem>
<Textarea mt="20px" placeholder="Comments" name="comment" value={formData.comment} onChange={handleInputChange} required />
</GridItem>
<GridItem>
<Button mt="20px" type="submit" colorScheme="teal" variant="solid" size="lg">
Submit
</Button>
</GridItem>
</FormControl>
</Flex>
</>
);
};

export default HomeSection2;