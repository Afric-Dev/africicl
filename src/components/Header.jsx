import * as React from 'react';
import { useState, useEffect } from 'react';
//MUI
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';

//Componets
import Donate from "./Donate";
//Firebase 
import { auth } from '../backend/Firebase';
import { GoogleAuthProvider, signInWithPopup, sendEmailVerification, onAuthStateChanged, signOut} from 'firebase/auth';

const pages = ['Home', 'About Us', 'Contact Us'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));


function Header() {
  //Mui
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = useState(false);
  //Firebase
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true); 

  const handleClickOpen = () => {
    setDonate(true);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };

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

//Firebase for handling Auth logic
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (result) => {
      setIsLoading(false); 

      if (result) {
        const { displayName, email } = result;
        setUserData({ displayName, email });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

    const SignUpUsingGoogle = () => {
    setIsLoading(true); 

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        setUserData({ displayName, email, photoURL  });
        sendEmailVerification(result.user);
        setIsLoggedIn(true);
        setIsLoading(false); 
      })
      .catch((error) => {
        console.log({ error });
        setIsLoading(false); 
      });
  };

    const handleLogout = () => {
    setIsLoading(true); 

    signOut(auth)
      .then(() => {
        setUserData({});
        setIsLoggedIn(false);
        setIsLoading(false); 
        navigate("/");
      })
      .catch((error) => {
        console.log({ error });
        setIsLoading(false); 
      });
  };

  return (
    <AppBar position="static" sx={{ background: "white", height: "10vh",   borderRadius: '20px', width: "80%",  margin:"auto", justifyContent:"center", alignItems:"center", marginTop:"20px",}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'sans',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'darkgreen',
              textDecoration: 'none',
            }}
          >
            AfricICL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
    {/*        <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>*/}
       {/*     <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none', color:"black" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" sx={{ color:"black" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>*/}
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'sanbs',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'darkgreen',
              textDecoration: 'none',
            }}
          >
            AfricICL
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>



          {isLoggedIn ? ( // If user is authenticated, show logout button
            <Box sx={{ flexGrow: 0 }}>
             <Tooltip  title="Open settings" >
              <IconButton  onClick={toggleDrawer(true)} sx={{ p: 0 }}>
                <Avatar alt={userData.name} src={userData.photoURL} />
              </IconButton>
            </Tooltip>
               {/*/ <MenuItem width="50">

                  <Button
                      variant="contained"
                      sx={{
                        background: 'linear-gradient(90deg, rgba(204, 0, 13, 1) 0%, rgba(212, 0, 0, 1) 50%, rgba(29, 4, 9, 1) 100%)',
                        color: 'white',
                        display: { xs: 'block', md: 'inline-block' },
                        marginRight: '1rem', 
                      }}
                      onClick={handleLogout}
                      disabled={isLoading}
                    >
                      {isLoggedIn ? 'Logout' : 'Logging out...'}
                    </Button> 
                    </MenuItem>
                    */}
                  <Drawer
                  anchor="right"
                  open={open}
                  onClose={toggleDrawer(false)}
                  sx={{
                    width: {
                      xs: '70%',  // 70% width on extra-small (phones)
                      md: '30%',  // 40% width on medium and larger (laptops)
                    },
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                      width: {
                        xs: '70%',  // Same as above, for the drawer paper itself
                        md: '30%',
                      },
                    },
                  }}
                >
                <FormControlLabel
                    control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                    label="Switch mode"
                    sx={{
                      justifyContent:"right",
                      alignItems:"right",
                    }}
                  />
                  <List sx={{
                    marginLeft: '5px'
                  }}>
                    <ListItem button>
                      <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary="About us" />
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary="Contact Us" />
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary="About AfricTv" />
                    </ListItem>
                  </List>
                   <Divider />
                  <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        marginTop:"3px"
                      }}
                    >
                    <Donate 
                      sx={{
                      width: 230,
                        background: 'linear-gradient(90deg, rgba(0, 51, 0, 1) 0%, rgba(0, 102, 0, 1) 50%, rgba(0, 153, 0, 1) 100%)',
                        color: 'white',
                        borderRadius: '10px',
                        height: '45px',
                       }}/>
                      <Button
                        variant="contained"
                        sx={{
                          background: 'linear-gradient(90deg, rgba(204, 0, 13, 1) 0%, rgba(212, 0, 0, 1) 50%, rgba(29, 4, 9, 1) 100%)',
                          color: 'white',
                          marginBottom: '1rem',
                          borderRadius: '10px',
                          height: '45px',
                          width: '70%',
                          marginTop:'5px',
                        }}
                        onClick={handleLogout}
                        disabled={isLoading}
                      >
                        {isLoggedIn ? 'Logout' : 'Logging out...'}
                      </Button>
                    </Box>

                </Drawer>
          
          </Box>

        ) : (
        <Box sx={{ flexGrow: 0, display:"flex" }}>
        <Button
            variant="contained"
            sx={{
              background: 'none',
              color: 'darkgreen',
              // display: { xs: 'block', md: 'inline-block' },
              borderRadius: '20px',
               display: { xs: 'none', md: 'flex' },
               margin: "2px",
               height: "35px",
               boxShadow:"none",
            }}
            // onClick={SignUpUsingGoogle}
          >
           About AfricTv
        </Button>  
        <Donate
             sx={{
              background: 'none',
              color: 'darkgreen',
              // display: { xs: 'block', md: 'inline-block' },
              borderRadius: '20px',
               display: { xs: 'none', md: 'flex' },
               margin: "2px",
               height: "35px",
               boxShadow:"none",
            }}
        /> 
        <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, rgba(0, 51, 0, 1) 0%, rgba(0, 102, 0, 1) 50%, rgba(0, 153, 0, 1) 100%)',
              color: 'white',
              borderRadius: '20px',
              //display: { xs: 'none', md: 'flex' },
              height: "35px",
            }}
            onClick={SignUpUsingGoogle}
          >
            Sign in
        </Button> 
         {/* <IconButton
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="black"
            >
              <MenuIcon />
            </IconButton>*/}
          </Box>
      )}
        </Toolbar>
      </Container>

    </AppBar>
  );
}
export default Header;