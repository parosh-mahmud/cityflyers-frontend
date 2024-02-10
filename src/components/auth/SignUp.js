import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Link,
  Typography,
  TextField,
} from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import CityLogo from '..//../assets/logos/CityLogo.png';
import { getAuth, createUserWithEmailAndPassword, sendSignInLinkToEmail } from 'firebase/auth';

const SignUp = ({ handleToggle }) => {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      console.error('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const auth = getAuth();

      // Step 1: Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Save additional user data to Firestore
      await axios.post('/api/user/registration', {
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        firstName: firstName,
        lastName: lastName,
      });

      // Local storage might not be the most secure way to store user info, consider alternatives.
      localStorage.setItem('userInfo', JSON.stringify(user));

      setLoading(false);
      history.push('/signin');
    } catch (error) {
      console.error('Error creating account', error);
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '550px', marginLeft: 'auto', marginRight: 'auto', color: 'black' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <IconButton onClick={handleToggle}>
          <KeyboardArrowLeft />
        </IconButton>
        <img src={CityLogo} alt="Company Logo" height={32} />
      </div>
    <TextField
    fullWidth
          required
          id="outlined-required"
          label="First Name"
          
        />

      <FormControl fullWidth>
        <InputLabel>Last Name</InputLabel>
        <Input placeholder="Enter your Last Name" onChange={(e) => setLastName(e.target.value)} />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Email</InputLabel>
        <Input placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Phone Number</InputLabel>
        <Input placeholder="Enter your Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
      </FormControl>

      {/* <FormControl fullWidth>
        <InputLabel>Phone Number</InputLabel>
        <PhoneInput
          defaultCountry="BD"
          useNationalFormatForDefaultCountryValue={true}
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={setPhoneNumber}
        />
      </FormControl> */}

      <FormControl fullWidth>
        <InputLabel>Password</InputLabel>
        <Input
          type={show ? 'text' : 'password'}
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Button variant="contained" color="primary" fullWidth style={{ marginTop: '15px' }} onClick={submitHandler} disabled={loading}>
        Signup
      </Button>
      <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
        <Link href="/forgot-password">Forgot password?</Link>
      </Typography>
    </div>
  );
};

export default SignUp;
