import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
//Firebase
import { db } from "../backend/Firebase";
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
//Componets
import Donate from "./Donate";
import WhyDonate from "./WhyDonate";
//Sweet Alart
import Swal from 'sweetalert2';
const initialState = {
  firstname: "",
  lastname: "",
  email: "",
}

function Popup() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState(initialState);
  const { firstname, lastname, email } = data;

  // Automatically open the modal 3 seconds after page refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 3000); // 3000ms = 3 seconds

    // Clean up the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  //Logic for Waitlist (firebase)
  const validate = () => {
    let errors = {};
    if (!firstname) {
      errors.firstname = "FirstName is Required";
    }
    if (!lastname) {
      errors.lastname = "Lastname is Required";
    }
    if (!email) {
      errors.email = "Email is Required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true);
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);

    setIsSubmit(true);
    await addDoc(collection(db, "waitlist"), {
      ...data,
      timestamp: serverTimestamp()
    });
    setLoading(false);
    Swal.fire({
      title: 'Waitlist Uploaded Successfully. You will get feedback soon! Thank you',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
    setOpen(false);
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };



  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="auto-popup-form-title"
        aria-describedby="auto-popup-form-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', md: '40%' }, // Responsive width
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        > <form  onSubmit={handleSubmit}>
        <Box    sx={{
            display: 'flex',        
            justifyContent: 'space-between',  
            alignItems: 'center',       
            margin: 'auto',           
          }}>
          <Typography id="auto-popup-form-title" variant="h6" component="h2" mb={2}>
           Join AfricTv Wait list
          </Typography>
          <Donate sx={{ width:100 }}/>
          </Box>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            variant="outlined"
            name="firstname"
            value={firstname}
            onChange={handleChange}
            error={Boolean(errors.firstname)}
            helperText={errors.firstname}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            variant="outlined"
            name="lastname"
            value={lastname}
            onChange={handleChange}
            error={Boolean(errors.lastname)}
            helperText={errors.lastname}
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            name="email"
            value={email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <Box mt={3} display="flex" justifyContent="space-between">
          
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
            sx={{
              background: 'linear-gradient(90deg, rgba(0, 51, 0, 1) 0%, rgba(0, 102, 0, 1) 50%, rgba(0, 153, 0, 1) 100%)',
              color:'white',
              width:'70%'
            }}
            type="submit" 
            variant="contained">
             {loading ? <CircularProgress sx={{ justifyContent: "center", color: "rgba(3, 0, 15, 1)" }} /> : (
              'Submit'
            )}
            </Button>

          </Box>
           </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Popup;
