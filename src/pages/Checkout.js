import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Checkout = (props) => {
  const { cart } = useSelector((state) => state.cart);
  const params = new URLSearchParams(useLocation().search);
  const token = params.get("token");

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
      <Navbar z={0} showMenu={false} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 10,
          display: "flex",
        }}
      >
        {cart && cart.length > 0 && (
          <>
            <Box
              m={{ xs: 0, md: 2 }}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card sx={{ width: "50%", p: 4 }}>
                <CardHeader
                  title={<Typography variant="subtitle">Checkout</Typography>}
                />
                <Divider />
                <CardContent>
                  <Grid
                    sx={{
                      border: "1px solid #32445c",
                      p: 2,
                      borderRadius: "4px",
                    }}
                    container
                    direction={"column"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                  >
                    <Grid item xs={2}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            textAlign={"start"}
                            sx={{
                              mr: 1,
                              color: "#32445c",
                            }}
                          >
                            Total :
                          </Typography>
                        </Box>
                        <Typography
                          textAlign={"start"}
                          sx={{
                            fontSize: 20,
                            color: `#32445c`,
                          }}
                        >
                          {cart
                            .reduce(
                              (amount, product) =>
                                product.price * product.quantity + amount,
                              0
                            )
                            .toFixed(2)}
                        </Typography>
                      </Box>
                    </Grid>
                    <Divider sx={{ mt: 1, bgcolor: "white" }} />
                    <Grid item xs={10} sx={{ p: 1, mt: 1 }}>
                      <table
                        style={{
                          width: "100%",
                          color: `#32445c`,
                        }}
                      >
                        <tbody style={{ fontSize: "small" }}>
                          {cart.map((item) => {
                            return (
                              <tr>
                                <td style={{ textAlign: "start" }}>
                                  {item.title}
                                </td>
                                <td style={{ textAlign: "right" }}>
                                  {item.price * item.quantity < 0 ? (
                                    <div style={{ color: "#FFA700" }}>
                                      {item.price * item.quantity}{" "}
                                      {/* {currency_code_to_symbol[data.currency]} */}
                                    </div>
                                  ) : (
                                    `${item.price * item.quantity} 
                          `
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                          <tr>
                            <td colSpan={2}>
                              <hr
                                style={{
                                  marginBottom: "10px",
                                  border: "1.5px solid #32445c",
                                  backgroundColor: "white",
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ textAlign: "start" }}>Total Due</td>
                            <td style={{ textAlign: "right" }}>
                              {cart.length > 0 &&
                                `${cart
                                  .reduce(
                                    (amount, product) =>
                                      product.price * product.quantity + amount,
                                    0
                                  )
                                  .toFixed(2)}`}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions
                  sx={{ width: "100%", justifyContent: "center", mt: 2 }}
                >
                  <Button
                    onClick={() => window.initiatePayment(token)}
                    variant="contained"
                  >
                    Pay with Finmo
                  </Button>
                  {/* 
                  <Link
                    href={`http://localhost:3002/embedded?token=${token}`}
                    rel="no_opener"
                    target="_blank"
                  >
                    Pay with Finmo
                  </Link> */}
                </CardActions>
              </Card>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Checkout;
