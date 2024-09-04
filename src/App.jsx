import { useState } from 'react'
//Components
import Header from "./components/Header";
import Popup from "./components/Popup";
import First from "./components/First";
import About from "./components/About";
import AfricTv from "./components/AfricTv";

//MUI
import Box from '@mui/material/Box';
//IMG
import bg from "/img/bgnew.jpg";

function App() {
 

  return (
    <Box>
    <Header/>
    <Popup/>
    <First/>
    <AfricTv/>
    <About/>
    </Box>
  )
}

export default App
