import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import { useState } from "react";

import {
  Button,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { toast } from "react-toastify";
import { Edit } from "@mui/icons-material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const statusTypes = ["On Stock", "Out of Stock"];

function getStyles(name, status, theme) {
  return {
    fontWeight:
      status.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const UpdatePharmacy = ({ details }) => {
  const theme = useTheme();
  const [pharmacy_name, setPharmacyName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [pharmacy_pic, setPharmacyPic] = useState("");

  const updatePharmacy = (e) => {
    const data = new FormData();
    data.append("pharmacy_name", pharmacy_name);
    data.append("address", address);
    data.append("description", description);
    data.append("pharmacy_pic", pharmacy_pic);
    data.append("lat", lat);
    data.append("lng", lng);
    console.log(data);

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .put("http://localhost:90/pharmacy/update", data, config)
      .then((res) => {
        if (res.status === 201) {
          console.log("Pharmacy Updated Successfully");
          toast.success("Pharmacy Updated Successfully", {
            position: "top-center",
            autoClose: 4000,
          });
          window.location.replace("/dashboard");
        } else {
          console.log("Please Try Again! Something Went Wrong!!!", res);
          toast.error("Somthing went wrong!", {
            toastId: "error",
            position: "top-center",
            autoClose: 4000,
          });
        }
      })

      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
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
        <div className="row">
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Pharmacy Name"
            width="100%"
            defaultValue={details.pharmacy_name}
            onChange={(e) => {
              setPharmacyName(e.target.value);
            }}
          />
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Address"
            width="100%"
            defaultValue={details.address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <TextField
            required
            multiline
            rows={2}
            maxRows={4}
            id="outlined-required outlined-multiline-static"
            label="Description"
            defaultValue={details.description}
            onChange={(e) => {
              setDescription(e.target.value);
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
          <Box sx={{ display: "flex", width: "100%"  }}>
            <TextField
              required
              className="me-2"
              id="outlined-required fullWidth"
              fullWidth
              label="Latitude"
              width="100%"
              defaultValue={details.lat}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon sx={{ color: "#6BB3ED" }} />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setLat(e.target.value);
              }}
            />
            <TextField
              required
              id="outlined-required fullWidth"
              fullWidth
              label="Longitude"
              width="100%"
              defaultValue={details.lng}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon sx={{ color: "#6BB3ED" }} />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setLng(e.target.value);
              }}
            />
          </Box>
          <Button
            className="mt-2 fs-5 fw-bold"
            variant="contained"
            endIcon={<Edit className="fs-3" />}
            onClick={updatePharmacy}
            data-test="add-btn"
          >
            Update Pharmacy
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default UpdatePharmacy;
