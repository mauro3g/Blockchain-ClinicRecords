import { styled, useTheme } from "@mui/material/styles";
import React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { SessionContext } from "../../context/SessionProvider/SessionProvider";
import { PATH } from "lib/constants/routes";
import {
  Link as RouterLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Box,
  Toolbar,
  IconButton,
  Icon,
  Button,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Paper,
} from "@mui/material";

const drawerWidth = 200;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Nav = ({ children }) => {
  const { loggedUser, navigation, openNav, setOpenNav, logout } =
    React.useContext(SessionContext);
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const handleDrawerOpen = () => setOpenNav(true);
  const handleDrawerClose = () => setOpenNav(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const redirectDashboard = () => {
    navigate(`${PATH.root}${PATH.dashboard}`);
  };

  const redirectHome = () => {
    navigate(`${PATH.root}`);
  };

  React.useEffect(() => {
    console.log(navigation);
  }, [navigation]);

  return (
    <Box sx={{ display: "flex" }}>
      {Boolean(loggedUser) && !location.pathname.includes(PATH.error) ? (
        <React.Fragment>
          <AppBar
            position="fixed"
            sx={{ backgroundColor: "white" }}
            open={openNav}
          >
            <Toolbar>
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex">
                  <IconButton
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                      color: "black",
                      mr: 2,
                      ...(openNav && { display: "none" }),
                    }}
                  >
                    <Icon>menu</Icon>
                  </IconButton>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/health-icon.svg`}
                    alt="clinic_record"
                    height="40px"
                  />
                  <Box>
                    <Button onClick={redirectHome}>
                      <Typography variant="h6" color="primary" noWrap>
                        {"Historial Clínico Geriátrico"}
                      </Typography>
                    </Button>
                  </Box>
                </div>
                <div className="flex items-center">
                  <div className="mr-4">
                    <Typography color="primary">
                      {loggedUser?.username}
                    </Typography>
                  </div>
                  <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <Icon color="primary">account_circle</Icon>
                  </IconButton>
                </div>
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer
            color="primary"
            sx={{
              textAlign: "center",
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                backgroundColor: "#81B9D9",
              },
            }}
            variant="persistent"
            anchor="left"
            open={openNav}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                <Icon sx= {{color: "white"}}>
                  {theme.direction === "ltr" ? "chevron_left" : "chevron_right"}
                </Icon>
              </IconButton>
            </DrawerHeader>
            <Divider />
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/cicle-med-back.jpg`}
              alt="clinic_record"
              width="200px"
              height="200px"
            />
            <List sx={{ mt: 2 }}>
              {navigation.map((element, index) => (
                <RouterLink
                  to={element.to}
                  color="inherit"
                  key={element.text + index}
                  style={{textDecoration: 'none'}}
                >
                  <ListItem
                    selected={location.pathname.includes(element.to)}
                    sx={{textDecoration: "none"}}
                  >
                    <ListItemIcon>
                      <Icon sx= {{color: "white"}}>{element.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText
                      primary={element.text}
                      primaryTypographyProps={{
                        fontSize: 16,
                        fontWeight: "500",
                        lineHeight: "30px",
                        mb: "2px",
                        color: "white"
                      }}
                    />
                  </ListItem>
                </RouterLink>
              ))}
            </List>
          </Drawer>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
          >
            <Paper>
              {
                /* <div className="flex m-4">
                                    <div className="mr-3 flex items-center">
                                        <Avatar style={{ backgroundColor: "#009688", color: "white" }}>{user?.name?.charAt(0)?.toUpperCase()}</Avatar>
                                    </div>
                                    <div className="mr-3 flex flex-col">
                                        <Typography>
                                            {user?.name}
                                        </Typography>
                                        <Typography variant="caption">
                                            {user?.email}
                                        </Typography>
                                        <Typography variant="caption">
                                            {user?.isAdmin ? "Administrador" : "Transportista"}
                                        </Typography>
                                    </div>
                                </div>
                                <Divider />*/
                <ListItem onClick={() => logout()} dense button>
                  <ListItemIcon>
                    <Icon>exit_to_app</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Cerrar sesión" />
                </ListItem>
              }
            </Paper>
          </Popover>
          <Main open={openNav}>
            <DrawerHeader />
            {children}
          </Main>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Outlet />
        </React.Fragment>
      )}
    </Box>
  );
};

export default Nav;
