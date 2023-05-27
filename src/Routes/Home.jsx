import React from "react";
import FirstSec from "../Components/FirstSec";
import First from "../Components/First";
import { Box } from "@chakra-ui/react";
import WeeklyDeal from "../Components/weeklyDeal";

const Home = () => {
  return (
    <div style={{ marginTop: "130px" }}>
      <First />

      <FirstSec></FirstSec>
      <Box width="90%" margin={"auto"} pt={"60px"}>
      </Box>
      <WeeklyDeal/>
    </div>
  );
};

export default Home;
