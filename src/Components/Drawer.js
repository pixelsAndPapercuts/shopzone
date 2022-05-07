import React from "react";

import {
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Toolbar,
} from "@mui/material";

import { ProductsActions } from "../Store/Store";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Filter = ({ children, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = async (e) => {
    let filter = e.target.value;
    dispatch(
      ProductsActions.filterProducts({
        filter,
      })
    );
    handleDrawerToggle();
    navigate("/");
  };

  return (
    <>
      <Divider />

      <FormControl sx={{ width: "100%", p: 2 }}>
        <FormLabel
          sx={{
            color: "text.primary",
            width: "100%",
            mb: 4,
            "&.Mui-focused": {
              color: "secondary.main",
            },
          }}
          id="category"
        >
          Filter By Category :
        </FormLabel>
        <RadioGroup
          sx={{ color: "text.primary" }}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={changeHandler}
        >
          <FormControlLabel
            value="all"
            control={<Radio size="small" sx={{ color: "inherit" }} />}
            label="Show all products"
          />
          <FormControlLabel
            value="electronics"
            control={<Radio size="small" sx={{ color: "inherit" }} />}
            label="Electronics"
          />
          <FormControlLabel
            value="jewelery"
            control={<Radio size="small" sx={{ color: "inherit" }} />}
            label="Jewellery"
          />
          <FormControlLabel
            value="men's clothing"
            control={<Radio size="small" sx={{ color: "inherit" }} />}
            label="Men's clothing"
          />
          <FormControlLabel
            value="women's clothing"
            control={<Radio size="small" sx={{ color: "inherit" }} />}
            label="Women's clothing"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

const BasicDrawer = (props) => {
  const drawer = (
    <div>
      <Toolbar />
      {<Filter handleDrawerToggle={props.handleDrawerToggle} />}
      <Divider />
    </div>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "lightgray",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default BasicDrawer;
