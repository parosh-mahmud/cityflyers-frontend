// AirInput.js
import React from 'react';
import { Box, Grid, Popover, Stack, Typography, Button, Divider, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


const airports = [
  {
    code: 'DAC',
    city: 'Dhaka',
    country: 'Bangladesh',
    name: 'Hazrat Shahjalal International Airport',
  },
  {
    code: 'JSR',
    city: 'Jashore',
    country: 'Bangladesh',
    name: 'Jashore Airport',
  },
  {
    code: 'CXB',
    city: 'Coxs Bazar',
    country: 'Bangladesh',
    name: 'Coxs Bazar Airport',
  },
  {
    code: 'CGP',
    city: 'Chittagong',
    country: 'Bangladesh',
    name: 'Shah Amanat International Airport',
  },
  {
    code: 'SPD',
    city: 'Saidpur',
    country: 'Bangladesh',
    name: 'Saidpur Airport',
  },
  // Add more airports as needed.
];


const AirInput = ({
    isFirstChild,
     canRemove,
     journeyType,
  onAddCity,
  onRemoveCity,
  paperStyle,
  selectedFromAirport,
  selectedToAirport,
  handlePopoverClick,
  fromAnchorEl,
  toAnchorEl,
  handlePopoverClose,
  handleSearchQueryChange,
  searchQuery,
  searchedAirports,
  handleFromAirportSelect,
  handleToAirportSelect,
  handleDPopoverClick,
  dAnchorEl,
  handleDPopoverClose,
  selectedDate,
  dayOfWeek,
  handleDepartureDateChange,
  handleRPopoverClick,
  returnAnchorEl,
  handleRPopoverClose,
  returnDate,
  handleReturnDateChange,
  openModal,
  isModalOpen,
  closeModal,
  adults,
  children,
  infants,
  selectedClass,
  handleClassChange,
  classes,
   setAdults,
  setChildren,
  setInfants,
}) => {
   
  return (
    <Grid container spacing={1} style={{paddingBottom:'60px',width:'99%'}}>
        {/* item 1 */}
        <Grid item sm={12} xs={12} lg={6} md={6} direction='row'>
          <Box  style={paperStyle} >
             <Box onClick={(event) => handlePopoverClick(event, 'from')}  style={{ border:'1px solid #0067FF', width: 'calc(50% - 20px)',height: '90px', cursor: 'pointer',borderRadius:'5px'}}>
        <Stack direction="column"
  justifyContent="flex-start"
  alignItems="flex-start"
   style={{marginLeft:'10px',}}>
             
               <Typography style={{fontSize:'1em',display:'flex'}}
         >
                <FlightTakeoffIcon style={{color:'#0067FF'}} />
                <Typography>From</Typography>
              </Typography >
              <Typography  style={{fontWeight:'bold',fontSize:'20px'}} >
                {selectedFromAirport ? `${selectedFromAirport.city} - ${selectedFromAirport.code}` : 'Select an Airport'}
              </Typography>
              <Typography sx={{
          fontFamily: 'Poppins, sans-serif', fontSize:'12px' // Specify the font-family name defined in @font-face
        }}>
                {selectedFromAirport ? selectedFromAirport.name : 'Select an Airport'}
              </Typography>
            </Stack>

              </Box>

               {/* <Divider orientation="vertical" flexItem  /> */}
 <Box style={{ 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  width: '40px', // Adjust the width as needed
  height: '40px', // Adjust the height as needed
  position: 'relative', // Optional, if you need to position it relative to something
  zIndex: 1 
}}>
  <SwapHorizIcon style={{ 
    fontSize: '45px', // Adjust to your desired icon size
  }} />
</Box>

               <Popover
  open={Boolean(fromAnchorEl)}
  anchorEl={fromAnchorEl}
  onClose={handlePopoverClose}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
  transitionDuration={300}
>
  <div className={classes.popover}>
    <TextField
  type="text"
  placeholder="Type to search"
  variant='standard'
  value={searchQuery}
  onChange={handleSearchQueryChange}
  className={classes.input}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
  }}
/>

{/* Conditionally render airport lists */}
{searchQuery === '' ? (
  airports.map((airport, index) => (
    <div
      key={`${airport.code}-${index}`}
      onClick={() => handleToAirportSelect(airport)}
      className={classes.airportItem}
    >
      <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Box>
          <Typography fontWeight="bold">{airport.city}, {airport.country}</Typography>
          <Typography fontSize="15px">{airport.name}</Typography>
        </Box>
        <Box>
          <Typography fontWeight="bold">{airport.code}</Typography>
        </Box>
      </Box>
    </div>
  ))
) : (
  searchedAirports.map((airport, index) => (
    <div
      key={`${airport.code}-${index}`}
      onClick={() => handleFromAirportSelect(airport)}
      className={classes.airportItem}
    >
      <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Box>
          <Typography fontWeight="bold">{airport.city}, {airport.country}</Typography>
          <Typography fontSize="15px">{airport.name}</Typography>
        </Box>
        <Box>
          <Typography fontWeight="bold">{airport.code}</Typography>
        </Box>
      </Box>
    </div>
  ))
)}

  </div>
</Popover>

    <Box onClick={(event) => handlePopoverClick(event, 'to')}  style={{border:'1px solid #0067FF', width: 'calc(50% - 20px)',height: '90px', cursor: 'pointer',borderRadius:'5px' }}>
                
                 <Stack direction="column"
  justifyContent="flex-start"
  alignItems="baseline"
 style={{marginLeft:'10px'}}>
               <Typography style={{fontSize:'1em',display:'flex'}}>
                <FlightLandIcon style={{color:'#0067FF'}} />
                <Typography>To</Typography>
              </Typography>
              <Typography  style={{fontWeight:'bold',fontSize:'20px'}}>
                {selectedToAirport ? `${selectedToAirport.city} - ${selectedToAirport.code}` : 'Select an Airport'}
              </Typography>
              <Typography style={{fontSize:'12px'}}>
                {selectedToAirport ? selectedToAirport.name : 'Select an Airport'}
              </Typography>
            </Stack>

              </Box>
             <Popover
      open={Boolean(toAnchorEl)}
        anchorEl={toAnchorEl}
        onClose={handlePopoverClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transitionDuration={300} // Optional: Set transition duration for the fade effect
    >
      <div className={classes.popover}>
       <TextField
  type="text"
  placeholder="Type to search"
  variant='standard'
  value={searchQuery}
  onChange={handleSearchQueryChange}
  className={classes.input}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
  }}
