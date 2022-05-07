import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CartActions } from "../Store/Store";

import Navbar from "../Components/Navbar";
import BasicRating from "../Components/UI/BasicRating";
import CircularProgress from "@mui/material/CircularProgress";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  CardMedia,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  CardHeader,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import instance from "../axios";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const params = useParams().id;
  const [product, setProduct] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsFetching(true);
        const res = await instance.get(`products/${params}`);
        setProduct(res.data);
        setIsFetching(false);
      } catch (err) {
        setIsFetching(false);
        window.alert("Something went wrong. Please try again");
      }
    };
    fetchProduct();
  }, []);

  const addToCartHandler = (product) => {
    dispatch(
      CartActions.addToCart({
        product,
      })
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isFetching && <CircularProgress sx={{ color: "secondary.main" }} />}
        {!isFetching && product && (
          <Card
            sx={{
              display: "flex",
              minHeight: "80%",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box p={2}>
              <CardMedia
                component="img"
                sx={{
                  maxHeight: { xs: 600, sm: 400, md: 800 },
                  objectFit: "contain",
                }}
                image={product.image}
                alt="Product Image"
              />
            </Box>

            <Divider />

            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
                width: "100%",
                py: { sm: 2 },
              }}
            >
              <Box>
                <CardHeader
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                  avatar={
                    <Avatar
                      sx={{ bgcolor: "primary.main" }}
                      aria-label="recipe"
                    >
                      {product.category[0].toUpperCase()}
                    </Avatar>
                  }
                  titleTypographyProps={{ fontSize: 15, fontWeight: 500 }}
                  title={product.title}
                />
                <CardContent>
                  <Typography textAlign={"justify"} component="div">
                    {product.description}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      width: "fit-content",
                      p: 2,
                      pl: 0,
                    }}
                  ></Box>
                </CardContent>
              </Box>
              <CardActions
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  mb: 5,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: { xs: "space-between", sm: "start" },
                  }}
                  mb={5}
                  mr={5}
                >
                  <Box display="flex" mr={5}>
                    <MonetizationOnIcon />
                    <Typography ml={1}>{product?.price}</Typography>
                  </Box>
                  <BasicRating
                    value={product.rating.rate}
                    count={product.rating.count}
                  />
                </Box>
                <Button
                  onClick={addToCartHandler.bind(this, product)}
                  width="fit-content"
                  endIcon={<AddShoppingCartIcon />}
                  variant="contained"
                >
                  Add to cart
                </Button>
              </CardActions>
            </Box>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetail;
