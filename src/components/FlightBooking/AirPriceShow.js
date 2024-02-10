


import React from 'react';
import { Grid, Box, Typography, Button, TextField } from '@mui/material';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { selectAirPriceData } from '../../redux/slices/airPriceSlice';
import { useSelector } from 'react-redux';

const AirPriceShow = () => {
  const airPriceData = useSelector(selectAirPriceData);
console.log(airPriceData)

// Function to calculate the total fare
  const calculateTotalFare = () => {
    if (airPriceData && airPriceData.Results && airPriceData.Results.length > 0) {
      const fares = airPriceData.Results[0].Fares;
      let totalFare = 0;

      fares.forEach((fare) => {
        totalFare += fare.BaseFare + fare.Tax + fare.OtherCharges+fare.ServiceFee + fare.Discount - fare.Discount;
      });

      return totalFare;
    }

    return 0;
  };


  const boxStyle = {
    width: '100%',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid white', // Add any additional styling you need
  };

  const customStyle = {
    fontWeight: 'bold',
  }

  return (
    <Box container sx={{padding:'10px',borderRadius:'5px',border:'1px solid white'}} >

<Box sx={{height:'50px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<Typography sx={{fontWeight:'bold',fontSize:'20px'}}>Fare Summary</Typography>

<KeyboardArrowDown/>

</Box>
<Box style={boxStyle}>
<Typography>Base fare</Typography>
<Typography style={customStyle}> {airPriceData.Results[0].Fares[0].BaseFare}</Typography>
</Box>
<Box style={boxStyle}>
<Typography>Taxes</Typography>
<Typography style={customStyle}> {airPriceData.Results[0].Fares[0].Tax}</Typography>
</Box>
<Box style={boxStyle}>
<Typography>AIT & VAT</Typography>
<Typography style={customStyle}> {airPriceData.Results[0].Fares[0].ServiceFee}</Typography>
</Box>
<Box style={boxStyle}>
<Typography>Other Charge & fees</Typography>
<Typography style={customStyle}> {airPriceData.Results[0].Fares[0].OtherCharges}</Typography>
</Box>
<Box style={boxStyle}>
<Typography>Discount</Typography>
<Typography style={customStyle}> {airPriceData.Results[0].Fares[0].Discount}</Typography>
</Box>
<Box style={boxStyle}>
<Typography>Grand Total</Typography>
<Typography style={customStyle}> {calculateTotalFare()}</Typography>
</Box>
{/* promo code box */}
<Box sx={{height:'80px',backgroundColor:'blue',padding:'10px'}}>
<Box sx={{display:'flex',justifyContent:'flex-start',color:'white'}}>
  <Typography>Apply Promo</Typography>
</Box>

<Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
  <TextField variant='standard' placeholder='Enter your Promo Code'/>
  <Button  variant='contained'>Apply</Button>
</Box>

</Box>


    </Box>
  );
}

export default AirPriceShow;
