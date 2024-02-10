// FlightResults.js
import React, { useEffect, useState } from 'react';
import { Box, Typography,Grid,Paper } from '@mui/material'; // Import Material-UI components
import LayoutPage from '../../pages/LayoutPage';
import FlightCard from './FlightCard';
import { useDispatch, useSelector } from 'react-redux';
// import { setSearchID, setSelectedResultID } from '../../redux/reducers/flightSlice';
import { setSearchID, selectSearchID, selectResults } from '..//../redux/reducers/flightSliceNew';
import FilterByDate from '../filterComponent/FilterByDate';
import { selectFlightSearchData } from '../../redux/reducers/flightSlice';
import FilterComponent from '../filterComponent/FilterComponent';
import SearchForm from '../FlightSearch/SearchForm';
import RecommendFilter from '../filterComponent/RecommendFilter';



const recommendedBoxStyle = {
  width: '100%',
  height: '48px',
  backgroundColor: 'green',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  
};

const boxStyle={
  width: '294px',
  height:'100%',
  backgroundColor: 'gray',
}



const FlightResults = () => {
  const dispatch = useDispatch();
 

  
const loadingState = useSelector((state) => state.flight.isLoadingFlightData);
const flightSearchData = useSelector(selectFlightSearchData);
console.log(flightSearchData)
const flightResults = flightSearchData.Results || [];
 const outboundSegments = flightSearchData.Results;
const inboundSegments = flightSearchData;
console.log(outboundSegments)
 const [showSortedFlights, setShowSortedFlights] = useState(false);
  const [sortedFlights, setSortedFlights] = useState([]);

  const handleSortFlights = (sortedFlights) => {
    setSortedFlights([...sortedFlights]);
    setShowSortedFlights(true);
  };

 





  return (
    <LayoutPage>
      {/* first grid */}
 <Grid container spacing={2} style={{width:'98%',margin:'auto'}}>
 
  <Grid item xs={12}>
    <Box style={{ height: 'auto', padding: "10px" }}>
      {/* First Row with Background Color */}
      <Box sx={{  padding: 2,height:'auto' }}>
        
        {/* Content for the first row */}
       <SearchForm searchButtonLabel="Modify Search" />
      </Box>

      {/* Second Row with Background Color */}
      <Box sx={{ backgroundColor: 'rgba(255,255,255,0.5)', padding: 2, display: 'flex',
        justifyContent: 'center', alignItems:'center'}}>
        <FilterByDate />
        {/* Content for the second row */}
        
      </Box>
    </Box>
  </Grid>

      {/* Second Grid */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {/* First Grid within the Second Grid */}
          <Grid item xs={9}>
            <Box style={{ height: '100%', padding: 16 }}>
              {/* Content for the first Paper within the Second Grid */}
              
              <Box sx={{width:'100%',minHeight:'36px',backgroundColor: 'rgba(255,255,255,0.5)',border:'1px solid white',borderRadius:'5px'}}>
              {/* content for filter Flight */}
              <FilterComponent/>
              </Box>
              <Box sx={{width:'100%',minHeight:'80px',display:'flex',marginTop:'10px',marginBottom:'5px',border:'1 px solid gray'}}>
             <RecommendFilter flightDataArray={flightSearchData.Results} onSortFlights={handleSortFlights} />
                 
              </Box>
            <Box style={{ marginTop: '10px' }}>
   {/* Iterate over flight results */}
               {showSortedFlights ? (
                  // Display sorted flights when showSortedFlights is true
                  sortedFlights.map((flight, index) => (
                    <div key={flight.ResultID}>
                      <FlightCard flightData={flight} availability={flight.Availabilty} isLoading={loadingState} />
                      {index < sortedFlights.length - 1 && <hr style={{ margin: '10px 0' }} />}
                    </div>
                  ))
                ) : (
                  // Display unsorted flights when showSortedFlights is false
                  flightSearchData?.Results && flightSearchData.Results.map((flight, index) => (
                    <div key={flight.ResultID}>
                      <FlightCard flightData={flight} availability={flight.Availabilty} isLoading={loadingState} />
                      {index < flightSearchData.Results.length - 1 && <hr style={{ margin: '10px 0' }} />}
                    </div>
                  ))
                )}
</Box>

            </Box>
            
          </Grid>

          {/* Second Grid within the Second Grid */}
          <Grid item xs={3}>
            <Box style={{ height: '100%', padding: 16 }}>
              {/* Content for the second Paper within the Second Grid */}
              Show ad here
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
     
    </LayoutPage>
  );
};

export default FlightResults;
