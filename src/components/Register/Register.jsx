import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import background from "../../assets/images/medicine1.jpg";
import KeyIcon from "@mui/icons-material/Key";
import "./register.scss";
import PersonIcon from "@mui/icons-material/Person";
import MedicationIcon from "@mui/icons-material/Medication";
import DescriptionIcon from "@mui/icons-material/Description";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
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

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [pharmacy_name, setPharmacyName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [contact_no, setContactNo] = useState("");
  const [profile_pic, setProfilePic] = useState("");
  const [pharmacy_pic, setPharmacyPic] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    if (
      first_name === "" ||
      last_name === "" ||
      pharmacy_name === "" ||
      description === "" ||
      address === "" ||
      contact_no === "" ||
      profile_pic === "" ||
      pharmacy_pic === "" ||
      email === "" ||
      username === "" ||
      password === ""
    ) {
      toast.warn("Fill all Required Field", {
        position: "top-center",
        autoClose: 4000,
        toastId: "warning",
      });
      return;
    }

    const data = new FormData();
    data.append("first_name", first_name);
    data.append("last_name", last_name);
    data.append("pharmacy_name", pharmacy_name);
    data.append("description", description);
    data.append("address", address);
    data.append("contact_no", contact_no);
    data.append("profile_pic", profile_pic);
    data.append("pharmacy_pic", pharmacy_pic);
    data.append("email", email);
    data.append("username", username);
    data.append("password", password);

    console.log(data);
    axios
      .post("http://localhost:90/pharmacy/register", data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          toast.success("User Registered Sucessfully", {
            position: "top-center",
            autoClose: 4000,
          });
          window.location.replace("/");
        } else if (response.status === 200) {
          toast.error("Username Already Registered", {
            toastId: "error",
            position: "top-center",
            autoClose: 4000,
          });
        } else if (response.status === 401) {
          toast.error("Something Went Wrong, Please Try Again!!", {
            toastId: "error",
            position: "top-center",
            autoClose: 4000,
          });
        }
        console.log(response.data.msg);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          toast.error(e.response.data.msg, {
            toastId: "error",
            position: "top-center",
            autoClose: 4000,
          });
        }
        console.log(e);
      });
  };
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="xxl" className="registercontainer">
          <img src={background} alt="background" className="register-img" />
          <Box
            sx={{
              position: "absolute",
              maxWidth: 700,
            }}
          >
            <Card
              sx={{
                position: "relative",
                width: 620,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
                mt: 2,
                mx: 30,
              }}
              className="card-register"
            >
              <h1 className="register-title fs-3" style={{ color: "#6BB3ED" }}>
                Register An Account
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
                <Box sx={{ display: "flex" }}>
                  <TextField
                    required
                    id="outlined-required fullWidth"
                    fullWidth
                    className="me-2"
                    label="First Name"
                    width="100%"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: "#6BB3ED" }} />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <TextField
                    required
                    id="outlined-required fullWidth"
                    fullWidth
                    label="Last Name"
                    width="100%"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: "#6BB3ED" }} />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </Box>
                <TextField
                  required
                  id="outlined-required fullWidth"
                  fullWidth
                  label="Pharmacy Name"
                  width="100%"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MedicationIcon sx={{ color: "#6BB3ED" }} />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setPharmacyName(e.target.value);
                  }}
                />
                <TextField
                  required
                  id="outlined-required fullWidth"
                  fullWidth
                  multiline
                  rows={2}
                  maxRows={4}
                  label="Description"
                  width="100%"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon sx={{ color: "#6BB3ED" }} />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <TextField
                  required
                  id="outlined-required fullWidth"
                  fullWidth
                  label="Address"
                  width="100%"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon sx={{ color: "#6BB3ED" }} />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                <TextField
                  required
                  id="outlined-required fullWidth"
                  fullWidth
                  label="Contact No."
                  width="100%"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CallIcon sx={{ color: "#6BB3ED" }} />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setContactNo(e.target.value);
                  }}
                />
                <TextField
                  required
                  id="outlined-required fullWidth"
                  type="file"
                  label="Profile Image"
                  fullWidth
                  width="100%"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setProfilePic(e.target.files[0]);
                  }}
                />
                <TextField
                  required
                  id="outlined-required fullWidth"
                  type="file"
                  label="Pharmacy Image"
                  fullWidth
                  width="100%"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setPharmacyPic(e.target.files[0]);
                  }}
                />
                <TextField
                  required
                  id="outlined-required fullWidth"
                  fullWidth
                  label="Email"
                  width="100%"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "#6BB3ED" }} />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
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
                    onChange={(e) =>{
                      setPassword(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
              <CardActions>
                <Button
                  variant="contained"
                  className="register-btn"
                  // sx={{ backgroundColor: "#6BB3ED" }}
                  endIcon={<Icon icon="majesticons:register" />}
                  onClick={register}
                >
                  Register
                </Button>
              </CardActions>
              <Divider sx={{ width: "100%", color: "#000000", border: 0.9 }} />
              <Box sx={{ display: "flex", mt: 2, mb: 0 }}>
                <p>Already Have An Account?</p>
                <Link className="px-2 registerlink" to="/">
                  Sign In
                </Link>
              </Box>
            </Card>
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default Register;