/>

{/* Conditionally render airport lists */}
{searchQuery === '' ? (
  airports.map((airport, index) => (
    <div
      key={`${airport.code}-${index}`}
      onClick={() => handleToAirportSelect(airport)}
      className={classes.airportItem}
    >
      <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Box>
          <Typography fontWeight="bold">{airport.city}, {airport.country}</Typography>
          <Typography fontSize="15px">{airport.name}</Typography>
        </Box>
        <Box>
          <Typography fontWeight="bold">{airport.code}</Typography>
        </Box>
      </Box>
    </div>
  ))
) : (
  searchedAirports.map((airport, index) => (
    <div
      key={`${airport.code}-${index}`}
      onClick={() => handleFromAirportSelect(airport)}
      className={classes.airportItem}
    >
      <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Box>
          <Typography fontWeight="bold">{airport.city}, {airport.country}</Typography>
          <Typography fontSize="15px">{airport.name}</Typography>
        </Box>
        <Box>
          <Typography fontWeight="bold">{airport.code}</Typography>
        </Box>
      </Box>
    </div>
  ))
)}

      </div>
    </Popover>
          </Box>
        </Grid>

        {/* item 2 Departure and  return */}
        
        <Grid item sm={12} xs={12} lg={4} md={4}>
          <Box  style={paperStyle}>
             <Box onClick={handleDPopoverClick} style={{ borderRight:'none', border:'1px solid #0067FF',borderBottomLeftRadius:'5px',borderTopLeftRadius:'5px', width: '50%', height: '90px',  float: 'left',cursor:'pointer', boxSizing:'border-box' }}>
    <Box style={{display:'flex',}}>
       <CalendarMonthIcon style={{color:'#0067FF'}}/>
      <Typography>Travel Date</Typography>

   </Box>
    
   
    <LocalizationProvider dateAdapter={AdapterDayjs}>
       <Typography style={{fontSize:'22px',fontWeight:'bold'}}>{selectedDate.format('DD MMM YY')}</Typography>
         <Typography>{dayOfWeek}</Typography>
         
        
        
        </LocalizationProvider>
  </Box>

  <Popover
  open={Boolean(dAnchorEl)}
  anchorEl={dAnchorEl}
  onClose={handleDPopoverClose} // Close the Popover when it is clicked outside
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
>
  <div className={classes.popover}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate}
        onChange={handleDepartureDateChange}
        renderInput={(props) => <TextField {...props} />}
        adapter={AdapterDayjs}
      />
    </LocalizationProvider>
  </div>
