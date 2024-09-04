import * as React from 'react';
//MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from '@mui/material/useMediaQuery';
//Componets
import Donate from "./Donate";
import WhyDonate from "./WhyDonate";


const itemData = [
  {
    img: '/img/Nigeria.jpg',
    title: 'Nigeria',
  },
  {
    img: '/img/uk.jpg', 
    title: 'United Kingdom',
  },
  {
    img: '/img/ghana.jpg',
    title: 'Ghana',
  },
];



export default function FirstPage() {
  const isLaptop = useMediaQuery('(min-width: 1024px)');
  const isPhone = useMediaQuery('(max-width: 600px)');


  return (
    <>
    <Box
      sx={{
        display: 'flex',         
        flexDirection: 'column',  
        justifyContent: 'center',
        alignItems: 'center',    
        height: '60vh',
        marginTop:'15%',       
      }}
    >
    <Box
    sx={{display: 'flex'}}
    >
      <Typography
        width={{ xs: '85%', sm: '85%', md: '80%' }}
        fontSize={{ xs: 37, sm: 37, md: 60 }}
        sx={{
          color: 'darkgreen',
          textAlign: 'center',
          borderRadius: '5px',
          fontWeight: 'bold'
        }}
        gutterBottom
      >
       Afric
      </Typography>
      <Typography
        width={{ xs: '85%', sm: '85%', md: '80%' }}
        fontSize={{ xs: 37, sm: 37, md: 60 }}
        sx={{
          color: 'black',
          textAlign: 'center',
          borderRadius: '5px',
          fontWeight: 'bold'
        }}
        gutterBottom
      >
       ICL
      </Typography>
      </Box>
      <Typography
        width={{ xs: '85%', sm: '85%', md: '80%' }}
        fontSize={{ xs: 12, sm: 12, md: 20 }}
        sx={{
          color: 'black',
          textAlign: 'center',
          borderRadius: '5px',
          marginTop: '-2%',
        }}
        gutterBottom
      >
        A dynamic and innovative firm dedicated to turning ideas into reality and solving complex problems. We specialize in crafting creative solutions tailored to meet the unique challenges faced by businesses today.
      </Typography>
      <Box sx={{
          justifyContent:'center',
          alignItems:'center',
          margin:'auto',
          marginTop:'-5px',
          display:'flex',
        }}>
          <Donate 
          sx={{
              background: 'linear-gradient(90deg, rgba(0, 51, 0, 1) 0%, rgba(0, 102, 0, 1) 50%, rgba(0, 153, 0, 1) 100%)',
              color: 'white',
              borderRadius: '5px',
              height: '45px',
          }}
          />
          <WhyDonate/>
        </Box>
    </Box>

    <Box
      sx={{
        display: 'flex',         
        flexDirection: 'column',  
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',          
      }}
    >
      <Typography
        width={{ xs: '85%', sm: '85%', md: '80%' }}
        fontSize={{ xs: 15, sm: 15, md: 15 }}
        sx={{
          color: 'black',
          textAlign: 'center',
          borderRadius: '5px',
          marginTop: '-12%',
        }}
        gutterBottom
      >
              Currently Known in over three countries 
      </Typography>
        
      <ImageList sx={{  width: isLaptop ? 700 : isPhone ? 300 : 550, }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>

      </Box>

  </>


  );
}
