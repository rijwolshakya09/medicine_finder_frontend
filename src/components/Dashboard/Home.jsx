import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import "./home.scss";

const Home = () => {
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

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios.get("http://localhost:90/pharmacy/get", config).then((res) => {
      console.log(res.data);
      setFirstName(res.data.data.first_name);
      setLastName(res.data.data.last_name);
      setPharmacyName(res.data.data.pharmacy_name);
      setDescription(res.data.data.description);
      setAddress(res.data.data.address);
      setContactNo(res.data.data.contact_no);
      setProfilePic(res.data.data.profile_pic);
      setPharmacyPic(res.data.data.pharmacy_pic);
      setEmail(res.data.data.email);
      setUsername(res.data.data.username);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="text-center fs-1 fw-bold pb-4">Pharmacy Dashboard</div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
      <Card
        sx={{
          maxWidth: 800,
          display: "flex",
          justify: "center",
          p: 2,
        }}
        className="profile-card"
      >
        <CardMedia
          component="img"
          // height="140"
          className="profile-pic rounded"
          sx={{
            background: "#6BB3ED",
          }}
          image={`http://localhost:90/${profile_pic}`}
          alt="green iguana"
        />
        <CardContent
          sx={{ width: "100%", mx: 1, p: 4, background: "#6BB3ED" }}
          className="profile-content rounded"
        >
          <Typography
            gutterBottom
            sx={{
              textAlign: "center",
              color: "white",
              fontSize: 26,
              fontFamily: "Poppins",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
            component="div"
          >
            Pharmacist Details
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "Poppins",
              fontWeight: "bold",
              width: "100%",
            }}
            className="me-2"
            variant="body2"
            color="text.secondary"
          >
            Pharmacist Name
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "Poppins",
              border: 1,
              borderRadius: 1,
              background: "white",
              p: 0.4,
              width: "100%",
            }}
            variant="body2"
            color="text.secondary"
          >
            {first_name} {last_name}
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "Poppins",
              fontWeight: "bold",
              width: "100%",
            }}
            className="me-2"
            variant="body2"
            color="text.secondary"
          >
            Contact No.
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "Poppins",
              border: 1,
              background: "white",
              borderRadius: 1,
              p: 0.4,
              width: "100%",
            }}
            variant="body2"
            color="text.secondary"
          >
            {contact_no}
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "Poppins",
              fontWeight: "bold",
              width: "100%",
            }}
            className="me-2"
            variant="body2"
            color="text.secondary"
          >
            Username
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "Poppins",
              border: 1,
              borderRadius: 1,
              background: "white",
              p: 0.4,
              width: "100%",
            }}
            variant="body2"
            color="text.secondary"
          >
            {username}
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "Poppins",
              fontWeight: "bold",
              width: "100%",
            }}
            className="me-2"
            variant="body2"
            color="text.secondary"
          >
            Email
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "Poppins",
              border: 1,
              borderRadius: 1,
              background: "white",
              p: 0.4,
              width: "100%",
            }}
            variant="body2"
            color="text.secondary"
          >
            {email}
          </Typography>
        </CardContent>
      </Card>
      {/* //=================== */}
      <Card
        sx={{
          maxWidth: 800,
          display: "flex",
          justify: "center",
          p: 2,
          mt: 3,
        }}
        className="pharmacy-card"
      >
        <CardMedia
          component="img"
          // height="140"
          className="pharmacy-pic rounded"
          sx={{
            background: "#6BB3ED",
          }}
          image={`http://localhost:90/${pharmacy_pic}`}
          alt="green iguana"
        />
        <CardContent
          sx={{ width: "100%", mx: 1, p: 4, background: "#6BB3ED" }}
          className="pharmacy-content rounded"
        >
          <Typography
            gutterBottom
            sx={{
              textAlign: "center",
              color: "white",
              fontSize: 26,
              fontFamily: "Poppins",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
            component="div"
          >
            Pharmacy Details
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "Poppins",
              fontWeight: "bold",
              width: "100%",
            }}
            className="me-2"
            variant="body2"
            color="text.secondary"
          >
            Pharmacy Name
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "Poppins",
              border: 1,
              borderRadius: 1,
              background: "white",
              p: 0.4,
              width: "100%",
            }}
            variant="body2"
            color="text.secondary"
          >
            {pharmacy_name}
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "Poppins",
              fontWeight: "bold",
              width: "100%",
            }}
            className="me-2"
            variant="body2"
            color="text.secondary"
          >
            Address
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "Poppins",
              border: 1,
              background: "white",
              borderRadius: 1,
              p: 0.4,
              width: "100%",
            }}
            variant="body2"
            color="text.secondary"
          >
            {address}
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "Poppins",
              fontWeight: "bold",
              width: "100%",
            }}
            className="me-2"
            variant="body2"
            color="text.secondary"
          >
            Description
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "Poppins",
              border: 1,
              borderRadius: 1,
              background: "white",
              p: 0.4,
              width: "100%",
            }}
            variant="body2"
            color="text.secondary"
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
      </Grid>
      </Grid>
    </div>
  );
};

export default Home;
