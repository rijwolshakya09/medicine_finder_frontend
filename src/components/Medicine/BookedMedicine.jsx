import * as React from "react";
import "./showMedicine.scss";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import MedicationIcon from "@mui/icons-material/Medication";
import { Button } from "@mui/material";
import AddMedicine from "./AddMedicine";
import UpdateMedicine from "./UpdateMedicine";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState(false);
  const handleOpen = () => setView(true);
  const handleClose = () => setView(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const handleUpdateOpen = () => setUpdateOpen(true);
  const handleUpdateClose = () => setUpdateOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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

  const deleteMedicine = () => {
    console.log(row._id);
    axios
      .delete("http://localhost:90/medicine/delete/" + row._id, config)
      .then((result) => {
        console.log(result);
        if (result.data.success) {
          console.log("Medicine Deleted Successfull");
          toast.success(
            "Medicine Deleted Successfully",
            { toastId: "Delete Success" },
            setTimeout(() => {
              window.location.reload();
            }, 1500)
          );
        } else {
          console.log("Please Try Again!!!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <TableCell
          align="center"
          sx={{
            fontSize: 16,
            fontFamily: "Poppins",
            // fontWeight: "bold",
          }}
        >
          {row.medicine.medicine_name}
        </TableCell>
        <TableCell
          align="center"
          sx={{
            fontSize: 16,
            fontFamily: "Poppins",
            // fontWeight: "bold",
          }}
        >
          {row.medicine.medicine_price}
        </TableCell>
        <TableCell
          align="center"
          sx={{
            fontSize: 16,
            fontFamily: "Poppins",
            // fontWeight: "bold",
          }}
        >
          {row.quantity}
        </TableCell>
        <TableCell
          align="center"
          sx={{
            fontSize: 16,
            fontFamily: "Poppins",
            // fontWeight: "bold",
          }}
        >
          {row.total_price}
        </TableCell>
        <TableCell
          align="center"
          sx={{
            fontSize: 16,
            fontFamily: "Poppins",
            // fontWeight: "bold",
          }}
        >
          {row.status}
        </TableCell>
        <TableCell align="center">
          <div className="d-flex  align-items-center justify-content-center">
            <button
              className="approve--btn"
              onClick={handleUpdateOpen}
              data-test="approve--btn"
            >
              Status Update{" "}
              <Icon icon="material-symbols:edit-rounded" className="fs-5" />
            </button>
            <Modal
              open={updateOpen}
              onClose={handleUpdateClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style1}>
                <UpdateMedicine medicine={row} />
              </Box>
            </Modal>
            <Button
              onClick={handleOpen}
              class="reject--btn"
              data-test="reject--btn"
            >
              Delete History <Icon icon="ic:round-delete" className="fs-5" />
            </Button>
            <Modal
              open={view}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              data-test="reject-modal"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Are you sure you want to delete this medicine history?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div className="d-flex align-items-center ">
                    <button
                      className="approve--btn"
                      onClick={(e) => {
                        deleteMedicine(row._id, e);
                      }}
                      data-test="yes-btn"
                    >
                      Yes &nbsp; <BsCheckLg />
                    </button>
                    <button onClick={handleClose} className="reject--btn ">
                      No &nbsp; <ImCross />
                    </button>
                  </div>
                </Typography>
              </Box>
            </Modal>
          </div>
        </TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, display: "flex", alignItems: "center" }}>
              <img
                src={`http://localhost:90/${row.medicine.medicine_image}`}
                alt="book_img"
                className="img-fluid table-img"
              />
              <Typography sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                  }}
                  className="me-2"
                  variant="body2"
                  color="text.secondary"
                >
                  Description:
                </Typography>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontFamily: "Poppins",
                    border: 1,
                    borderRadius: 2,
                    p: 1,
                    width: "100%",
                  }}
                  variant="body2"
                  color="text.secondary"
                >
                  {row.medicine.medicine_description}
                </Typography>
              </Typography>
              <Typography sx={{ marginLeft: 3, width: "100%", marginRight: 2 }}>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                  }}
                  className="me-2"
                  variant="body2"
                  color="text.secondary"
                >
                  Booked By:
                </Typography>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontFamily: "Poppins",
                    border: 1,
                    borderRadius: 2,
                    p: 1,
                    width: "100%",
                  }}
                  variant="body2"
                  color="text.secondary"
                >
                  {row.userId.first_name}
                </Typography>
              </Typography>
              <img
                src={`http://localhost:90/${row.userId.profile_pic}`}
                alt="book_img"
                className="w-25 img-fluid table-img"
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
Row.propTypes = {
  row: PropTypes.shape({
    rent: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    more: PropTypes.arrayOf(
      PropTypes.shape({
        desc: PropTypes.string.isRequired,
        bookOwner: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
  }).isRequired,
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6BB3ED",
    fontSize: "18px",
    fontWeight: "600",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 26,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
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

export default function BookedMedicine() {
  const [listMedicineBooked, setListMedicineBooked] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios.get("http://localhost:90/medicine/bookedphar", config).then((res) => {
      console.log(res.data);
      setListMedicineBooked(res.data.data);
      console.log(listMedicineBooked);
    });
  }, []);
  return (
    <>
      <div>
        <h1 className="table-title">Booked Medicine List</h1>
      </div>
      
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" sx={{ minWidth: 700 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell />
              <StyledTableCell align="center" className="tableheading">
                Medicine Name
              </StyledTableCell>
              <StyledTableCell align="center" className="tableheading">
                Medicine Price
              </StyledTableCell>
              <StyledTableCell align="center" className="tableheading">
                Quantity
              </StyledTableCell>
              <StyledTableCell align="center" className="tableheading">
                Total Price
              </StyledTableCell>
              <StyledTableCell className="tableheading" align="center">
                Status
              </StyledTableCell>
              <StyledTableCell className="tableheading" align="center">
                Action
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {listMedicineBooked.map((row) => (
              <Row key={row._id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
