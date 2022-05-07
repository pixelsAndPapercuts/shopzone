import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ProductsActions } from "../Store/Store";
import { Box, Grid, CircularProgress } from "@mui/material";
import Product from "../Components/Product";

import instance from "../axios";

const Content = () => {
  const dispatch = useDispatch();
  const { isFetching, products, filteredProducts } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(ProductsActions.getAllProductsStart());
        const res = await instance.get("products");
        dispatch(
          ProductsActions.getAllProductsSuccess({
            products: res.data,
          })
        );
      } catch (err) {
        dispatch(ProductsActions.getAllProductsFailure());
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isFetching && <CircularProgress sx={{ color: "secondary.main" }} />}
      {!isFetching && (
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
        >
          {(filteredProducts ? filteredProducts : products).map(
            (product, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Product loading={isFetching} product={product} />
              </Grid>
            )
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Content;
