import React, { useEffect, useState,useRef } from 'react';
import { Grid, Paper, Typography, Radio, RadioGroup, FormControlLabel, Button, Stack, Popover, TextField, Box, CircularProgress, Backdrop, IconButton, Icon } from '@mui/material';
import { useDispatch } from 'react-redux';
// import { fetchFlightResults } from '..//../redux/actions/newFlightAction';
import Divider from '@mui/material/Divider';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SyncIcon from '@mui/icons-material/Sync';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import fetchAirports from '../../services/api';
import { makeStyles } from '@mui/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import '..//../index.css'
import '@fontsource/poppins';
import { fetchFlightResults } from '../../redux/reducers/flightSlice';
import './style.css'
import AirInput from './AirInput';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CallSplitIcon from '@mui/icons-material/CallSplit';

// First airport object from the airports array
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
  
  // You can add more airport data as needed.
];



const useStyles = makeStyles((theme) => ({

  popover: {
    backgroundColor: '#fff',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    minWidth: '400px',
    transition: 'opacity 0.3s ease-in-out', // Add transition for opacity
    opacity: 1, // Start with opacity 1 for the fade-in effect

    '&:hover': {
      opacity: 1, // Ensure opacity stays 1 on hover
    },
  },
  input: {
    width: '100%',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0.5),
    border: '1px solid #ccc',
    borderRadius: theme.spacing(0.5),
  },
  airportItem: {
    cursor: 'pointer',
    marginBottom: theme.spacing(1),
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));


  const gridContainerStyle = {
    // borderRadius: '10px', // Border radius of 10px
    backgroundColor: 'rgba(255,255,255,0.5)', // Background
    overflow: 'hidden', // Optional: To ensure children elements don't overflow outside the border radius
    // padding: '50px',
    // marginTop: '5px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', // Custom box-shadow to replace Paper's default shadow
    margin:'0',
    
    borderBottomLeftRadius:'5px',
    borderBottomRightRadius:'5px',
   
   
    

    
  
  };

  const paperStyle = {
    paddingLeft: '10px', // Ensure there's no extra padding interfering with the border-radius
    margin: 0, // Ensure there's no margin interfering with the border-radius
    display:'flex', 
    alignItems:'center',
    
    
  };

export const SearchForm =  ({ searchButtonLabel}) => {
  
 const [selectedOption, setSelectedOption] = useState('oneway');
  const [selectedFromAirport, setSelectedFromAirport] = useState(airports[0]);
   const [selectedToAirport, setSelectedToAirport] = useState(airports[1]);
  const [searchedAirports, setSearchedAirports] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [fromAnchorEl, setFromAnchorEl] = useState(null); // Separate state for "From" Popover
  const [toAnchorEl, setToAnchorEl] = useState(null); 
const classes = useStyles();
const [selectedDate, setSelectedDate] = useState(dayjs().add(3, 'day')); // Default date: current date + 3 days
  const [dayOfWeek, setDayOfWeek] = useState(selectedDate.format('dddd')); 
  const [dAnchorEl, setDanchorEl] = useState(null);
  const [returnAnchorEl, setReturnAnchorEl] = useState(null);
// const [returnDate, setReturnDate] = useState(dayjs().add(7, 'day')); // Default return date: current date + 7 days
const [returnDayOfWeek, setReturnDayOfWeek] = useState('');
const [returnDatePopoverOpen, setReturnDatePopoverOpen] = useState(false);
const [adults, setAdults] = useState(1);
const [children, setChildren] = useState(0);
const [infants, setInfants] = useState(0);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedClass, setSelectedClass] = useState('Economy');
const dispatch = useDispatch();
const history = useHistory();
const [isFetching, setIsFetching] = useState(false);
const [returnDate, setReturnDate] = useState(null);
const [airInputs, setAirInputs] = useState([{ id: 1 }]);

const handleAddAirInput = () => {
  if (selectedOption === 'multicity') {
    setAirInputs([...airInputs, { id: airInputs.length + 1 }]);
  }
};


const [formData, setFormData] = useState({
    AdultQuantity: 1,
    ChildQuantity: 0,
    InfantQuantity: 0,
    EndUserIp: "103.124.251.147",
    JourneyType: "1",
    Segments: [
      {
        Origin: "DAC",
        Destination: "JSR",
        CabinClass: "1",
       DepartureDateTime: "2023-10-20",
      },
    ],
  });


 const handleAddCity = () => {
  setAirInputs([...airInputs, { id: airInputs.length + 1 }]);
};

const handleRemoveCity = (id) => {
  setAirInputs(airInputs.filter(input => input.id !== id));
};


const handleReturnDateChange = (date) => {
  // Close the return date popover after selecting a date
  setReturnAnchorEl(null);

  // Update the return date with the selected date from the return calendar
  setReturnDate(date);

  // Get the day of the week for the selected return date
  const dayOfWeek = date.format('dddd');

  // Update the state with the day of the week for the return date
  setReturnDayOfWeek(dayOfWeek);

  // You can perform additional actions with the selected return date if needed
};



const handleClassChange = (event) => {
  setSelectedClass(event.target.value);
};
const handleRPopoverClose = () => {
    setReturnDatePopoverOpen(false);
    setReturnAnchorEl(null);
  };

   const handleDPopoverClose = () => {
    setDanchorEl(null);
  };
const openModal = () => {
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
};

const handleDepartureDateChange = (date) => {
  setSelectedDate(date);
  setDayOfWeek(date.format('dddd'));
  setDanchorEl(null); // Close the Popover after selecting a date
};

function CustomIconButton({ value, selectedValue, onChange, Icon, label }) {
  const isSelected = selectedValue === value; // Check if the button is selected

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: '16px', // Adjust spacing as needed
        marginBottom: '10px',
        marginTop:'10px',
        backgroundColor: isSelected ? '#0067FF' : 'transparent', // Change background color if selected
        color: isSelected ? '#fff' : 'inherit', // Change text color if selected
        padding: '6px 12px', // Add some padding
        borderRadius: '5px', // Rounded corners
        border: isSelected ? '1px solid #0067FF' : '1px solid transparent', // Change border color if selected
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: isSelected ? '#0056cc' : '#f0f0f0', // Darker blue on hover if selected, light grey otherwise
          borderColor: isSelected ? '#0056cc' : '#ccc', // Adjust border color on hover
        },
        transition: 'background-color 0.3s ease, border-color 0.3s ease', // Smooth transition for background and border color
        
      }}
      onClick={() => onChange(value)}
    >
      
      <Icon  color={isSelected ? 'inherit' : 'action'} />
      
      
      <Typography
        variant="caption"
        sx={{
          marginLeft: '8px',
          color: 'inherit', // Ensure the text color inherits from the Box
          fontSize: '14px', // Adjust font size as needed
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

  const handleDPopoverClick = (event) => {
  setDanchorEl(event.currentTarget);
};

   const handlePopoverClose = () => {
    setFromAnchorEl(null);
    setToAnchorEl(null);
  };

  const handleFromAirportSelect = (airport) => {
    setSelectedFromAirport(airport);
    handlePopoverClose();
  };
const handleToAirportSelect = (airport) => {
  setSelectedToAirport(airport);
  handlePopoverClose();
};

 const handlePopoverClick = (event, anchor) => {
  if (anchor === 'from') {
    setFromAnchorEl(event.currentTarget);
  } else if (anchor === 'to') {
    setToAnchorEl(event.currentTarget);
  } else if (anchor === 'return') {
    setReturnAnchorEl(event.currentTarget);
    setSelectedOption('return'); // Set selected option to 'return'
  }
};

 const handleRPopoverClick = (event) => {
    setReturnDatePopoverOpen(true);
    setReturnAnchorEl(event.currentTarget);
    setSelectedOption('return'); // Set selected option to 'return' when clicking on the Return div
  };

  const handleSearchQueryChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value); // Update the searchQuery state as you type
    console.log(`Search query: ${value}`);
  };

  const open = Boolean(anchorEl);



