import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions, CartActions } from "../Store/Store";
import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import {
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Box,
  Menu,
} from "@mui/material";
import logo from "../assets/shopzone.svg";

const Navbar = ({ handleDrawerToggle, showMenu, z }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(AuthActions.logout());
    dispatch(CartActions.checkoutCart());
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      position="fixed"
      sx={{
        minHeight: "10%",
        width: "100vw",
        // zIndex: { sm: 1201 },

        backgroundColor: "secondary.main",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Toolbar sx={{ width: "100%" }}>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            color: "#ffffff",
            mr: 2,
            display: { xs: !showMenu && "none", sm: "none" },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography component="div" color="text.secondary" flexGrow={1}>
          <Link
            style={{
              color: "white",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
            to="/"
          >
            <Box sx={{ width: "80px", height: "80px" }} ml={-3}>
              <Box
                component="img"
                sx={{ objectFit: "cover", width: "100%", height: "100%" }}
                src={logo}
              />
            </Box>
            <Typography fontSize={20} display={{ xs: "none", sm: "block" }}>
              ShopZone
            </Typography>
          </Link>
        </Typography>

        <Link
          style={{
            color: "white",
            marginTop: "10px",
            textDecoration: "none",
            position: "relative",
          }}
          to="/cart"
        >
          <ShoppingCartIcon sx={{ mr: 2 }} />
          {cart && cart.length > 0 && (
            <Box
              component="div"
              sx={{
                position: "absolute",
                top: -12,
                right: 8,
                aspectRatio: "2/1",
                backgroundColor: "red",
                width: "50%",
                height: "80%",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                borderRadius: "50%",
              }}
            >
              {
                <Typography>
                  {cart.reduce((items, product) => product.quantity + items, 0)}
                </Typography>
              }
            </Box>
          )}
        </Link>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
              {isLoggedIn.name[0].toUpperCase()}
            </Avatar>
            <ArrowDropDownIcon sx={{ color: "text.secondary" }} />
          </IconButton> */}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={logoutHandler}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Navbar;
