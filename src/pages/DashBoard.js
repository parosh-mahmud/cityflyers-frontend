import React, { useState, useEffect } from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import DashBoardHeader from '../components/Header/MainHeader';
import SearchFlight from '../components/FlightSearch/AirSearchForm';
const DashBoard = () => {

  const [apiData, setApiData] = useState(null);
  const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InRoZWNpdHlmbHllcnNAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy91c2VyZGF0YSI6Ijk1fDExMXwxMDMuMTI0LjI1MS4xNDcsMTkyLjE2OC4wLjEwNiIsIm5iZiI6MTY5NTU4MDg0OCwiZXhwIjoxNjk2MTg1NjQ4LCJpYXQiOjE2OTU1ODA4NDgsImlzcyI6Imh0dHA6Ly9hcGkuc2FuZGJveC5mbHlodWIuY29tIiwiYXVkIjoiYXBpLnNhbmRib3guZmx5aHViLmNvbSJ9.SlZQYkc0GS4mu0EVkbYTDoJXo4mv5I4A1vNNqKXqFYk';

// Function to fetch data from the API
const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/airports/airSearch', {
      method: 'POST', // Assuming it's a POST request
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`, // Include the Bearer token here
      },
      body: JSON.stringify({
        AdultQuantity: 1,
        ChildQuantity: 0,
        InfantQuantity: 0,
        EndUserIp: '192.168.1.1',
        JourneyType: '1',
        Segments: [
          {
            Origin: 'JSR',
            Destination: 'DAC',
            CabinClass: '1',
            DepartureDateTime: '2023-09-29',
          },
        ],
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setApiData(data);
      console.log(data); // Log the API response data
    } else {
      console.error('Error fetching data from the API');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Call the fetchData function when the component mounts
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Box 
    d='flex'
    justifyContent='center'
    p={3}
    bg={"white"}
    w="100%"
    m="40px 0 15px 0"
    borderRadius="lg"
    borderWidth="1px"
    >
      
      <SearchFlight 
      
      />
      
   </Box>
  );
}


export default DashBoard
