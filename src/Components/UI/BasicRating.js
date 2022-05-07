import React from "react";

import { Typography, Rating } from "@mui/material";
import { Box } from "@mui/system";

const BasicRating = ({ value, count }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating size="small" name="read-only" value={value} readOnly />
      <Typography fontSize={12} component="legend">
        ({count})
      </Typography>
    </Box>
  );
};

export default BasicRating;
