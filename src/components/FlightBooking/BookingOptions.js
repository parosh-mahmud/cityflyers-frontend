import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const BookingOptions = ({ handleDownloadPDF }) => {
  const boxStyle = {
    width: '100%',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    marginBottom: '20px',
    padding: '10px',
    
    
    color: 'white',
  };

  const customStyle = {
    fontWeight: 'bold',
    color:'white',
    
  };

  return (
    <>
      <Box
        
        sx={{
          borderRadius: '5px',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '90%',
        }}
      >
        <Box
          sx={{
            height: '50px',
            width:'auto',
            backgroundColor: '#2B2B2B',
            display: 'flex',
            flexDirection: 'column',
            
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <Box sx={{height:'20px',width:'auto'}}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '20px', color: 'white', }}>History</Typography>

          </Box>

          <Box sx={{height:'80px',width:'auto',backgroundColor:'green'}}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px', color: 'white', }}>History</Typography>
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px', color: 'white', }}>History</Typography>
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px', color: 'white', }}>History</Typography>
          </Box>
          
        </Box>
        <Box style={boxStyle}>
          <Button style={customStyle} fullWidth variant="contained">
            Pay now
          </Button>
         
        </Box>
        <Box style={boxStyle}>
          <Button style={customStyle} fullWidth variant="contained" onClick={() => handleDownloadPDF()}>
            Print & Download
          </Button>
        </Box>
        <Box style={boxStyle}>
          <Button style={customStyle} fullWidth variant="contained">
            Ancillary Services
          </Button>
        </Box>
        <Box style={boxStyle}>
          <Button style={customStyle} fullWidth variant="contained">
            Upload docs
          </Button>
        </Box>
        <Box style={boxStyle}>
          <Button style={customStyle} fullWidth variant="contained">
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default BookingOptions;
