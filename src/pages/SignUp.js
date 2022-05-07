import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik, Form } from "formik";

import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  CircularProgress,
  Tooltip,
} from "@mui/material";

import TextField from "../Components/UI/TextField";
import { AuthActions } from "../Store/Store";

import logo from "../assets/logo.png";
import styles from "./Signup.module.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.auth);

  const validate = Yup.object({
    firstname: Yup.string()
      .min(2, "Must be at least 2 characters")
      .required("Required"),
    lastname: Yup.string()
      .min(2, "Must be at least 2 characters")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Must Contain minimum 8 and maximum 16 characters, One Uppercase, One Lowercase, One Number and One Special Character"
      ),
  });

  const signupHandler = (values) => {
    localStorage.removeItem("isLoggedIn");
    try {
      dispatch(AuthActions.signupStart());
      dispatch(
        AuthActions.signupSuccess({
          user: values,
        })
      );
    } catch (err) {
      dispatch(AuthActions.signupFailure());
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
        minHeight="80vh"
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
                  firstname: "",
                  lastname: "",
                  email: "",
                  password: "",
                }}
                validationSchema={validate}
                onSubmit={(values) => signupHandler(values)}
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
                        <Box mb={8} mt={2}>
                          <TextField
                            placeholder="John"
                            label="First Name"
                            name="firstname"
                            type="text"
                          />
                          <TextField
                            placeholder="Doe"
                            label="Last Name"
                            name="lastname"
                            type="text"
                          />
                          <TextField
                            placeholder="johndoe@gmail.com"
                            label="Email"
                            name="email"
                            type="email"
                          />
                          <Tooltip
                            title="8-16 characters, One Uppercase, One Lowercase, One Number and One Special Character"
                            arrow
                          >
                            <TextField
                              label="Password"
                              name="password"
                              type="password"
                            />
                          </Tooltip>
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
                            Sign Up
                          </Button>
                          <Box
                            display="flex"
                            alignItems="baseline"
                            flexWrap="none"
                          >
                            <Typography fontWeight={1} fontSize={12} mt={2}>
                              Already a member?
                            </Typography>

                            <Link to="/signin">
                              <Typography
                                sx={{
                                  textDecoration: "underline",
                                }}
                                ml={2}
                                color="text.secondary"
                                alignItems="center"
                              >
                                Sign In
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

export default SignUp;
