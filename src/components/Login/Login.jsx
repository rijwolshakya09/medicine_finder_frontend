import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import background from "../../assets/images/MedicineBack.svg";
import KeyIcon from "@mui/icons-material/Key";
import "./login.scss";
import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const login = (e) => {
    e.preventDefault();

    if (username.length === 0 || password.length === 0) {
      setError(true);
    }

    const data = {
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:90/pharmacy/login", data)
      .then((res) => {
        console.log(res);
        if (res.data.token) {
          console.log(res.data);
          localStorage.setItem("userType", res.data.userType);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", username);
          toast.success("Pharmacy User Logged In  Sucessfully", {
            position: "top-center",
            autoClose: 4000,
          });
          window.location.replace("/dashboard");
          // if (localStorage.getItem("userType") === "admin") {
          //   // console.log(res)
          //   window.location.replace("/dashboard_admin");
          // } else {
          //   console.log(res.data);
          //   window.location.replace("/dashboard");
          // }
        } else {
          toast.error("Pharmacy User Not Logged In", {
            toastId: "error",
            position: "top-center",
            autoClose: 4000,
          });
          console.log(res);
        }
      })
      .catch((e) => {
        toast.error("Pharmacy User Not Registered", {
          toastId: "error",
          position: "top-center",
          autoClose: 4000,
        });
        console.log(e);
      });
  };
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="xxl" className="logincontainer">
          <img src={background} alt="background" className="login-img" />
          <Box
            sx={{
              position: "absolute",
              maxWidth: 550,
            }}
          >
            <Card
              sx={{
                position: "relative",
                width: 400,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
                mt: 40,
                mx: 42,
              }}
              className="card-login"
            >
              <h1 className="login-title" style={{ color: "#6BB3ED" }}>
                Login
              </h1>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 0, pb: 2 },
                  // width: 762,
                  maxWidth: "100%",
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  id="outlined-required fullWidth"
                  fullWidth
                  label="Username"
                  width="100%"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon="ri:user-3-fill"
                          fontSize={24}
                          style={{ color: "#6BB3ED" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                {error && username.length <= 0 ? (
                  <label>Username cannot be empty</label>
                ) : (
                  ""
                )}
                <FormControl fullWidth required width="100%" variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    startAdornment={
                      <InputAdornment position="start">
                        <KeyIcon sx={{ color: "#6BB3ED" }} />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          style={{ color: "#6BB3ED" }}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </FormControl>
                {error && password.length <= 0 ? (
                  <label>Password cannot be empty</label>
                ) : (
                  ""
                )}
              </Box>
              <CardActions>
                <Button
                  variant="contained"
                  className="login-btn"
                  // sx={{ backgroundColor: "#6BB3ED" }}
                  endIcon={<Icon icon="majesticons:login" />}
                  onClick={login}
                >
                  Login
                </Button>
              </CardActions>
              <Divider sx={{ width: "100%", color: "#000000", border: 0.9 }} />
              <Box sx={{ display: "flex", mt: 2 }}>
                <p>Don't Have An Account?</p>
                <Link className="px-2 registerlink" to="/register">
                  Register
                </Link>
              </Box>
            </Card>
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default Login;
