import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartActions } from "../Store/Store";
import { Link, useNavigate, redirect } from "react-router-dom";
import { Buffer } from "buffer";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Divider,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "../Components/Navbar";
import axios from "axios";

const country_currency_map = {
  AUD: "AU",
  SGD: "SG",
  PHP: "PH",
  THB: "TH",
  NZD: "NZ",
};

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [currency, setCurrency] = useState("AUD");
  const [loading, setLoading] = useState(false);

  const removeCartHandler = (product) => {
    dispatch(
      CartActions.removeFromCart({
        product,
      })
    );
  };

  const addCartHandler = (product) => {
    dispatch(
      CartActions.addToCart({
        product,
      })
    );
  };

  // const checkoutHandler = () => {
  //   dispatch(CartActions.checkoutCart());
  //   localStorage.removeItem("cart");
  //   window.alert("Checkout successful!");
  // };

  const checkoutHandler = async () => {
    const cart_new = [...cart];
    try {
      setLoading(true);
      let breakdown = {};
      cart_new.forEach((item) => {
        breakdown[item.title] = +(item.quantity * item.price).toFixed(2);
      });

      const checkout_object = {
        amount: +cart_new
          .reduce(
            (amount, product) => product.price * product.quantity + amount,
            0
          )
          ?.toFixed(2),
        amount_breakdown: breakdown,
        currency: currency,
        country: country_currency_map[currency],
        redirect_url: "finmo.net",
      };

      let basic_auth = `${process.env.REACT_APP_TOKEN}:${process.env.REACT_APP_SECRET}`;
      let buff = Buffer.from(basic_auth);
      let base64data = buff.toString("base64");
      let authentication = `Basic ${base64data}`;

      const response = await axios.post(
        `${process.env.REACT_APP_URL}`,
        checkout_object,
        {
          headers: {
            Authorization: authentication,
          },
        }
      );

      if (response.data) {
        navigate(`/checkout?token=${response.data.data.checkout_token}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        minWidth: "100%",
        flexDirection: "column",
        backgroundColor: "lightgray",
      }}
    >
      <Navbar showMenu={false} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 10,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {(!cart || cart.length <= 0) && (
          <Box width="100%">
            <Card
              sx={{
                display: "flex",
                alignItems: "center",

                justifyContent: "center",
                width: "100%",
                height: 100,
                my: 2,
              }}
            >
              <Typography>Cart is empty!</Typography>
            </Card>
          </Box>
        )}
        {cart && cart.length > 0 && (
          <>
            <Box width="100%">
              {cart.map((product) => (
                <Card
                  key={product.id}
                  sx={{
                    display: "flex",
                    width: "100%",
                    my: 2,
                  }}
                >
                  <Box
                    p={1}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    sx={{ bgColor: "lightgray" }}
                  >
                    <Link to={`/product/${product.id}`}>
                      <CardMedia
                        component="img"
                        sx={{
                          objectFit: "contain",
                          minWidth: 50,
                          maxWidth: 100,
                        }}
                        image={product.image}
                        alt="cart item image"
                      />
                    </Link>
                  </Box>

                  <Box
                    sx={{
                      p: 2,
                      width: "100%",
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "start", sm: "center" },
                      justifyContent: { xs: "center", sm: "space-between" },
                    }}
                  >
                    <Box m={1}>
                      <CardHeader
                        sx={{ height: "12%" }}
                        titleTypographyProps={{
                          fontWeight: 600,
                          fontSize: { xs: 12, sm: 14 },
                        }}
                        title={product.title}
                        subheaderTypographyProps={{ color: "text.primary" }}
                        subheader={`$ ${product.price}`}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        width: { xs: "100%", sm: "auto" },
                        flexDirection: "column",
                        alignItems: "end",
                        mt: { xs: -4, sm: 0 },
                      }}
                    >
                      <Typography noWrap component="div" mx={2}>
                        Total: $ {(product.price * product.quantity).toFixed(2)}
                      </Typography>
                      <Box>
                        <ButtonGroup
                          size="small"
                          aria-label="cart button group"
                        >
                          <Button
                            onClick={removeCartHandler.bind(this, product)}
                            sx={{
                              borderColor: "secondary.main",
                              color: "secondary.main",
                            }}
                          >
                            <RemoveIcon />
                          </Button>
                          <Button
                            sx={{
                              borderColor: "secondary.main",
                              color: "secondary.main",
                            }}
                          >
                            {product.quantity}
                          </Button>
                          <Button
                            onClick={addCartHandler.bind(this, product)}
                            sx={{
                              borderColor: "secondary.main",
                              color: "secondary.main",
                            }}
                          >
                            <AddIcon />
                          </Button>
                        </ButtonGroup>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>

            <Box m={{ xs: 0, md: 2 }} width={{ xs: "100%", md: "30%" }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", md: "column" },
                  justifyContent: { xs: "space-between" },
                }}
              >
                <Box>
                  <CardHeader
                    titleTypographyProps={{
                      fontWeight: 600,
                      fontSize: { xs: 12, sm: 14 },
                    }}
                    title={`Total Amount : $ ${cart
                      .reduce(
                        (amount, product) =>
                          product.price * product.quantity + amount,
                        0
                      )
                      .toFixed(2)}`}
                  />
                  <CardHeader
                    titleTypographyProps={{
                      fontWeight: 600,
                      fontSize: { xs: 12, sm: 14 },
                    }}
                    title={`Total Items : ${cart.reduce(
                      (items, product) => product.quantity + items,
                      0
                    )}`}
                  />
                  <Box p={2}>
                    <TextField
                      fullWidth
                      select
                      value={currency}
                      label="Currency"
                      placeholder="Currency"
                      onChange={(e) => setCurrency(e.target.value)}
                      InputLabelProps={{ sx: { color: "black" } }}
                    >
                      <MenuItem value="AUD">AUD</MenuItem>
                      <MenuItem value="PHP">PHP</MenuItem>
                      <MenuItem value="THB">THB</MenuItem>
                      <MenuItem value="NZD">NZD</MenuItem>
                    </TextField>
                  </Box>
                  <Divider />
                </Box>
                <CardActions sx={{ alignSelf: "end" }}>
                  <Button
                    disabled={loading}
                    onClick={checkoutHandler}
                    variant="contained"
                    endIcon={<ShoppingCartCheckoutIcon />}
                    startIcon={loading && <CircularProgress size={"2rem"} />}
                  >
                    Checkout
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Cart;

<div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>;
