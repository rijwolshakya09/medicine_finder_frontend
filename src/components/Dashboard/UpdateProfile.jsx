import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";

import {
  Button,
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

const UpdateProfile = ({ details }) => {
  const theme = useTheme();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [contact_no, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [profile_pic, setProfilePic] = useState("");

  const updateProfile = (e) => {
    const data = new FormData();
    data.append("first_name", first_name);
    data.append("last_name", last_name);
    data.append("contact_no", contact_no);
    data.append("email", email);
    data.append("profile_pic", profile_pic);
    console.log(data);

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .put("http://localhost:90/pharmaist/update", data, config)
      .then((res) => {
        if (res.status === 201) {
          console.log("Profile Updated Successfully");
          toast.success("Profile Updated Successfully", {
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
            label="First Name"
            width="100%"
            defaultValue={details.first_name}
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
            defaultValue={details.last_name}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
           <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Contact No"
            width="100%"
            defaultValue={details.contact_no}
            onChange={(e) => {
              setContactNo(e.target.value);
            }}
          />
           <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Email"
            width="100%"
            defaultValue={details.email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            required
            id="outlined-required fullWidth"
            type="file"
            label="Profile Picture"
            fullWidth
            width="100%"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setProfilePic(e.target.files[0]);
            }}
          />
          <Button
            className="mt-2 fs-5 fw-bold"
            variant="contained"
            endIcon={<Edit className="fs-3" />}
            onClick={updateProfile}
            data-test="add-btn"
          >
            Update Profile
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default UpdateProfile;
