import React, { useState } from 'react';
import { Box, Grid, TextField, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Button, Checkbox } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAirPreBookResults } from '../../redux/slices/airPreBookSlice';
import { selectSearchIDResultID } from '../../redux/slices/searchIDResultIDSlice';
import { useHistory } from 'react-router-dom';
import { setPassengerDetails } from '../../redux/slices/passengerDetailsSlice';


const PassengerDetailsForm = () => {
  const { searchId, resultId } = useSelector(selectSearchIDResultID);
  console.log('searchId', searchId);
  console.log('resultId', resultId);
  const [gender, setGender] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const [passengerDetailsFormData, setPassengerDetailsFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: null,
    passportNumber: '',
    dateOfExpiry: '',
    nationality: '',
    addToTravellerList: false,
    emailAddress: 'thecityflyers@gmail.com',
    phoneNumber: '',
    address: '',
    fareRulesChecked: false,
    termsAndConditionsChecked: false,
  });

  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;

    setPassengerDetailsFormData((prevData) => ({
      ...prevData,
      gender: selectedGender,
    }));
  };

  const handleDateOfBirthChange = (date) => {
    const formattedDate = date.format('YYYY-MM-DD');

    setPassengerDetailsFormData((prevData) => ({
      ...prevData,
      dateOfBirth: formattedDate,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPassengerDetailsFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const formatFormDataForRequest = () => {
    const {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      passportNumber,
      dateOfExpiry,
      nationality,
      addToTravellerList,
      emailAddress,
      phoneNumber,
      address,
      fareRulesChecked,
      termsAndConditionsChecked,
    } = passengerDetailsFormData;

    const title = gender === 'male' ? 'Mr' : 'Mrs';

    const passenger = {
      Title: title,
      FirstName: firstName,
      LastName: lastName,
      PaxType: 'Adult',
      DateOfBirth: dateOfBirth,
      Gender: gender,
      Address1: address, // Use the address field
      CountryCode: 'BD',
      Nationality: nationality,
      ContactNumber: phoneNumber,
      Email: emailAddress,
      IsLeadPassenger: true,
    };

    const requestData = {
      SearchID: searchId,
      ResultID: resultId,
      Passengers: [passenger],
    };

    return requestData;
  };

   const handleContinue = async () => {
    try {
      const updatedFormData = formatFormDataForRequest();
       await dispatch(fetchAirPreBookResults(updatedFormData));
       // Log the API response data in the AirBookForm component
       
       // Dispatch the updatedFormData to the passengerDetailsSlice
      dispatch(setPassengerDetails(updatedFormData));
      history.push('/airbook');
    } catch (error) {
      console.error('Error dispatching thunk action:', error.message);
    }
  };

  
  return (
    <div >
      <Box >

      <Box sx={{backgroundColor:'#5e9179',minHeight:'40px',width:'auto',display:'flex',overflow:'hidden',border:'1px solid white',borderRadius:'2px'}}>

      <Box sx={{display:'flex',marginRight:'20px'}}> 
      <Typography>
        <ManageAccountsIcon/>
      </Typography>
      <Typography>Passenger Details</Typography>
      </Box>

      <Box>
      <Typography sx={{color:'red'}}>Specify the details as per the passport</Typography>
      </Box>

      </Box>


        <Box sx={{ backgroundColor: 'rgba(255,255,255,0.5)', display: 'flex', flexDirection: 'column' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField 
                 onChange={(e) => setPassengerDetailsFormData((prevData) => ({ ...prevData, firstName: e.target.value }))}
                  fullWidth id="outlined-basic" 
                  label="First name/Given name" 
                  variant="outlined" 
                  placeholder="Enter your first name" />
            </Grid>
            <Grid item xs={12} sm={3}>
               <TextField
                fullWidth
                id="outlined-basic"
                label="Last name/Surname"
                variant="outlined"
                placeholder="Enter your last name"
                onChange={(e) => setPassengerDetailsFormData((prevData) => ({ ...prevData, lastName: e.target.value }))}
              />
            </Grid>
          <Grid item xs={12} sm={3}>
              <Typography sx={{display:'flex',justifyContent:'flex-start'}} variant="body1">Gender</Typography>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender"
                  value={passengerDetailsFormData.gender} 
                   onChange={handleGenderChange}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker fullWidth value={passengerDetailsFormData.dateOfBirth} onChange={handleDateOfBirthChange}  label="Date of Birth" />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                placeholder="Enter your Passport number"
                id="outlined-basic-5"
                label="Passport number"
                variant="outlined"
                onChange={(e) => setPassengerDetailsFormData((prevData) => ({ ...prevData, passportNumber: e.target.value }))}
              />            </Grid>
            
            <Grid item xs={12} sm={3}>
                <TextField
                fullWidth
                id="outlined-basic-6"
                label="Date of Expiry"
                variant="outlined"
                placeholder="Enter your Date of Expiration"
                onChange={(e) => setPassengerDetailsFormData((prevData) => ({ ...prevData, dateOfExpiry: e.target.value }))}
              />           
               </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                id="outlined-basic-6"
                label="Nationality"
                variant="outlined"
                placeholder="Enter your Nationality"
                onChange={(e) => setPassengerDetailsFormData((prevData) => ({ ...prevData, nationality: e.target.value }))}
              />            
              </Grid>
          </Grid>
          
      {/* checkbox */}
      <Box sx={{backgroundColor:'#5e9179',minHeight:'40px',width:'auto',display:'flex',overflow:'hidden',border:'1px solid white',borderRadius:'2px'}}>

      <Box sx={{display:'flex',marginRight:'20px',justifyContent:'center',alignItems:'center'}}> 
      <Checkbox
                checked={passengerDetailsFormData.addToTravellerList}
                
                onChange={(e) =>
                  setPassengerDetailsFormData((prevData) => ({ ...prevData, addToTravellerList: e.target.checked }))
                }
              />
      <Typography sx={{fontStyle:'italic'}}>Add this traveller to my traveller list. You won't have to fill traveller info on your next visit</Typography>
      </Box>

      </Box>

        <Box>
          
    <Box>
  <Grid container spacing={2}>
    <Grid item xs={12} sm={3}>
      <Box sx={{ height: 'auto', overflow: 'hidden' }}>
       <TextField
                      id="outlined-basic-6"
                      label="Email Address"
                      variant="outlined"
                      fullWidth
                      placeholder="Enter your Email"
                      onChange={(e) => setPassengerDetailsFormData((prevData) => ({ ...prevData, emailAddress: e.target.value }))}
                    />
      </Box>
    </Grid>
    <Grid item xs={12} sm={3}>
      <Box sx={{ height: 'auto', overflow: 'hidden' }}>
         <TextField
                      id="outlined-basic-6"
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      placeholder="Enter your Phone Number"
                      onChange={(e) => setPassengerDetailsFormData((prevData) => ({ ...prevData, phoneNumber: e.target.value }))}
                    />
      </Box>
    </Grid>

    <Grid item xs={12} sm={3}>
      <Box sx={{ height: 'auto', overflow: 'hidden' }}>
         <TextField
            fullWidth
            id="outlined-basic-7"
            label="Address"
            variant="outlined"
            placeholder="Enter your address"
            onChange={(e) => setPassengerDetailsFormData((prevData) => ({ ...prevData, address: e.target.value }))}
          />
      </Box>
    </Grid>

    <Grid item xs={12} sm={3}>
      <Box sx={{ height: 'auto', overflow: 'hidden' }}>
        <Typography variant='body2' sx={{width:'auto',height:'auto',backgroundColor:'#E4CCB6',color:'#D84638'}}>*Important: The airline fee is indicative. 
City Flyers does not guarantee the 
accuracy of this information. All fees 
mentioned are per passenger.
</Typography>
      </Box>
    </Grid>

  </Grid>
</Box>
      </Box>

      <Box sx={{justifyContent:'left',alignItems:'flex-start',display:'flex',flexDirection:'column'}}>
      <Box sx={{display:'flex',marginRight:'20px',justifyContent:'center',alignItems:'center'}}> 
      <Checkbox defaultChecked/>
      <Typography>I have read and understood the Fare Rules</Typography>
      </Box>
      <Box sx={{display:'flex',marginRight:'20px',justifyContent:'center',alignItems:'center'}}> 
      <Checkbox defaultChecked/>
      <Typography>I have read and aggreed to the Terms and Conditions</Typography>
      </Box>
       <Button variant="contained" onClick={handleContinue}>Continue</Button>
       </Box>
        </Box>

        
      </Box>

    </div>
    
  );
};

export default PassengerDetailsForm;
