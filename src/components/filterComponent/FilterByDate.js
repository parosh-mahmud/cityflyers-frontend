import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import { setFlightSearchData } from '../../redux/slices/flightSlice';
import api from '../../services/api';
import { useDispatch } from 'react-redux';



const FilterByDate = () => {
  const dispatch = useDispatch();

  const boxStyle = {
    width: '180px',
    height: '70px',
    marginRight: '5px',
    textAlign: 'center',
    lineHeight: '50px',
    color: 'blue',
    cursor: 'pointer',
    borderRadius: '5px',
    border: '1px solid blue',
    backgroundColor: 'rgba(255,255,255,0.5)',
  };

  const activeBoxStyle = {
    ...boxStyle,
    backgroundColor:"#0067FF" ,
    color: 'white',
  };

  const formatDate = (date) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const getCurrentDate = () => {
    return formatDate(new Date());
  };

  const calculateTotalAmount = () => {
    // Replace this with your actual logic to calculate total amount
    return '$100'; // For example purposes
  };

  const [activeBox, setActiveBox] = useState(3);

const handleBoxClick = async (boxNumber) => {
  try {
    const selectedDate = getRelativeDate(boxNumber - 3);
   
  } catch (error) {
    console.error('Error fetching flight search results:', error.message);
  }
  setActiveBox(boxNumber);
};

  const getRelativeDate = (daysOffset) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + daysOffset);
    return formatDate(currentDate);
  };

  useEffect(() => {
    setActiveBox(3);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Left Arrow Icon */}
      <IconButton onClick={() => handleBoxClick(activeBox - 1)} disabled={activeBox === 1}>
        <ArrowBackIcon />
      </IconButton>
      <Box fontWeight="bold" fontSize="large" 
        sx={activeBox === 1 ? activeBoxStyle : boxStyle}
        onClick={() => handleBoxClick(1)}
      >
        {getRelativeDate(-2)}
        <Typography sx={{textDecoration:'underline'}}>View fare</Typography>
      </Box>
      <Box
        sx={activeBox === 2 ? activeBoxStyle : boxStyle}
        onClick={() => handleBoxClick(2)}
      >
        {getRelativeDate(-1)}
        <Typography>View fare</Typography>
      </Box>
      <Box
        sx={activeBox === 3 ? activeBoxStyle : boxStyle}
        onClick={() => handleBoxClick(3)}
      >
        {getCurrentDate()}
      </Box>
      <Box
        sx={activeBox === 4 ? activeBoxStyle : boxStyle}
        onClick={() => handleBoxClick(4)}
      >
        {getRelativeDate(1)}
      </Box>
      <Box
        sx={activeBox === 5 ? activeBoxStyle : boxStyle}
        onClick={() => handleBoxClick(5)}
      >
        {getRelativeDate(2)}
      </Box>
      <Box
        sx={activeBox === 6 ? activeBoxStyle : boxStyle}
        onClick={() => handleBoxClick(6)}
      >
        {getRelativeDate(3)}
      </Box>
      <Box
        sx={activeBox === 7 ? activeBoxStyle : boxStyle}
        onClick={() => handleBoxClick(7)}
      >
        {getRelativeDate(4)}
      </Box>

       {/* Right Arrow Icon */}
      <IconButton onClick={() => handleBoxClick(activeBox + 1)} disabled={activeBox === 7}>
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
};

export default FilterByDate;
