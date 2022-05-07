import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";
import { Formik, Form } from "formik";

import TextField from "../Components/UI/TextField";
import { AuthActions } from "../Store/Store";

import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import logo from "../assets/logo.png";

import styles from "./Signup.module.css";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isFetching } = useSelector((state) => state.auth);

  const validate = Yup.object({
    name: Yup.string().required("Required"),
    password: Yup.string().required("Password is required"),
  });

  const loginHandler = (values) => {
    try {
      dispatch(AuthActions.loginStart());
      dispatch(
        AuthActions.loginSuccess({
          user: values,
        })
      );
      navigate("/");
    } catch (err) {
      dispatch(AuthActions.loginFailure());
    }
  };

  return (
    <Container
      className={styles.background}
      maxWidth="false"
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <Grid
        mt={{ xs: 0, sm: -6 }}
        container
        justifyContent="center"
        height={{ xs: "100vh", sm: "80vh" }}
      >
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <Grid
            sx={{
              backgroundColor: "primary.main",
              width: { xs: "100vw", sm: "40vw", md: "35vw" },
              height: "100%",
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              boxShadow: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            item
          >
            <Box component="img" width="100%" src={logo}></Box>
          </Grid>
        </Box>
        <Box>
          <Grid
            sx={{
              backgroundColor: "secondary.main",
              width: { xs: "100vw", sm: "45vw", md: "35vw" },
              height: "100%",
              color: "white",
              borderTopRightRadius: { xs: 0, sm: 10 },
              borderBottomRightRadius: { xs: 0, sm: 10 },
              boxShadow: 10,
            }}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            py={6}
            px={{ xs: 6, sm: 4, md: 8, lg: 10 }}
            item
          >
            <Box width="100%">
              <Formik
                initialValues={{
                  name: "",
                  password: "",
                }}
                validationSchema={validate}
                onSubmit={(values) => loginHandler(values)}
              >
                {(formik) => (
                  <>
                    <Form>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                      >
                        <Box>
                          <Typography color="text.secondary" fontSize={20}>
                            Welcome to ShopZone
                          </Typography>
                          <Typography color="text.secondary" fontSize={12}>
                            Login or Register to access.
                          </Typography>
                        </Box>
                        <Box my={16}>
                          <TextField
                            placeholder="John Doe"
                            label="Name"
                            name="name"
                            type="text"
                          />
                          <TextField
                            label="Password"
                            name="password"
                            type="password"
                          />
                        </Box>
                        <Box>
                          <Button
                            endIcon={
                              isFetching && (
                                <CircularProgress color="secondary" size={20} />
                              )
                            }
                            type="submit"
                            variant="contained"
                          >
                            Sign In
                          </Button>
                          <Box display="flex" alignItems="baseline">
                            <Typography fontWeight={1} fontSize={12} mt={2}>
                              Don't have an account?
                            </Typography>

                            <Link to="/signup">
                              <Typography
                                sx={{
                                  textDecoration: "underline",
                                }}
                                ml={2}
                                color="text.secondary"
                                alignItems="center"
                              >
                                Sign Up
                              </Typography>
                            </Link>
                          </Box>
                        </Box>
                      </Box>
                    </Form>
                  </>
                )}
              </Formik>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
};

export default SignIn;