const [journeyType, setJourneyType] = useState('oneway'); // Keep track of the journey type

const handleOptionChange = (newValue) => {
  setJourneyType(newValue); // or setSelectedOption(newValue) if using selectedOption
setSelectedOption(newValue);
  if (newValue === 'multicity') {
    // Logic for initializing multi-city inputs
   if (airInputs.length < 2) { // Ensure there's at least two inputs for multi-city
      setAirInputs([{ id: 1 }, { id: 2 }]);
    }
  } else {
    // Reset to default for one-way and return, ensuring at least one input
    setAirInputs([{ id: 1 }]);
  }
};




  const handleFetchAirports = async () => {
    try {
      const airportData = await fetchAirports(searchQuery);
      console.log('API response:', airportData);
      // Update state or perform actions with the fetched airport data
    
      // Update searchedAirports with the fetched data
      setSearchedAirports(airportData);} catch (error) {
      console.error(error.message);
    }
  };
useEffect(() => {
  if (!searchQuery) {
    // If searchQuery is empty, clear the searchedAirports and return to stop useEffect
    setSearchedAirports([]);
    return;
  }

  // Only fetch data when searchQuery is not empty
  handleFetchAirports();
}, [searchQuery]);

 const handleFormData = async () => {
    // Create a new object to hold the updated form data
    let updatedFormData = {
      AdultQuantity: adults, // Assuming you have a state for adults
      ChildQuantity: children, // Assuming you have a state for children
      InfantQuantity: infants, // Assuming you have a state for infants
      EndUserIp: "103.124.251.147", // This can be dynamically obtained or kept static as in your example
      JourneyType: selectedOption === 'oneway' ? '1' : '2', // '1' for one-way, '2' for return
      Segments: [
        {
          Origin: selectedFromAirport.code,
          Destination: selectedToAirport.code,
          CabinClass: selectedClass === 'Economy' ? '1' : '2', // Assuming '1' for Economy and '2' for Business class
          DepartureDateTime: selectedDate.format('YYYY-MM-DD'),
        },
      ],
    };

    // If the journey type is 'return', add the return segment to the formData
    if (selectedOption === 'return') {
      updatedFormData.Segments.push({
        Origin: selectedToAirport.code,
        Destination: selectedFromAirport.code,
        CabinClass: selectedClass === 'Economy' ? '1' : '2', // Same assumption as above
        DepartureDateTime: returnDate.format('YYYY-MM-DD'),
      });
    }

    try {
      setIsFetching(true);
      // Dispatch the updated form data to Redux using the thunk action
      await dispatch(fetchFlightResults(updatedFormData));

      // Use history.push to navigate to the FlightResults page with the form data
      history.push('/flight-results');
    } catch (error) {
      console.error('Error dispatching thunk action:', error.message);
    } finally {
      // Set the backdrop to be invisible, regardless of success or failure
      setIsFetching(false);
    }
};

  
  return (



<>

<Grid container    style={gridContainerStyle}>
      {/* First Inner Grid */}
      <Grid item>
       
           <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: '20px'
      }}
      aria-label="journey-type"
      name="journey-type"
    >
      <CustomIconButton
        value="oneway"
        selectedValue={selectedOption}
        onChange={() => handleOptionChange('oneway')}
        Icon={KeyboardBackspaceIcon}
        label="One-way"
      />
      <CustomIconButton
        value="return"
        selectedValue={selectedOption}
        onChange={() => handleOptionChange('return')}
        Icon={RestartAltIcon}
        label="Return"
      />
      
        <CustomIconButton
        
        value="multicity"
        selectedValue={selectedOption}
        onChange={() => handleOptionChange('multicity')}
        Icon={CallSplitIcon}
        label="Multi-city"
        
      />
      
      
    </Box>
        
      </Grid>

      {/* Second Inner Grid (Container for items 1, 2, and 3) */}
      {
  selectedOption === 'multicity' ?
    airInputs.map((input, index) => (
      <AirInput
      isFirstChild={index === 0} // This will be true for the first AirInput
       journeyType={journeyType}
    canRemove={airInputs.length > 1 && index !== 0} 
        key={input.id}
        onAddCity={handleAddCity}
    onRemoveCity={() => handleRemoveCity(input.id)}
    
        paperStyle={paperStyle}
        selectedFromAirport={selectedFromAirport}
        selectedToAirport={selectedToAirport}
        handlePopoverClick={handlePopoverClick}
        fromAnchorEl={fromAnchorEl}
        toAnchorEl={toAnchorEl}
        handlePopoverClose={handlePopoverClose}
        handleSearchQueryChange={handleSearchQueryChange}
        searchQuery={searchQuery}
        searchedAirports={searchedAirports}
        handleFromAirportSelect={handleFromAirportSelect}
        handleToAirportSelect={handleToAirportSelect}
        handleDPopoverClick={handleDPopoverClick}
        dAnchorEl={dAnchorEl}
        handleDPopoverClose={handleDPopoverClose}
        selectedDate={selectedDate}
        dayOfWeek={dayOfWeek}
        handleDepartureDateChange={handleDepartureDateChange}
        handleRPopoverClick={handleRPopoverClick}
        returnAnchorEl={returnAnchorEl}
        handleRPopoverClose={handleRPopoverClose}
        returnDate={returnDate}
        handleReturnDateChange={handleReturnDateChange}
        openModal={openModal}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        adults={adults}
        children={children}
        infants={infants}
        selectedClass={selectedClass}
        handleClassChange={handleClassChange}
        classes={classes} // If you're using makeStyles or similar for styling
         setAdults={setAdults}
  setChildren={setChildren}
  setInfants={setInfants}
      />
    )) :
    <AirInput
      key={airInputs[0].id}
      paperStyle={paperStyle}
        selectedFromAirport={selectedFromAirport}
        selectedToAirport={selectedToAirport}
        handlePopoverClick={handlePopoverClick}
        fromAnchorEl={fromAnchorEl}
        toAnchorEl={toAnchorEl}
        handlePopoverClose={handlePopoverClose}
        handleSearchQueryChange={handleSearchQueryChange}
        searchQuery={searchQuery}
        searchedAirports={searchedAirports}
        handleFromAirportSelect={handleFromAirportSelect}
        handleToAirportSelect={handleToAirportSelect}
        handleDPopoverClick={handleDPopoverClick}
        dAnchorEl={dAnchorEl}
        handleDPopoverClose={handleDPopoverClose}
        selectedDate={selectedDate}
        dayOfWeek={dayOfWeek}
        handleDepartureDateChange={handleDepartureDateChange}
        handleRPopoverClick={handleRPopoverClick}
        returnAnchorEl={returnAnchorEl}
        handleRPopoverClose={handleRPopoverClose}
        returnDate={returnDate}
        handleReturnDateChange={handleReturnDateChange}
        openModal={openModal}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        adults={adults}
        children={children}
        infants={infants}
        selectedClass={selectedClass}
        handleClassChange={handleClassChange}
        classes={classes} // If you're using makeStyles or similar for styling
         setAdults={setAdults}
  setChildren={setChildren}
  setInfants={setInfants}
    />
}

    

    </Grid>

    <Button 
          
        onClick={handleFormData}


    
        
          variant="contained"
          color="primary"
          style={{
            position: 'relative',
            top: '-30px',
            zIndex: 1,
            width:'20%',
            height:'60px',
            textTransform:'none',
            backgroundColor:'#0067FF',
            fontWeight:'bold',
            fontSize:'22px',
            
          }}
        >
          
          {searchButtonLabel || 'Search'}
        </Button>
        <Backdrop
      open={isFetching} // Control the visibility based on the state
      style={{ zIndex: 1, color: '#fff' }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
</>


  );
};

export default SearchForm;
