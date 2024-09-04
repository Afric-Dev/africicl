import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
//ICONS
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import PsychologyIcon from '@mui/icons-material/Psychology';
//IMG
import AfricTV from '/img/AfricTv.png';  
//Componets
import Donate from "./Donate";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function AfricTv() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box 
    sx={{
      width:'80%',
      justifyContent:'center',
      alignItems:'center',
      margin:'auto',
      marginTop:'10%',
      display:{ xs: 'block', md: 'flex' },
    }}
    >
    <Box
    sx={{
      width: { xs: '95%', md: '50%' },
      margin:'10px'
    }}
    >
      <Typography
      sx={{
        borderRadius: '5px',
        fontSize: 40
      }}
      >
       The Launching of AfricTv
      </Typography>
      <Typography
      sx={{
        color:'gray'
      }}
      >
        Introducing AfricTv! Connect with people, businesses, and learning opportunities worldwide. Enjoy: - Global news and trends - Self-expression and connection - Marketplace and learning reserve - Safe and user-friendly environment And many more.....
      </Typography>
      <Box
        sx={{
          width: { xs: '95%', md: '50%' },
          display:'flex'
        }}
        >
        <Button
        sx={{
          background:'linear-gradient(90deg, rgba(0, 51, 0, 1) 0%, rgba(0, 102, 0, 1) 50%, rgba(0, 153, 0, 1) 100%)',
          color:'white',
          width: 200,
          justifyContent:'center',
          alignItems:'center',
          margin:'auto',
          marginLeft:'-5px'
        }}
         onClick={() => window.location.reload()}
        >Wait List</Button>
        <Donate
        sx={{
          background:'linear-gradient(90deg, rgba(204, 0, 13, 1) 0%, rgba(212, 0, 0, 1) 50%, rgba(29, 4, 9, 1) 100%)',
          color:'white',
          width: 100,
          justifyContent:'center',
          alignItems:'center',
          margin:'auto',
          marginLeft:'15px'
        }}

        />
        </Box>
    </Box>

  <img
    style={{
      height: '500px',
      width: '100%',
      maxWidth: '400px',
      borderRadius: '16px',
      border: '2px solid gray',
      objectFit: 'cover',
      display: 'block',
      margin: 'auto',
      marginTop:{ xs: 'none', md: '10px' },
    }}
    alt="AfricTv"
    src="/img/AfricTv.png"
  />
     
    </Box>
  );
}
