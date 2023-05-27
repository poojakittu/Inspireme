import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
  } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
  import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
  import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
  
  
  
 
  
  function Rating({rating, numReviews}) {



    return (
      <Flex alignItems="center">
        {Array(5)
          .fill('')
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: '1' }}
                  color={i < rating ? 'teal.500' : 'gray.300'}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
            }
            return <BsStar key={i} style={{ marginLeft: '1' }} />;
          })}
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {numReviews} review{numReviews > 1 && 's'}
        </Box>
      </Flex>
    );
  }
  
  function VendorBox({ title, image, id,numReviews,rating }) {
   

   
    return (
      <Flex  w="full" alignItems="center" justifyContent="center">
        <Link to={`/vendorproduct/${id}`}>
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative">
         
            <Circle
              size="10px"
              position="absolute"
              top={2}
              right={2}
              bg="red.200"
            />
         
  
          <Image
            src={image}
            alt={title}
            roundedTop="lg"
          />
  
          <Box p="6">
           
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated>
                {title}
              </Box>
              {/* <Tooltip
                label="Add to cart"
                bg="white"
                placement={'top'}
                color={'gray.800'}
                fontSize={'1.2em'}>
                <chakra.a href={'#'} display={'flex'}>
                  <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                </chakra.a>
              </Tooltip> */}
            </Flex>
  
            <Flex justifyContent="space-between" alignContent="center">
              <Rating rating={rating}  numReviews={numReviews} />
              {/* <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}> */}
                {/* <Box as="span" color={'gray.600'} fontSize="lg">
                  £
                </Box>
                {data.price.toFixed(2)}
              </Box> */}
            </Flex>
          </Box>
        </Box>
        </Link>
      </Flex>
    );
  }
  
  export default VendorBox;