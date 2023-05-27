import {
  Checkbox,
  Heading,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Grid,
  Skeleton,
} from "@chakra-ui/react";
import { Box, Button, Flex, Image, Text, useToast } from "@chakra-ui/react";
import { FaMinus, FaPlus } from "react-icons/fa";
import "../style/product.css";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const Filters = () => {
  const [packedPriceRange, setpackedPriceRange] = useState([0, 10000]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMinimized2, setIsMinimized2] = useState(false);
  const [isMinimized3, setIsMinimized3] = useState(false);
  const [isMinimized4, setIsMinimized4] = useState(false);
  const handleMinimizeClick = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMinimizeClick2 = () => {
    setIsMinimized2(!isMinimized2);
  };

  const handleMinimizeClick3 = () => {
    setIsMinimized3(!isMinimized3);
  };

  const handleMinimizeClick4 = () => {
    setIsMinimized4(!isMinimized4);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");

  const [series, setseries] = useState(searchParams.getAll("series") || []);
  const [packedPrice, setpackedPrice] = useState(searchParams.getAll("packedPrice") || []);
  const [colour, setColour] = useState(searchParams.getAll("colour") || []);
  const [size, setSize] = useState(searchParams.getAll("size") || []);
  const handleFilter = (e) => {
    const option = e.target.value;
    let newseries = [...series];
    if (newseries.includes(option)) {
      newseries.splice(newseries.indexOf(option), 1);
    } else {
      newseries.push(option);
    }

    setseries(newseries);
  };

  const handleColour = (e) => {
    const option = e.target.value;
    let newcolour = [...colour];
    if (newcolour.includes(option)) {
      newcolour.splice(newcolour.indexOf(option), 1);
    } else {
      newcolour.push(option);
    }

    setColour(newcolour);
  };

  const handleSize = (e) => {
    const option = e.target.value;
    let newsize = [...size];
    if (newsize.includes(option)) {
      newsize.splice(newsize.indexOf(option), 1);
    } else {
      newsize.push(option);
    }

    setSize(newsize);
  };

  const handlepackedPriceRangeChange = (value) => {
    setpackedPriceRange(value);
    const option2 = value;
    let newpackedPrice = [...packedPrice];
    if (newpackedPrice.includes(option2)) {
      newpackedPrice.splice(newpackedPrice.indexOf(option2), 1);
    } else {
      newpackedPrice.push(option2);
    }

    setpackedPrice(newpackedPrice);
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    const params = {};
    series && (params.series = series);
    packedPrice && (params.packedPrice = packedPrice);
    colour && (params.colour = colour);
    size && (params.size = size);
    setSearchParams(params);
  }, [series, packedPrice, colour, size, setSearchParams]);
  return (
    <div>
      <div className="filters">
        <div className="filter1">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Heading
              as="h3"
              fontFamily="Montserrat"
              fontSize="16px"
              fontWeight="600"
              mr={2}
            >
              Filter
            </Heading>
            <IconButton
              aria-label="Minimize"
              icon={isMinimized ? <FaPlus /> : <FaMinus />}
              size="sm"
              variant="ghost"
              onClick={handleMinimizeClick}
            />
          </Box>
          {!isMinimized && (
            <>
              <Checkbox
                value="tops"
                defaultChecked={series.includes("tops")}
                onChange={handleFilter}
                mb={2}
              >
                Tops
              </Checkbox>
              <Checkbox
                value="heels"
                defaultChecked={series.includes("heels")}
                onChange={handleFilter}
                mb={2}
              >
                Heels
              </Checkbox>
              <Checkbox
                value="jeans"
                defaultChecked={series.includes("jeans")}
                onChange={handleFilter}
                mb={2}
              >
                Jeans
              </Checkbox>
              <Checkbox
                value="shorts"
                defaultChecked={series.includes("shorts")}
                onChange={handleFilter}
                mb={2}
              >
                Shorts
              </Checkbox>
              <Checkbox
                value="saree"
                defaultChecked={series.includes("saree")}
                onChange={handleFilter}
                mb={2}
              >
                Saree
              </Checkbox>
              <Checkbox
                value="lingerie"
                defaultChecked={series.includes("lingerie")}
                onChange={handleFilter}
                mb={2}
              >
                Lingerie
              </Checkbox>
              <Checkbox
                value="heels"
                defaultChecked={series.includes("Heels")}
                onChange={handleFilter}
                mb={2}
              >
                Heels
              </Checkbox>
            </>
          )}
        </div>
        <div className="filter1">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Heading
              as="h3"
              fontFamily="Montserrat"
              fontSize="16px"
              fontWeight="600"
              mr={2}
            >
              Price
            </Heading>
            <IconButton
              aria-label="Minimize"
              icon={isMinimized2 ? <FaPlus /> : <FaMinus />}
              size="sm"
              variant="ghost"
              onClick={handleMinimizeClick2}
            />
          </Box>
          {!isMinimized2 && (
            <>
              <Slider
                min={0}
                max={10000}
                defaultValue={[0, 10000]}
                value={packedPriceRange}
                onChange={handlepackedPriceRangeChange}
              >
                <SliderTrack bg="gray.200">
                  <SliderFilledTrack bg="gray.200" />
                </SliderTrack>
                <SliderThumb />
              </Slider>

              <Text textAlign="left" mt={2}>
              Price : ${packedPriceRange}
              </Text>
            </>
          )}
        </div>
        <div className="filter1">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Heading
              as="h3"
              fontFamily="Montserrat"
              fontSize="16px"
              fontWeight="600"
              mr={2}
            >
              Colour
            </Heading>
            <IconButton
              aria-label="Minimize"
              icon={isMinimized3 ? <FaPlus /> : <FaMinus />}
              size="sm"
              variant="ghost"
              onClick={handleMinimizeClick3}
            />
          </Box>
          {!isMinimized3 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: "5px",
              }}
            >
              <Checkbox
                value="blue"
                defaultChecked={series.includes("blue")}
                onChange={handleColour}
                mb={2}
              >
                <Box bg="blue" w="20px" h="20px"></Box>
              </Checkbox>
              <Checkbox
                value="yellow"
                defaultChecked={series.includes("yellow")}
                onChange={handleColour}
                mb={2}
              >
                <Box bg="yellow" w="20px" h="20px"></Box>
              </Checkbox>
              <Checkbox
                value="red"
                defaultChecked={series.includes("red")}
                onChange={handleColour}
                mb={2}
              >
                <Box bg="red" w="20px" h="20px"></Box>
              </Checkbox>
              <Checkbox
                value="green"
                defaultChecked={series.includes("green")}
                onChange={handleColour}
                mb={2}
              >
                <Box bg="green" w="20px" h="20px"></Box>
              </Checkbox>
              <Checkbox
                value="pink"
                defaultChecked={series.includes("pink")}
                onChange={handleColour}
                mb={2}
              >
                <Box bg="pink" w="20px" h="20px"></Box>
              </Checkbox>
              <Checkbox
                value="purple"
                defaultChecked={series.includes("purple")}
                onChange={handleColour}
                mb={2}
              >
                <Box bg="purple" w="20px" h="20px"></Box>
              </Checkbox>
              <Checkbox
                value="teal"
                defaultChecked={series.includes("teal")}
                onChange={handleColour}
                mb={2}
              >
                <Box bg="teal" w="20px" h="20px"></Box>
              </Checkbox>
              <Checkbox
                value="grey"
                defaultChecked={series.includes("grey")}
                onChange={handleColour}
                mb={2}
              >
                <Box bg="grey" w="20px" h="20px"></Box>
              </Checkbox>
            </div>
          )}
        </div>
        <div className="filter1">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Heading
              as="h3"
              fontFamily="Montserrat"
              fontSize="16px"
              fontWeight="600"
              mr={2}
            >
              Size
            </Heading>
            <IconButton
              aria-label="Minimize"
              icon={isMinimized4 ? <FaPlus /> : <FaMinus />}
              size="sm"
              variant="ghost"
              onClick={handleMinimizeClick4}
            />
          </Box>
          {!isMinimized4 && (
            <Grid templateColumns="repeat(3, 1fr)">
              <Checkbox
                value="s"
                defaultChecked={series.includes("s")}
                onChange={handleSize}
                mb={2}
              >
                s
              </Checkbox>
              <Checkbox
                value="m"
                defaultChecked={series.includes("m")}
                onChange={handleSize}
                mb={2}
              >
                m
              </Checkbox>
              <Checkbox
                value="l"
                defaultChecked={series.includes("l")}
                onChange={handleSize}
                mb={2}
              >
                l
              </Checkbox>
              <Checkbox
                value="xl"
                defaultChecked={series.includes("xl")}
                onChange={handleSize}
                mb={2}
              >
                xl
              </Checkbox>
              <Checkbox
                value="xxl"
                defaultChecked={series.includes("xxl")}
                onChange={handleSize}
                mb={2}
              >
                xxl
              </Checkbox>
              <Checkbox
                value="xxxl"
                defaultChecked={series.includes("xxxl")}
                onChange={handleSize}
                mb={2}
              >
                xxxl
              </Checkbox>
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
