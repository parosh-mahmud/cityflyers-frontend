import React from "react";
import { Paper, Tabs, Tab } from "@mui/material";
import { FlightInfoItem } from "../FlightResults/FlightCard";
import { TabPanel } from "@mui/lab";
import FlightCard from "../FlightResults/FlightCard";
import { useSelector } from "react-redux";
import { selectFlightSearchData } from "../../redux/reducers/flightSlice";
const TabComponent = ({ activeTab, handleTabChange, }) => {

   // Use useSelector to directly access the flight data from the Redux store
  const flightData = useSelector(selectFlightSearchData);

  // Ensure flightData is not undefined or null before accessing properties
  const segments = flightData?.Results?.[0]?.segments || [];
  return (
    <Paper>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        orientation="horizontal"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        sx={{
          width: "auto",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          backgroundColor: "white",
          margin: "auto",
        }}
      >
        <Tab label="Flight Details" value="0" />
        <Tab label="Fare Summary" value="1" />
        <Tab label="Baggage" value="2" /> {/* Add new tab for Baggage */}
        <Tab label="Cancellation" value="3" />
        <Tab label="Date Change" value="4" />
        <Tab label="Fare Rules" value="5" />
        <Tab label="Class" value="6" />
        {/* Add other tabs as needed */}
      </Tabs>

      <TabPanel value={activeTab}>
        {activeTab === "0" && (
          <>
            {/* Content for Flight Tab */}
            <FlightInfoItem
      label="Operating Carrier"
      value={
        flightData?.Results?.[0]?.segments?.[0]?.Airline?.OperatingCarrier ||
        "N/A"
      }
    />

    <FlightInfoItem
      label="Operating Carrier"
      value={segments[0].Airline ? segments[0].Airline.OperatingCarrier : "N/A"}
    />
    <FlightInfoItem
      label="Flight Number"
      value={segments[0].Airline ? segments[0].Airline.FlightNumber : "N/A"}
    />
    <FlightInfoItem
      label="Airline Code"
      value={segments[0].Airline ? segments[0].Airline.AirlineCode : "N/A"}
    />
    <FlightInfoItem
      label="Airline Name"
      value={segments[0].Airline ? segments[0].Airline.AirlineName : "N/A"}
    />
    <FlightInfoItem
      label="Departure Airport"
      value={segments[0].Origin ? segments[0].Origin.Airport.AirportName : "N/A"}
    />
    <FlightInfoItem
      label="Destination Airport"
      value={segments[0].Destination ? segments[0].Destination.Airport.AirportName : "N/A"}
    />
    <FlightInfoItem
      label="Origin Airport Code"
      value={segments[0].Origin ? segments[0].Origin.Airport.AirportCode : "N/A"}
    />
    <FlightInfoItem
      label="Departure Time"
      value={segments[0].Origin ? segments[0].Origin.DepTime : "N/A"}
    />
    <FlightInfoItem
      label="Arrival Time"
      value={segments[0].Destination ? segments[0].Destination.ArrTime : "N/A"}
    />
    <FlightInfoItem
      label="Journey Duration"
      value={segments[0].JourneyDuration ? `${segments[0].JourneyDuration} minutes` : "N/A"}
    />
    <FlightInfoItem
      label="Aircraft"
      value={segments[0].Equipment ? `${segments[0].Equipment}` : "N/A"}
    />
    {/* Add other Flight Tab content as needed */}
  
            {/* Add other Flight Tab content as needed */}
          </>
        )}

        {activeTab === "1" && (
          <>
            {/* Content for Fare Summary Tab */}
            {/* Here, you are rendering the FlightCard component */}
            <FlightCard flightData={segments} />
          </>
        )}

        {activeTab === "2" && (
          <>
            {/* Content for Baggage Tab */}
          {segments.map((seg, index) => (
      <div key={index}>
        <FlightInfoItem
          label={`Baggage Details - Segment ${index + 1}`}
          value={`Cabin: ${seg.baggageDetails[0]?.Cabin}, Checkin: ${seg.baggageDetails[0]?.Checkin}`}
        />
      </div>
    ))}
          </>
        )}

        {/* Add other TabPanels for additional tabs */}
      </TabPanel>
    </Paper>
  );
};

