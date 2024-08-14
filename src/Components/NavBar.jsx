import { useContext, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

//  si no está loggeado
const pagesNotLogged = ["Home", "About Us"];
const settingsNotLogged = ["Sign up", "Login"];
// si está loggeado y es admin
const pagesAdmin = ["Home", "Trainer", "User", "Workouts", "Routines"];
const settingsAdmin = ["Profile", "Edit Profile", "Logout"];
// si está loggeado y es user
const pagesUser = ["User", "Routines"]
const settingsUser = ["Profile", "Edit Profile","Logout"]

function NavBar() {

  const { isLoggedIn , isAdmin ,authenticateUser } = useContext(AuthContext)

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleNavigate = (page) => {
    if (page === "Home") {
      navigate("/");
    } else if (page === "Trainer") {
      navigate("/trainer");
    } else if (page === "Workouts") {
      navigate("/workouts");
    } else if (page === "Routines") {
      navigate("/routines");
    } else if (page === "User") {
      navigate("/user/:user");
    } else {
      navigate("/");
    }
  };
  const handelNavigateUser = (setting) => {
    if (setting === "Profile") {
      navigate("/user/:user");
    } else if (setting === "Edit Profile") {
      navigate("/edit-profile");
    } else if (setting === "Sign up") {
      navigate("/signup");
    } else if (setting === "Login") {
      navigate("/login");
    } else if (setting === "Logout") {
      // invocar función que hace logout
      handleLogout();
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem("authToken")
    authenticateUser()
    navigate("/")
  }
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        color: "limes",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FitnessCenterIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WORKOUTWEB
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* operadores de cortocircuito para mostrar los roles */}
              { isAdmin && pagesAdmin.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigate(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              { isLoggedIn && !isAdmin && pagesUser.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigate(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              {!isLoggedIn && pagesNotLogged.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigate(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              
            </Menu>
          </Box>
          <FitnessCenterIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WORKOUTWEB
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            
            {pagesAdmin.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleNavigate(page);
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
            {pagesUser.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleNavigate(page);
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
            {pagesNotLogged.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleNavigate(page);
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://media.licdn.com/dms/image/D4D03AQGSlEnQZ-wfuA/profile-displayphoto-shrink_200_200/0/1677072213080?e=2147483647&v=beta&t=V1tceFtA78q9f1FwL9tAhG-CBoLWGflp3d03f13U6_c"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              { isAdmin && settingsAdmin.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handelNavigateUser(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              { isLoggedIn && !isAdmin &&  settingsUser.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handelNavigateUser(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              { !isLoggedIn && settingsNotLogged.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handelNavigateUser(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
