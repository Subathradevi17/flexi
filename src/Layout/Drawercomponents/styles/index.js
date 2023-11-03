import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#f5f6f8 !important",
    color: "#000 !important",
    boxShadow: "none !important",
  },
  toolBar: {
    justifyContent: "space-between !important",
  },
  drawer: {
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: 200,
      backgroundColor: "#040440",
      color: "#fff ",
    },
  },
  icon: {
    "& svg": {
      color: "#fff",
      fontSize: "medium",
    },
  },
  drawerItemMenu: {
    backgroundColor: "#2d2d69",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.06)",
    borderRadius: 10,
    position: "relative",
    wordWrap: "break-word",
    textDecoration: "none",
    zIndex: 9,
    "& .MuiListItemText-root": {
      color: "#b2b2c7",
      borderLeft: "4px solid transparent",
    },
    "&:hover": {
      backgroundColor: "#fff !important",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.06) !important",
      borderRadius: "10px !important",
      position: "relative",
      borderLeft: "4px solid transparent !important",
      wordWrap: "break-word",
      zIndex: 9,
      "& .MuiListItemText-root": {
        color: "#222 !important",
        borderLeft: "4px solid transparent !important",
      },
    },
  },
  drawerItem: {
    paddingRight: 10,
    paddingLeft: 10,
    textDecoration: "none",
    "& .MuiListItemButton-root": {
      padding: 5,
    },
    "& .MuiListItemIcon-root": {
      minWidth: "28px",
    },
    "& .MuiListItem-root": {
      borderLeft: "4px solid transparent",
      "&:hover": {
        backgroundColor: "transparent",
        boxShadow: "unset",
        borderRadius: "10px ",
        borderLeft: "4px solid #fff",
        "& .MuiListItemText-root": {
          color: "#fff",
        },
      },
    },
  },
  drawerItemMenus: {
    marginBottom: 7,
    textDecoration: "none",
  },
  title: {
    color: "#61648a",
  },
  colorWhite: {
    color: "#b2b2c7",
    fontSize: "10px",
  },
}));
