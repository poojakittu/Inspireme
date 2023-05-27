import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import "./FirstSec.css";
import { Link } from "react-router-dom";

const FirstSec = () => {
  return (
    <Box mt={"100px"} fontWeight={"700"}>
      <Heading size={"xl"}>Explore Products By Categories</Heading>

      <Heading id="head4" fontWeight={"700"}>
        Terms & Conditions
      </Heading>
      <Heading id="head5">
        The Government Purchase Program ("Program") is a benefit provided by
        Apple Inc. (“Apple”) to current and retired employees and contractors of
        government entities. The Program is also offered to their immediate
        family members who also reside in their same household. The Program is
        intended for personal use only and can ’t be used for agency purchases.
      </Heading>

      <Heading id="head6">
        By submitting your order, you certify that you have read and understand
        the terms and conditions of the Government Purchase Program and confirm
        that you are an eligible person, of at least 18 years of age, to
        participate in this Program as described above.
      </Heading>

      <Heading id="head6">
        Under this Program, Apple sells and ships products to end user customers
        only. You may not purchase for resale. Apple reserves the right to
        refuse or cancel your order if Apple suspects you are purchasing for
        resale.
      </Heading>

      <Heading id="head6">
        Apple Card Monthly Installments (ACMI) is not available as a payment
        type with the discounted pricing available through this special store.
        ACMI is available for certain eligible full price Apple products when
        you shop on apple.com, the Apple Store app, or at an Apple store, and
        select Apple Card Monthly Installments as your payment option.
      </Heading>

      <Heading id="head6">Return Policy</Heading>
      <Heading id="head5">
        Please note that returns must be initiated within 14 days from the time
        you receive the product. Apple does not permit the return of certain
        products.
      </Heading>
      <Heading id="head5">
        Please refer to the Apple Sales and Refund Policy for more information
      </Heading>

      <Heading id="head6">Before You Start</Heading>
      <Heading id="head5">
        Please make sure your browser is set to accept cookies, otherwise you
        won ’t be able to visit your Apple Government Store.
      </Heading>

      <Heading id="head6">Agreement</Heading>
      <Heading id="head5">
        I agree and certify that I am of at least 18 years of age and a current
        or retired employee, contractor or family member of a government entity
        and that I accept the above terms and conditions.
      </Heading>

      <Link to="/login">
        <Button id="btn1"><Link to="/login">I Accept</Link></Button>
      </Link>
      
    </Box>
  );
};

export default FirstSec;
