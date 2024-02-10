import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Link,
  Typography,
} from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import CityLogo from '..//../assets/logos/CityLogo.png';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = ({ handleToggle }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);

    if (!email) {
      console.error('Please enter your email');
      setLoading(false);
      return;
    }

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);

      // The password reset email has been sent successfully
      console.log('Password reset email sent successfully');

      setLoading(false);
      history.push('/signin');
    } catch (error) {
      console.error('Error sending password reset email', error);
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

      <FormControl fullWidth>
        <InputLabel>Email</InputLabel>
        <Input placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>

      <Button variant="contained" color="primary" fullWidth style={{ marginTop: '15px' }} onClick={submitHandler} disabled={loading}>
        Reset Password
      </Button>

      <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
        <Link href="/signin">Remember your password? Sign in.</Link>
      </Typography>
    </div>
  );
};

export default ForgotPassword;
