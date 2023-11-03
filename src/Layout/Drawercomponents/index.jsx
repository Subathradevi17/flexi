import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import {
//   BiSolidWalletAlt,
//   BsPersonSquare,
//   GoKey,
//   HiOutlineCube,
//   LuBadgePercent,
//   TbHelpSquareRoundedFilled,
//   TbHexagonNumber0,
// } from "../../utils/iconImports";
import { useStyles } from "./styles";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import {
  AppBar,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import fieldData from "../../utils/fields.json";
const drawerWidth = 200;

function DrawerComponent(props) {
  const { window } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const menu = Object.keys(fieldData).map((sectionName) => ({
    title: sectionName,
    // onClick: () => setSelectedSection(sectionName),
  }));

  React.useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [location.pathname, navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? true : false;
  };
  const drawer = (
    <div>
      <Toolbar className={classes.storeName}>
        {/* <TbHexagonNumber0 size={24} style={{ marginRight: "8px" }} /> */}
        <Typography variant='h6' style={{ color: "#ffffff" }} component='div'>
          Dashboard
        </Typography>
      </Toolbar>
      <Divider />
      <div className={classes.drawerItem}>
        <List>
          {menu.map((text, index) => (
            <Link key={uuidv4()} to={text.path}>
              <ListItem
                className={`${classes.drawerItemMenus} ${
                  activeRoute(text.path) ? classes.drawerItemMenu : ""
                }`}
                disablePadding>
                <ListItemButton>
                  <ListItemIcon className={classes.icon}>
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText
                    className={classes.title}
                    primary={text.title}
                  />

                  {text.title !== "Dashboard" && (
                    <span className={classes.colorWhite}>></span>
                  )}
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
      <Divider />
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "" }}>
      <AppBar
        className={classes.appBar}
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Toolbar className={classes.toolBar}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Hi Shahrukh! 👋
          </Typography>
          <FormControl
            fullWidth
            sx={{ m: 1, width: "15rem", display: { xs: "none", sm: "block" } }}>
            <OutlinedInput
              id='outlined-adornment-amount'
              placeholder='Search'
              startAdornment={
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              }
              label=''
            />
          </FormControl>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
          }}
          className={classes.drawer}>
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: "none", sm: "block" },
          }}
          open
          className={classes.drawer}>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
DrawerComponent.propTypes = {
  window: PropTypes.func,
};
export default DrawerComponent;
