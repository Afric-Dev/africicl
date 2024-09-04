import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
//Paystack
import { PaystackButton } from 'react-paystack';
import { db } from "../backend/Firebase";
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';

const initialState = {
  name: "",
  phone: "",
  email: "",
  amount: "",
}
function Donate(props) {
  // State to control the dialog open/close
  const [donate, setDonate] = useState(false);
  const publicKey = "pk_live_406f3af24f5cde787d5a11ec2e69a364d95ab942";
  const [ email, setEmail ] = useState("");
  const [ amount, setAmount ] = useState("");
  const [ name, setName ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState(initialState);
  const { sx } = props;

    const componentProps = {
    email,
    amount: amount * 100,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for donating to us! we do not take it for granted!!"),
    onClose: () => alert("Wait! You need to donate, don't go!!!!"),
  }


  // Function to open the dialog
  const handleClickOpen = () => {
    setDonate(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setDonate(false);
  };

  //Logic for donate (firebase)
  const validate = () => {
    let errors = {};
    if (!name) {
      errors.name = "Name is Required";
    }
    if (!phone) {
      errors.phone = "Phone Number is Required";
    }
    if (!email) {
      errors.email = "Email is Required";
    }
    if (!amount) {
      errors.amount = "Amount is Required";
    }

    return errors;
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true);
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);

    setIsSubmit(true);
    await addDoc(collection(db, "donations"), {
      ...data,
      timestamp: serverTimestamp()
    });
    setLoading(false);
    // Swal.fire({
    //   title: 'Waitlist Uploaded Successfully. You will get feedback soon! Thank you',
    //   icon: 'success',
    //   confirmButtonText: 'Ok'
    // });
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  return (
    <div>
      {/* Button to trigger the Donate form */}
      <Button
              variant="contained"
              sx={{
              ...sx,
            }}
          onClick={handleClickOpen}
      >
         Kindly Donate
        </Button>

      {/* Dialog (Pop-up form) */}
      <Dialog open={donate} onClose={handleClose}>
        <DialogTitle>Kindly Donate</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Full Name"
              type="text"
              fullWidth
              variant="outlined"
              value={name} 
              onChange={(e) => setName(e.target.value)}

              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <TextField
              autoFocus
              margin="dense"
              id="phone"
              label="Phone Number"
              type="number"
              fullWidth
              variant="outlined"
              value={phone} onChange={(e) => setPhone(e.target.value)}

              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errors.email)}
            helperText={errors.email}
            />
            <TextField
              margin="dense"
              id="amount"
              label="Donation Amount"
              type="number"
              fullWidth
              variant="outlined"
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
            error={Boolean(errors.amount)}
            helperText={errors.amount}
            />
             <Box
              sx={{
                width: 'fit-content',
                justifyContent:'center',
                alignItems:'center',
                margin:'auto',
                padding: '8px 16px',
                backgroundColor: '#007bff',
                borderRadius: '8px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'linear-gradient(90deg, rgba(0, 51, 0, 1) 0%, rgba(0, 102, 0, 1) 50%, rgba(0, 153, 0, 1) 100%)',
                },
              }}
            >
              <PaystackButton  {...componentProps} />
            </Box>
      </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default Donate;
