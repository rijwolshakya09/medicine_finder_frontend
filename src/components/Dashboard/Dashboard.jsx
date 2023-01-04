import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useState, useEffect } from "react";

import { useTheme } from "@mui/material/styles";
import PerfectScrollbar from "react-perfect-scrollbar";
import { BrowserView, MobileView } from "react-device-detect";
import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `${0}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 246,
    }),
  })
);

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [profile_pic, setProfilePic] = useState("");
  const [username, setUsername] = useState("");

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios.get("http://localhost:90/pharmacy/get", config).then((res) => {
      console.log(res.data);
      setProfilePic(res.data.data.profile_pic);
      setUsername(res.data.data.username);
    });
  }, []);

  const drawer = (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box sx={{ display: "flex", p: 2, mx: "auto" }}>
          {/* <LogoSection /> */}
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? "calc(100vh - 56px)" : "calc(100vh - 88px)",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <div className="alata">
            <List>
              <Link to="" className="admin-dashboard__nav">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <DashboardIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={"Dashboard"}
                      sx={{
                        fontFamily: "Alata",
                        fontSize: "20px",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
            {/* <Divider /> */}
            <p className="admin-dashboard__nav--heading">Management</p>
            <List>
              <Link className="admin-dashboard__nav">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PeopleAltIcon />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={"Users"}
                      sx={{
                        fontFamily: "Alata",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link
                to="/dashboard_admin/admin_approve"
                className="admin-dashboard__nav"
                data-test="admin_approve_btn"
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <LibraryBooksIcon />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={"Books"}
                      sx={{
                        fontFamily: "Alata",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
              <p className="admin-dashboard__nav--heading">Book uploads</p>
              <Link
                to="/dashboard_admin/ebook"
                className="admin-dashboard__nav"
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PictureAsPdfIcon />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={"E-Books"}
                      sx={{
                        fontFamily: "Alata",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link
                to="/dashboard_admin/audio_book"
                className="admin-dashboard__nav"
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PlayLessonIcon />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={"Audio Books"}
                      sx={{
                        fontFamily: "Alata",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
              <p className="admin-dashboard__nav--heading"> EBook Rent</p>
              <Link
                to="/dashboard_admin/request"
                className="admin-dashboard__nav"
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PictureAsPdfIcon />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={"Rent Requests"}
                      sx={{
                        fontFamily: "Alata",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
            <Divider />
            <List>
              <Link className="admin-dashboard__nav">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <MailIcon />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={"Inbox"}
                      sx={{
                        fontFamily: "Alata",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link
                to="/dashboard_admin/profile"
                className="admin-dashboard__nav"
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={"Profile"}
                      sx={{
                        fontFamily: "Alata",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link
                to="/dashboard_admin/adminSetting"
                className="admin-dashboard__nav"
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={"Settings"}
                      sx={{
                        fontFamily: "Alata",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>

              <ListItem disablePadding>
                <ListItemButton onClick={logout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={"Logout"}
                    sx={{
                      fontFamily: "Alata",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </div>
          {/* <MenuList /> */}
          {/* <MenuCard /> */}
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          {/* <MenuList /> */}
          {/* <MenuCard /> */}
        </Box>
      </MobileView>
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        open={mobileOpen}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background:"#6BB3ED" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block", fontFamily: "Poppins" } }}
          >
            MEDICINE FINDER
          </Typography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton sx={{ p: 0 }}>
              <Avatar
                alt="profile image"
                src={
                  profile_pic
                    ? `http://localhost:90/${profile_pic}`
                    : "https://www.pngitem.com/pimgs/m/421-4212341_default-avatar-svg-hd-png-download.png"
                }
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Box
        component="nav"
        sx={{ flexShrink: { md: 0 }, width: matchUpMd ? 260 : "auto" }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant={matchUpMd ? "persistent" : "temporary"}
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              width: 260,
              background: "#bacada",
              color: "#fff",
              borderRight: "50%",
              [theme.breakpoints.up("md")]: {
                top: "65px",
              },
            },
          }}
          ModalProps={{ keepMounted: true }}
          color="inherit"
        >
          {drawer}
        </Drawer>
      </Box>
      <Main component="main" sx={{ p: 3 }} open={mobileOpen}>
        {/* <Toolbar /> */}
        <Outlet />
      </Main>
    </Box>
  );
}
