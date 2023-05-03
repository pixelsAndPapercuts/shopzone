import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CartActions } from "../Store/Store";

import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Avatar,
  IconButton,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import BasicRating from "../Components/UI/BasicRating";
import { Box } from "@mui/system";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [raised, setRaised] = useState(false);

  const addToCartHandler = (product) => {
    dispatch(
      CartActions.addToCart({
        product,
      })
    );
  };

  return (
    <Card
      onMouseEnter={() => setRaised(true)}
      onMouseLeave={() => setRaised(false)}
      raised={raised}
      sx={{
        maxWidth: 400,
        height: "100%",
        pt: 1,
        diplay: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardHeader
        sx={{ height: "12%", mb: 2, mt: 1, pl: 1 }}
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }} aria-label="recipe">
            {product.category[0].toUpperCase()}
          </Avatar>
        }
        titleTypographyProps={{ fontSize: { xs: 10, md: 12 } }}
        title={product.title}
      />
      <Link style={{ textDecoration: "none" }} to={`/product/${product.id}`}>
        <Box component="div" px={2}>
          <CardMedia
            component="img"
            image={product.image}
            alt="Item"
            sx={{
              height: { xs: 200, sm: 240 },
              objectFit: "contain",
            }}
          />
        </Box>
      </Link>
      <CardActions
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Box>
          <IconButton
            onClick={addToCartHandler.bind(this, product)}
            aria-label="add to cart"
          >
            <AddShoppingCartIcon />
          </IconButton>
          ${product.price}
        </Box>
        <BasicRating count={product.rating.count} value={product.rating.rate} />
      </CardActions>
    </Card>
  );
};

export default Product;
