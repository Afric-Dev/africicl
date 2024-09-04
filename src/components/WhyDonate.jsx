import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
//Componets
import Donate from "./Donate";
const WhyDonate = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button 
      sx={{
          background: 'linear-gradient(90deg, rgba(204, 0, 13, 1) 0%, rgba(212, 0, 0, 1) 50%, rgba(29, 4, 9, 1) 100%)',
          margin:'3px',
          height: '45px',
          borderRadius:'5px'
      }}
      variant="contained" 
      onClick={handleClickOpen}>
        Why Donate?
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Why You Should Donate for AfricTv</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Donating to our startup developing a blogging application is an investment in fostering creativity and expanding digital expression. Blogging applications provide a platform for writers, thinkers, and creators to share their content with the world.   Your contribution can help us cover critical expenses such as app development, design, and hosting, allowing us to focus on building an intuitive and user-friendly platform. By supporting this project, you're helping to create a space where people can connect, share ideas, and make their voices heard in an increasingly digital world.  Every contribution, no matter how small, makes a difference.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Donate
          sx={{
              background: 'linear-gradient(90deg, rgba(0, 51, 0, 1) 0%, rgba(0, 102, 0, 1) 50%, rgba(0, 153, 0, 1) 100%)',
              color: 'white',
              borderRadius: '5px',
              height: '45px',
          }}
          />
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WhyDonate;
