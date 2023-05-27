import { useState } from 'react';
import { Button, FormControl, FormLabel, Radio, RadioGroup, Stack, Input } from '@chakra-ui/react';

function Checkout() {
  const [address, setAddress] = useState('');
  const [orderDetails, setOrderDetails] = useState({});
  const [paymentOption, setPaymentOption] = useState('');

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  }

  const handleOrderDetailsChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  }

  const handlePaymentOptionChange = (e) => {
    setPaymentOption(e.target.value);
  }

  const handlePlaceOrder = () => {
    // Send the order data to the order API
    console.log('Order placed successfully!');
  }

  const handlePayWithRazorpay = () => {
    // Redirect to the Razorpay payment gateway
    console.log('Redirecting to Razorpay...');
  }

  return (
    <form>
      <FormControl id="address">
        <FormLabel>Address</FormLabel>
        <Input type="text" value={address} onChange={handleAddressChange} />
      </FormControl>
      <FormControl id="order-details">
        <FormLabel>Order Details</FormLabel>
        <Input type="text" name="product1" value={orderDetails.product1} onChange={handleOrderDetailsChange} />
        <Input type="text" name="product2" value={orderDetails.product2} onChange={handleOrderDetailsChange} />
        <Input type="text" name="product3" value={orderDetails.product3} onChange={handleOrderDetailsChange} />
      </FormControl>
      <FormControl id="payment-option">
        <FormLabel>Payment Option</FormLabel>
        <RadioGroup value={paymentOption} onChange={handlePaymentOptionChange}>
          <Stack direction="column">
            <Radio value="cash-on-delivery">Cash on Delivery</Radio>
            <Radio value="debit-credit-card">Debit/Credit Card</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      {paymentOption === 'cash-on-delivery' ?
        <Button onClick={handlePlaceOrder}>Place Order</Button>
        :
        <Button onClick={handlePayWithRazorpay}>Pay with Razorpay</Button>
      }
    </form>
  );
}

export default Checkout;
