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
import { UserContext } from "../context/user.context";
import EditModalAvatar from "./EditModalAvatar";

//  si no está loggeado
const pagesNotLogged = ["Home", "About Us"];
const settingsNotLogged = ["Sign up", "Login"];
// si está loggeado y es admin
const pagesAdmin = ["Home", "Trainer", "User", "Workouts", "Routines"];
const settingsAdmin = ["Profile", "Logout"];
// si está loggeado y es user
const pagesUser = ["User", "Routines"]
const settingsUser = ["Profile","Logout"]

function NavBar(props) {
  console.log(props)
  const { isLoggedIn , isAdmin , authenticateUser } = useContext(AuthContext)

  const { imgUser, setImgUser} = useContext(UserContext)

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
      navigate("/user");
    } else {
      navigate("/");
    }
  };
  const handelNavigateUser = (setting) => {
    if (setting === "Profile") {
      navigate("/user");
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
              
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WORKOUTSWEB
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
              
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WORKOUTSWEB
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            
            {isAdmin && pagesAdmin.map((page) => (
              <Button 
              variant = "extenNavbar"
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
            {isLoggedIn && !isAdmin && pagesUser.map((page) => (
              <Button
              variant = "extenNavbar"
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
            {!isLoggedIn && pagesNotLogged.map((page) => (
              <Button
              variant = "extenNavbar"
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
                  alt=""
                  src={isLoggedIn ? imgUser : ""} //si está loggeado, si está definido el usuario, accede a props.user.imgUser
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
              <EditModalAvatar />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
