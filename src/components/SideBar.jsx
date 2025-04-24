import React from "react";
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { Typography, Avatar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors"; // Importez grey pour la couleur
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const menuItems = [
  {
    title: "Main",
    items: [
      { text: "Dashboard", icon: <HomeOutlinedIcon />, path: "/app" }, // Changé de "/" à "/app"
      { text: "Manage Team", icon: <PeopleOutlinedIcon />, path: "/app/team" },
      { text: "Contacts Information", icon: <ContactsOutlinedIcon />, path: "/app/contacts" },
    ],
  },
  {
    title: "Pages",
    items: [
      { text: "Profile Form", icon: <PersonOutlinedIcon />, path: "/app/form" },
      { text: "Create Offer", icon: <AddCircleOutlineTwoToneIcon />, path: "/app/offre" },
      { text: "Calendar", icon: <CalendarTodayOutlinedIcon />, path: "/app/calendar" },
      { text: "FAQ Page", icon: <HelpOutlineOutlinedIcon />, path: "/app/faq" },
    ],
  },
  {
    title: "Charts",
    items: [
      { text: "Bar Chart", icon: <BarChartOutlinedIcon />, path: "/app/bar" },
      { text: "Pie Chart", icon: <PieChartOutlineOutlinedIcon />, path: "/app/pie" },
      { text: "Line Chart", icon: <TimelineOutlinedIcon />, path: "/app/line" },
      { text: "Geography Chart", icon: <MapOutlinedIcon />, path: "/app/geography" },
    ],
  },
];

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })( 
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open ? openedMixin(theme) : closedMixin(theme)),
    '& .MuiDrawer-paper': open ? openedMixin(theme) : closedMixin(theme),
  })
);

const SideBar = ({ open, handleDrawerClose }) => {
  let location = useLocation(); 
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>

      <Divider /> 

      {/* Avatar and Username */}
      <Avatar sx={{ mx: 'auto', width: open ? 88 : 44, height: open ? 88 : 44, my: 1, border: "2px solid grey", transitions: "0.25" }} 
        alt="User Avatar" src="https://media.licdn.com/dms/image/v2/D4E0BAQFPJ4arGSb5Tg/company-logo_200_200/company-logo_200_200/0/1696589536789/vermeg_logo?e=2147483647&v=beta&t=ay-XwJD7C1Wyd9M_mRJurYk6Lw3YPcZAx70l9G0vAbw" />
      <Typography align="center" sx={{ fontSize: open ? 17 : 0, transitions: "0.25" }}>Aziz</Typography>
      <Typography align="center" sx={{ fontSize: open ? 15 : 0, transitions: "0.25", color: theme.palette.info.main }}>Admin</Typography>

      <Divider />

      {menuItems.map((section, index) => (
        <React.Fragment key={index}>
          <List>
            {section.items.map((item) => (
              <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                  }}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    bgcolor: location.pathname === item.path 
                      ? theme.palette.mode === "dark" 
                        ? grey[800] // Couleur pour le mode sombre
                        : grey[300] // Couleur pour le mode clair
                      : 'transparent', 
                    justifyContent: open ? 'initial' : 'center',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: open ? 3 : 'auto' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </React.Fragment>
      ))}
    </Drawer>
  );
};

export default SideBar;
