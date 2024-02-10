import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const recommendedBoxStyle = {
  width: '100%',
  height: 'auto',
  backgroundColor: 'rgba(255,255,255,0.5)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '5px',
};

const boxStyle = {
  width: '300px',
  height: '100%',
  backgroundColor: 'rgba(255,255,255,0.5)',
  border:'1px solid gray',
  borderRadius: '5px',
  cursor: 'pointer',
};

const headingTextStyle = {
  fontWeight: 'bold',
}

const RecommendFilter = ({flightDataArray,onSortFlights}) => {

   const [sortedFlights, setSortedFlights] = useState([...flightDataArray]);

useEffect(() => {
    // Whenever flightDataArray changes, update the sorted flights
    setSortedFlights([...flightDataArray]);
  }, [flightDataArray]);

  const handleSortByDuration = () => {
  const sortedByDuration = [...flightDataArray].sort((a, b) => {
    // Assuming the duration is in minutes, adjust the comparison as needed
    const durationA = parseInt(a.segments[0].JourneyDuration);
    const durationB = parseInt(b.segments[0].JourneyDuration);
    return durationA - durationB;
  });

  onSortFlights(sortedByDuration);
};

 const handleSortByBaseFare = () => {
    const sortedByBaseFare = [...flightDataArray].sort((a, b) => {
      const baseFareA = a.Fares[0].BaseFare;
      const baseFareB = b.Fares[0].BaseFare;
      return baseFareA - baseFareB;
    });
    onSortFlights(sortedByBaseFare);
  };

  return (
    <Box sx={recommendedBoxStyle}>
      <Box sx={boxStyle}>
        <Box sx={headingTextStyle}>Recommended</Box>
        <Box sx={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
          <Typography>5H 30</Typography>
          <Typography>Direct</Typography>
          <Typography>BDT 61984</Typography>
          
        </Box>
      </Box>
      <Box onClick={handleSortByBaseFare} sx={boxStyle}>
        <Box sx={headingTextStyle} >Cheapest</Box>
        <Box sx={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
          <Typography>5H 30</Typography>
          <Typography>Direct</Typography>
          <Typography>BDT 61984</Typography>
        </Box>
      </Box>
      <Box onClick={handleSortByDuration} sx={boxStyle}>
        <Box sx={headingTextStyle}>Fastest</Box>
        <Box sx={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
          <Typography>5H 30</Typography>
          <Typography>Direct</Typography>
          <Typography>BDT 61984</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RecommendFilter;
