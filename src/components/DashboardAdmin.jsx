import React from "react";
import { IconMenu2 } from "@tabler/icons";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  useMediaQuery,
  Avatar,
  ButtonBase,
  CssBaseline,
  Toolbar,
  AppBar,
} from "@mui/material";

import PerfectScrollbar from "react-perfect-scrollbar";
import { BrowserView, MobileView } from "react-device-detect";
import { Outlet, useNavigate } from "react-router-dom";

import MuiAppBar from "@mui/material/AppBar";
import { Typography } from "antd";

const drawerWidth = 240;

const DashboardAdmin = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
          <h1>Admin Dashboard</h1>
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        position="fixed"
        open={mobileOpen}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box
            sx={{
              width: 228,
              display: "flex",
              [theme.breakpoints.down("md")]: {
                width: "auto",
              },
            }}
          >
            <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.mediumAvatar,
                  transition: "all .2s ease-in-out",
                  background: theme.palette.secondary.light,
                  color: theme.palette.secondary.dark,
                  "&:hover": {
                    background: theme.palette.secondary.dark,
                    color: theme.palette.secondary.light,
                  },
                }}
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <IconMenu2 stroke={1.5} size="1.3rem" />
              </Avatar>
            </ButtonBase>
          </Box>
        </Toolbar>
      </AppBar>

      {/* drawer */}
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
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos
          repellat ab nisi eius fugiat porro minima eveniet mollitia? Officia ex
          minima quos doloribus delectus possimus praesentium assumenda
          cupiditate corporis fuga?
        </>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardAdmin;
