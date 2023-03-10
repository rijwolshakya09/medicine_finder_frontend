import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useState } from "react";

import {
  Button,
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

const UpdateMedicine = ({ medicine }) => {
  const theme = useTheme();
  const [medicine_name, setMedicineName] = useState("");
  const [medicine_price, setMedicinePrice] = useState("");
  const [medicine_description, setMedicineDescription] = useState("");
  const [medicine_image, setMedicineImage] = useState("");
  const [status, setStatus] = useState([]);

  const updateMedicine = (e) => {
    const data = new FormData();
    data.append("medicine_name", medicine_name);
    data.append("medicine_price", medicine_price);
    data.append("medicine_description", medicine_description);
    data.append("medicine_image", medicine_image);
    data.append("status", status);
    console.log(data);

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .put("http://localhost:90/medicine/update", data, config)
      .then((res) => {
        if (res.status === 201) {
          console.log("Medicine Updated Successfully");
          toast.success("Medicine Updated Successfully", {
            position: "top-center",
            autoClose: 4000,
          });
          window.location.replace("/dashboard/medicine");
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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStatus(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
            label="Medicine Name"
            width="100%"
            defaultValue={medicine.medicine_name}
            onChange={(e) => {
              setMedicineName(e.target.value);
            }}
          />
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Medicine Price"
            width="100%"
            defaultValue={medicine.medicine_price}
            onChange={(e) => {
              setMedicinePrice(e.target.value);
            }}
          />
          <TextField
            required
            multiline
            rows={2}
            maxRows={4}
            id="outlined-required outlined-multiline-static"
            label="Medicine Description"
            defaultValue={medicine.medicine_description}
            onChange={(e) => {
              setMedicineDescription(e.target.value);
            }}
          />
          <FormControl sx={{ pb: 2 }} required>
            <InputLabel id="demo-multiple-name-label">Status</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={status}
              onChange={handleChange}
              input={<OutlinedInput label="Book Category" />}
              MenuProps={MenuProps}
            >
              {statusTypes.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, status, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            id="outlined-required fullWidth"
            type="file"
            label="Medicine Image"
            fullWidth
            width="100%"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setMedicineImage(e.target.files[0]);
            }}
          />
          <Button
            className="mt-2 fs-5 fw-bold"
            variant="contained"
            endIcon={<Edit className="fs-3" />}
            onClick={updateMedicine}
            data-test="add-btn"
          >
            Update Medicine
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default UpdateMedicine;