export default TabComponent;






// // TabComponent.js

// import React from "react";
// import { Paper, Tabs, Tab } from "@mui/material";
// import {FlightInfoItem} from '../FlightResults/FlightCard'
// import { TabPanel } from "@mui/lab";
// import FlightCard from "../FlightResults/FlightCard";


// const TabComponent = ({ activeTab, handleTabChange, segment }) => {
//   return (
//     <Paper>
//               <Tabs
//                 value={activeTab}
//                 onChange={handleTabChange}
//                 indicatorColor='primary'
//                 textColor='primary'
//                 orientation='horizontal'
//                 variant='scrollable'
//                 scrollButtons
//                 allowScrollButtonsMobile
//                 sx={{
//                   width: "auto",
//                   borderTopLeftRadius: "5px",
//                   borderTopRightRadius: "5px",
//                   backgroundColor: "white",
//                   margin: "auto",
//                 }}>
//                 <Tab label='Flight Details' value='0' />
//                 <Tab label='Fare Summary' value='1' />
//                 <Tab label='Baggage' value='3' />
//                 <Tab label='Cancellation' value='4' />
//                 <Tab label='Date Change' value='5' />
//                 <Tab label='Fare Rules' value='6' />
//                 <Tab label='Class' value='7' />
//                 {/* Add other tabs as needed */}
//               </Tabs>

//               <TabPanel value='0'>
//                 {/* Content for Flight Tab */}
//                 <FlightInfoItem
//                   label='Operating Carrier'
//                   value={
//                     segment.Airline ? segment.Airline.OperatingCarrier : "N/A"
//                   }
//                 />
//                 <FlightInfoItem
//                   label='Flight Number'
//                   value={segment.Airline ? segment.Airline.FlightNumber : "N/A"}
//                 />
//                 <FlightInfoItem
//                   label='Airline Code'
//                   value={segment.Airline ? segment.Airline.AirlineCode : "N/A"}
//                 />
//                 <FlightInfoItem
//                   label='Airline Name'
//                   value={segment.Airline ? segment.Airline.AirlineName : "N/A"}
//                 />
//                 <FlightInfoItem
//                   label='Departure Airport'
//                   value={
//                     segment.Origin ? segment.Origin.Airport.AirportName : "N/A"
//                   }
//                 />
//                 <FlightInfoItem
//                   label='Destination Airport'
//                   value={
//                     segment.Destination
//                       ? segment.Destination.Airport.AirportName
//                       : "N/A"
//                   }
//                 />
//                 <FlightInfoItem
//                   label='Origin Airport Code'
//                   value={
//                     segment.Origin ? segment.Origin.Airport.AirportCode : "N/A"
//                   }
//                 />
//                 <FlightInfoItem
//                   label='Departure Time'
//                   value={segment.Origin ? segment.Origin.DepTime : "N/A"}
                  
//                 />
//                 <FlightInfoItem
//                   label='Arrival Time'
//                   value={
//                     segment.Destination ? segment.Destination.ArrTime : "N/A"
//                   }
                  
//                 />{" "}
//                 <FlightInfoItem
//                   label='Journey Duration'
//                   value={
//                     segment.JourneyDuration
//                       ? `${segment.JourneyDuration} minutes`
//                       : "N/A"
//                   }
//                 />{" "}
//                 <FlightInfoItem
//                   label='Aircraft'
//                   value={segment.Equipment ? `${segment.Equipment}` : "N/A"}
//                 />
//                 {/* ... */}
//               </TabPanel>
//               <TabPanel value='1'>

//                   <FlightCard flightData={segment}/>

//               </TabPanel>
//               {/* Add other TabPanels for additional tabs */}
//             </Paper>
//   );
// };

// export default TabComponent;
