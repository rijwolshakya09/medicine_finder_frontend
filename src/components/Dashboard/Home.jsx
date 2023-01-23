import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid, Modal } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import "./home.scss";
import { Edit } from "@mui/icons-material";
import UpdateProfile from "./UpdateProfile";
import UpdatePharmacy from "./UpdatePharmacy";

const Home = () => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const handleUpdateOpen = () => setUpdateOpen(true);
  const handleUpdateClose = () => setUpdateOpen(false);

  const [updateOpen1, setUpdateOpen1] = useState(false);
  const handleUpdateOpen1 = () => setUpdateOpen1(true);
  const handleUpdateClose1 = () => setUpdateOpen1(false);

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [pharmacy_name, setPharmacyName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [contact_no, setContactNo] = useState("");
  const [profile_pic, setProfilePic] = useState("");
  const [pharmacy_pic, setPharmacyPic] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [details, setDetails] = useState([]);
  const [pdetails, setPDetails] = useState([]);

  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios.get("http://localhost:90/pharmacy/get", config).then((res) => {
      console.log(res.data);
      setFirstName(res.data.data.first_name);
      setLastName(res.data.data.last_name);
      setPharmacyName(res.data.data.pharmacy_name);
      setDescription(res.data.data.description);
      setAddress(res.data.data.address);
      setLat(res.data.data.lat);
      setLng(res.data.data.lng);
      setContactNo(res.data.data.contact_no);
      setProfilePic(res.data.data.profile_pic);
      setPharmacyPic(res.data.data.pharmacy_pic);
      setEmail(res.data.data.email);
      setUsername(res.data.data.username);
      setDetails(res.data.data);
      setPDetails(res.data.data);
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
              sx={{ width: "100%", marginLeft: 1, p: 4, background: "#6BB3ED" }}
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
              <Button
                variant="contained"
                sx={{
                  mt: 1,
                  borderRadius: 2,
                  background: "#64a36e",
                  fontWeight: "bold",
                  p: 1,
                  ":hover": {
                    background: "#ffffff",
                    color: "#6BB3ED",
                    fontWeight: "bold",
                  },
                }}
                onClick={handleUpdateOpen}
                endIcon={<Edit />}
              >
                Update Profile
              </Button>
              <Modal
                open={updateOpen}
                onClose={handleUpdateClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style1}>
                  <UpdateProfile details={details} />
                </Box>
              </Modal>
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
              sx={{ width: "100%", marginLeft: 1, p: 4, background: "#6BB3ED" }}
              className="pharmacy-content rounded"
            >
              <Typography
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

              <Box sx={{ display: "flex" }}>
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
                    fontWeight: "bold",
                    width: "100%",
                  }}
                  className="me-2"
                  variant="body2"
                  color="text.secondary"
                >
                  Latitude
                </Typography>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    width: "100%",
                  }}
                  variant="body2"
                  color="text.secondary"
                >
                  Longitude
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
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
                  className="me-2"
                  variant="body2"
                  color="text.secondary"
                >
                  {address}
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
                  className="me-2"
                  variant="body2"
                  color="text.secondary"
                >
                  {lat}
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
                  {lng}
                </Typography>
              </Box>

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
              <Button
                variant="contained"
                onClick={handleUpdateOpen1}
                sx={{
                  mt: 1,
                  borderRadius: 2,
                  background: "#64a36e",
                  fontWeight: "bold",
                  p: 1,
                  ":hover": {
                    background: "#ffffff",
                    color: "#6BB3ED",
                    fontWeight: "bold",
                  },
                }}
                endIcon={<Edit />}
              >
                Update Pharmacy
              </Button>
              <Modal
                open={updateOpen1}
                onClose={handleUpdateClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style1}>
                  <UpdatePharmacy details={pdetails} />
                </Box>
              </Modal>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
