// Login.js

import React, { useState } from 'react';
import { useAuth } from '../../firebaseconfig';
import SignUp from './SignUp';
import LayoutPage from '../../pages/LayoutPage';

import {
  FormControl,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Link,
} from '@mui/material';
import GoogleLogo from '../../assets/logos/GoogleLogo.png';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = ({ handleToggle }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { signInWithGoogle } = useAuth();

  const handleClick = () => setShowPassword(!showPassword);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        // Handle empty fields
        console.error('Please fill in all fields');
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post('http://localhost:5000/api/user/login', { email, password }, config);
      
      // Handle successful login
      console.log('Login successful:', data);
      localStorage.setItem('userInfo', JSON.stringify(data));

      history.push('/testSearch');
      // Clear the form fields
      setEmail('');
      setPassword('');
    } catch (error) {
      // Handle login error
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleComponent = () => {
    setShowLogin(!showLogin);
  };

  return (
    <LayoutPage>
      <form>
        <div style={{ width: '550px', marginTop: '70px', marginLeft: 'auto', marginRight: 'auto', color: 'black' }}>
          {showLogin ? (
            <>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleGoogleSignIn}
                style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}
              >
                <img src={GoogleLogo} alt="Google Logo" width="20" height="20" style={{ marginRight: '10px' }} />
                Login with Google
              </Button>
              <FormControl fullWidth>
                <TextField
                  label="Email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClick}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '15px' }}
                onClick={submitHandler}
                disabled={loading}
              >
                Login
              </Button>
              <FormControl >
                {showLogin ? (
                  <Link sx={{ color: 'black', cursor: 'pointer' }} onClick={toggleComponent}>Don't have an Account? Sign Up.</Link>
                ) : (
                  <Link onClick={handleToggle}>Already have an account? Log In.</Link>
                )}
              </FormControl>
            </>
          ) : (
            <>
              <SignUp handleToggle={toggleComponent} />
            </>
          )}
        </div>
      </form>
    </LayoutPage>
  );
};

export default Login;
