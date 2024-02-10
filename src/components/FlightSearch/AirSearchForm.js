import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Oneway from './JourneyType';
import SearchForm from './SearchForm';
import '../FlightSearch/style.css'
const SearchFlight = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div style={{ width: '98%',  margin: '0 auto', marginTop: '40px', }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
  scrollButtons
  allowScrollButtonsMobile
        indicatorColor="primary"
        textColor="white"
         sx={{
          width: 'auto',  
          //previous was 600px
         backgroundColor:'rgba(255,255,255,0.5)',
          borderTopLeftRadius:'5px',
          borderTopRightRadius:'5px',
          border: '1px solid	white',	
          margin:'auto',
        }}
        
      >
        <Tab label="Flight" />
        {/* <Tab label="Hotel" />
        <Tab label="Tour Packages" />
        <Tab label="Tourist Visa" />
        <Tab label="Rent a Car" />
        <Tab label="Cruises" />
        <Tab label="More" /> */}
      </Tabs>
      <div  role="tabpanel" hidden={activeTab !== 0}  >
        {activeTab === 0 && (
          <Box  >
           
            <SearchForm  />
          </Box>
        )}
      </div>

      {/* <div role="tabpanel" hidden={activeTab !== 1}>
        {activeTab === 1 && <p>Content for Hotel Tab</p>}
      </div>
      <div role="tabpanel" hidden={activeTab !== 2}>
        {activeTab === 2 && <p>Content for Tour Packages Tab</p>}
      </div>
      <div role="tabpanel" hidden={activeTab !== 3}>
        {activeTab === 3 && <p>Content for Tourist Visa Tab</p>}
      </div>
      <div role="tabpanel" hidden={activeTab !== 4}>
        {activeTab === 4 && <p>Content for Rent a Car Tab</p>}
      </div>
      <div role="tabpanel" hidden={activeTab !== 5}>
        {activeTab === 5 && <p>Content for Cruises Tab</p>}
      </div>
      <div role="tabpanel" hidden={activeTab !== 6}>
        {activeTab === 6 && <p>Content for More Tab</p>}
      </div> */}
    </div>
  );
};

export default SearchFlight;
