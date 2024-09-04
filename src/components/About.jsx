import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
//ICONS
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import PsychologyIcon from '@mui/icons-material/Psychology';
//IMG
import Innovative from '/img/Innovative.jpg';
import Expert from '/img/Expert.jpg';
import Create from '/img/Create.jpg';

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

export default function About() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box 
    sx={{
      width:'80%',
      height:'100vh',
      justifyContent:'center',
      alignItems:'center',
      margin:'auto',
      marginTop:'10%'
    }}
    >
    <Box
    sx={{
      width: { xs: '95%', md: '50%' },
    }}
    >
      <Typography
      sx={{
        borderRadius: '5px',
        fontSize: 40
      }}
      >
        About Us
      </Typography>
      <Typography
      sx={{
        color:'gray'
      }}
      >
        A forward-thinking and innovative company focused on transforming ideas into reality and tackling complex challenges. We excel at developing creative solutions customized to address the unique needs of modern businesses.
      </Typography>
    </Box>
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display:{ xs: 'block', md: 'flex' }, width:'100%',  height: 500, }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', width: {xs: '100%', sm: '100%', md: '50%'}, textAlign:'left', marginTop:2 }}
      >
        <Tab
          sx={{ height: 150, border: '1.2px solid gray', borderRadius: '20px', width: '100%', margin:'5px', }}
          label={
            <>
              <Typography
              sx={{
                color:'black', 
                fontWeight:'bold',
                textAlign:'left',
              }}
              >
              <EmojiObjectsIcon/>
                Innovative Problem-Solvers
              </Typography>
              <Typography
              sx={{
                color:'gray',
                textAlign:'left',
                fontSize: 14,
              }}
              >
               We are a company dedicated to finding creative solutions for complex challenges. 
              </Typography>
            </>
          }
          {...a11yProps(0)}
        />
        <Tab 
        sx={{ height: 150, border: '1.2px solid gray', borderRadius: '20px', width: '100%', margin:'5px' }}
          label={
            <>
              <Typography
              sx={{
                color:'black', 
                fontWeight:'bold',
                textAlign:'left'
              }}
              ><PsychologyIcon/> Experts in Problem Resolution
              </Typography>
              <Typography
              sx={{
                color:'gray',
                textAlign:'left',
                fontSize: 14,
              }}
              >
              At the core of our business is a passion for solving problems. 
              </Typography>

            </>
          }
         {...a11yProps(1)} />
        <Tab
          sx={{ height: 150, border: '1.2px solid gray', borderRadius: '20px', width: '100%', margin:'5px' }}
          label={
            <>
              <Typography
              sx={{
                color:'black', 
                fontWeight:'bold',
                textAlign:'left'
              }}
              > <TipsAndUpdatesIcon/>
               Solving Problems, Creating Value
              </Typography>
              <Typography
              sx={{
                color:'gray',
                textAlign:'left',
                fontSize: 14,
              }}
              >Our company is driven by the desire to solve problems and create value for our clients.
              </Typography>
            </>
          }
         {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
           <Box
              component="img"
              sx={{
                height: 500,
                width: { xs: 300, md: 400 },
                borderRadius: '16px',
                border: '2px solid gray',
                objectFit: 'cover',
                justifyContent:'center',
                alignItems:'center',
                margin:'auto',
              }}
              alt="Innovative"
              src={Innovative}
            />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box
              component="img"
              sx={{
                height: 500,
                width: { xs: 300, md: 400 },
                borderRadius: '16px',
                border: '2px solid gray',
                objectFit: 'cover',
                justifyContent:'center',
                alignItems:'center',
                margin:'auto',
              }}
              alt="Expert"
              src={Expert}
            />
      </TabPanel>
      <TabPanel value={value} index={2}>
           <Box
              component="img"
              sx={{
                height: 500,
                width: { xs: 300, md: 400 },
                borderRadius: '16px',
                border: '2px solid gray',
                objectFit: 'cover',
                justifyContent:'center',
                alignItems:'center',
                margin:'auto',
              }}
              alt="Create"
              src={Create}
            />
      </TabPanel>
    </Box>
    </Box>
  );
}
