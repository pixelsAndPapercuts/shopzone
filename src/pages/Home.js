import React, { useState } from "react";

import Navbar from "../Components/Navbar";
import BasicDrawer from "../Components/Drawer";
import Content from "../Components/Content";

import { Box } from "@mui/material";

const drawerWidth = 240;

function Home({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "lightgray",
      }}
    >
      <Navbar showMenu={true} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <BasicDrawer
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
        />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 10,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Content />
      </Box>
    </Box>
  );
}

export default Home;