</Popover>


         {/* return date */}

  <Box onClick={(event) => handleRPopoverClick(event)} style={{ width: '50%', height: '90px', float: 'left', boxSizing: 'border-box', border:'1px solid #0067FF', borderTopRightRadius:'5px', borderBottomRightRadius:'5px', borderLeft:'none', cursor:'pointer' }}>
  <Box style={{ display: 'flex' }}>
    <CalendarMonthIcon style={{color:'#0067FF'}} />
    <Typography>Return</Typography>
  </Box>
  {returnDate ? (
    <>
      <Typography style={{fontSize:'22px',fontWeight:'bold'}}>{returnDate.format('DD MMM YY')}</Typography>
      <Typography>{returnDate.format('dddd')}</Typography>
    </>
  ) : (
    <Typography style={{fontSize:'16px'}}>Tap here to add return date</Typography>
  )}
</Box>

<Popover
  open={Boolean(returnAnchorEl)}
  anchorEl={returnAnchorEl}
  onClose={handleRPopoverClose}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
>
  <div className={classes.popover}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={returnDate} // Use the returnDate state variable as the value for the DateCalendar
        onChange={handleReturnDateChange} // Call handleReturnDateChange when the user selects a return date
        renderInput={(props) => <TextField {...props} />}
        adapter={AdapterDayjs}
      />
    </LocalizationProvider>
  </div>
</Popover>


          </Box>
        </Grid>

        {/* item 3 */}
        <Grid item sm={12} xs={12} lg={2} md={2}>
          <Box  style={paperStyle}>
             {/* Travller class */}
           
<Box onClick={openModal} style={{ width: '100%', height: '90px', cursor: 'pointer', border: '1px solid #0067FF', borderRadius: '5px', boxSizing: 'border-box', padding: '10px' }}>
 {(isFirstChild || journeyType !== 'multicity') && (
    <>
      <Typography>Traveller & Class</Typography>
      <Typography style={{ fontSize: '22px', fontWeight: 'bold' }}>{`${adults + children + infants} Person${adults + children + infants > 1 ? 's' : ''}`}</Typography>
      <Typography style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{selectedClass}</Typography>
    </>
  )}
  
  {/* Conditionally show "Add Another City" and "Remove" for multi-city inputs */}
  {journeyType === 'multicity' && !isFirstChild && (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent:'center',alignItems:'center'  }}>
      <Typography fontSize="50px"  size='small' variant="outlined" onClick={onAddCity} style={{ flex: 1 }}>
        +
      </Typography>
      <Typography fontSize="50px" size='small' variant="outlined" onClick={onRemoveCity} style={{ flex: 1 }}>
        -
      </Typography>
    </Box>
  )}
</Box>


<Popover
  open={isModalOpen}
  onClose={closeModal}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
>
  <Box style={{ padding: 20, minWidth: 200,boxSizing:'border-box' }}>
    <Box style={{ marginBottom: 10 }}>
      <Typography>Adults</Typography>
      <Button onClick={() => setAdults(adults - 1)}>-</Button>
      {adults}
      <Button onClick={() => setAdults(adults + 1)}>+</Button>
    </Box>
    <Divider style={{ margin: '8px 0' }} />
    <Box style={{ marginBottom: 10 }}>
      <Typography>Children</Typography>
      <Button onClick={() => setChildren(children - 1)}>-</Button>
      {children}
      <Button onClick={() => setChildren(children + 1)}>+</Button>
    </Box>
    <Divider style={{ margin: '8px 0' }} />
    <Box style={{ marginBottom: 10 }}>
      <Typography>Infants</Typography>
      <Button onClick={() => setInfants(infants - 1)}>-</Button>
      {infants}
      <Button onClick={() => setInfants(infants + 1)}>+</Button>
    </Box>
<Divider style={{ margin: '8px 0' }} />
    <RadioGroup
    row
    aria-label="class"
    name="class"
    value={selectedClass}
    onChange={handleClassChange}
  >
    <FormControlLabel value="Economy" control={<Radio />} label="Economy" />
    <FormControlLabel value="Business" control={<Radio />} label="Business" />
  </RadioGroup>
    <Button variant="contained" color="primary"  onClick={closeModal}>
      Done
    </Button>
  </Box>
</Popover>
          </Box>

                  
        </Grid>
        </Grid>

  );
};

export default AirInput;
