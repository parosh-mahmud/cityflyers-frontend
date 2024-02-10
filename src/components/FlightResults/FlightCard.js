import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Tabs, Tab, Paper } from "@mui/material";
// import { FlightTakeoff, FlightLand, ArrowRightAlt } from '@material-ui/icons';
import { FaPlaneDeparture, FaPlaneArrival, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import GoogleLogo from "..//..//assets/logos/GoogleLogo.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTheme } from "@mui/material/styles";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext } from "@mui/lab";
import TabComponent from "../tabComponent/TabComponent";
import FlightIcon from '@mui/icons-material/Flight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircleIcon from '@mui/icons-material/Circle';
import Skeleton from "@mui/material/Skeleton";
import { Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAuthCont } from "../auth/AuthContext";
import { fetchAirPrice } from "../../redux/slices/airPriceSlice";
import { selectFlightSearchData } from '../../redux/reducers/flightSlice';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import { setSearchIDResultID } from "../../redux/slices/searchIDResultIDSlice";
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    display: "flex",
    flexDirection: "row",
    borderRadius: "5px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  firstBox: {
    width: "90%", // Adjusted width for the first box
    
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
  },
  nestedBoxes: {
    display: "flex",
    flexDirection: "row", // Set to row
    justifyContent: "space-between", // Adjusted to space-between for spacing
  },
  nestedBox: {
    width: "50%", // Adjusted width for each nested box
    
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    position: "relative",
    margin: theme.spacing(0, 1), // Add margin between nested boxes
  },
  secondBox: {
    width: "10%", // Adjusted width for the second box
    
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  button: {
    width: "100%",
    marginTop: theme.spacing(1),
    textAlign: "right",
  },
  
  
 
}));

export const FlightCard = ({ flightData, onSelect, availability, isLoading, showActions = true }) => {
 
  const dispatch = useDispatch();
  const history = useHistory();
  const segment = flightData.segments[0];
  const segmentReturn = flightData.segments[1];
  



 
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0); // State to track selected tab

  const [activeTab, setActiveTab] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
const [airlineLogoUrl, setAirlineLogoUrl] = useState(null);
const [anchorEl, setAnchorEl] = useState(null);
const { currentUser } = useAuthCont(); 
const flightSearchData = useSelector(selectFlightSearchData);
const airlineCode = segment?.Airline?.AirlineCode;



 useEffect(() => {
    if (flightData?.segments?.[0]?.Airline?.AirlineCode) {
      const fetchLogoUrl = async () => {
        try {
          const response = await axios.get(`/api/airline/${flightData.segments[0].Airline.AirlineCode}`);
          setAirlineLogoUrl(response.data.logoUrl);
        } catch (error) {
          console.error('Error fetching airline logo:', error);
        }
      };
      fetchLogoUrl();
    }
  }, [flightData]);


  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

const handleMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl(null);
};

  const handleViewDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
    setActiveTab(0); // Set the default tab to open when "View Details" is clicked
  };
 const calculateTotalAmount = () => {
  if (flightData && flightData.Fares && flightData.Fares[0]) {
    const baseFare = flightData.Fares[0].BaseFare || 0;
    const tax = flightData.Fares[0].Tax || 0;
    return baseFare + tax;
  } else {
    return 0; // or any default value you want to return when data is not available
  }
};

const calculateDuration = () => {
    const depTime = new Date(segment.Origin.DepTime);
    const arrTime = new Date(segment.Destination.ArrTime);

    const durationInMinutes = (arrTime - depTime) / (1000 * 60); // Convert milliseconds to minutes

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    if (hours > 0) {
      return `${hours} Hr ${minutes} Min`;
    } else {
      return `${minutes} Min`;
    }
  };

const SearchIDs = flightSearchData.SearchId;
 const Result_ID = flightData.ResultID;
// console.log(Result_ID)
// console.log(SearchIDs)


  const handleSelect = async () => {
  try {
    // Validate flightData structure before proceeding
    if (!flightData?.segments?.length || !flightData.segments[0]?.Airline) {
      console.error("Incomplete flightData structure");
      return; // Exit the function if data is not structured as expected
    }

    const requestBody = {
      SearchID: flightSearchData.SearchId,
      ResultID: flightData.ResultID,
    };

    await dispatch(fetchAirPrice(requestBody));
    dispatch(setSearchIDResultID({ searchId: flightSearchData.SearchId, resultId: flightData.ResultID }));
    history.push("/airprebookform");

    if (typeof onSelect === 'function') {
      onSelect(flightData);
    }
  } catch (error) {
    console.error("Error fetching airPrice:", error);
  }
};




  return (



    <TabContext value={activeTab.toString()}>


      <div className={classes.container}>

        <Box className={classes.firstBox}>
          {/* Content for the first box */}
           <div style={{ display: 'flex' }}>
      {/* First Box */}
      <Box
        style={{
         
          width: '50%',
         
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box
          style={{
            
             
            flex: '8',
           
            display: 'flex',
            justifyContent:'space-between',
            alignItems:'center',
            

          }}
        >
          <Box sx={{justifyContent:'center'}} >
            {/* box 1.1 */}
            <Box sx={{display:'flex'}}>
              
              <Box sx={{display:'flex',justifyContent:'flex-start',paddingRight:'10px',marginTop:'-25px'}}>
                      {/* airline logo here */}
                      {isLoading ? (
                        <Skeleton variant="circular" width={90} height={90} />
                      ) : (
                        airlineLogoUrl && (
                          <img
                            src={airlineLogoUrl}
                            alt="Airline Logo"
                            width="80"
                            height="80"
                            
                          />
                        )
                      )}
                    </Box>
              <Box sx={{}}>
                {/* airline code + flight number */}
                <Box sx={{display:"flex"}}>
                <Typography >
  <FlightInfoItem isLoading={isLoading}   valueStyle={{ fontWeight: 'bold' }} value={segment.Airline ? segment.Airline.AirlineCode : 'N/A'} />
</Typography>

<Typography >
  <FlightInfoItem isLoading={isLoading} valueStyle={{ fontWeight: 'bold' }} value={segment.Airline ? segment.Airline.FlightNumber : 'N/A'} />
</Typography>
                </Box>

                <Box><Typography><FlightInfoItem isLoading={isLoading} valueStyle={{fontWeight:'bold'}}   label="Aircraft: " value={segment.Equipment ? `${segment.Equipment}` : 'N/A'} /></Typography></Box>

             <Box>
              <Typography sx={{display:'flex'}}>
                <AirlineSeatReclineNormalIcon/>
                <FlightInfoItem isLoading={isLoading} valueStyle={{fontWeight:'bold'}}    value={availability} />
                </Typography>
                
                </Box>
        
              </Box>
              
            </Box>

            <Box>
              <Typography>
                <FlightInfoItem isLoading={isLoading}    value={segment.Airline ? segment.Airline.AirlineName : 'N/A'} />
              </Typography>
              
              </Box>

          </Box>
         
          <Box>

          </Box>
        </Box>
        <Box
          style={{
            
           display: 'flex',
           flexDirection: 'column',
            flex: '2',
           
           
           
            justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
          }}
        >
           <Typography> <FlightInfoItem isLoading={isLoading}  valueStyle={{color:'green',fontWeight:'bold',fontSize:'2rem',}}  value={segment.Origin ? segment.Origin.Airport.CityName : 'N/A'} /></Typography>
          <Typography> <FlightInfoItem isLoading={isLoading}  value={segment.Origin ? segment.Origin.Airport.CityCode : 'N/A'} /></Typography>
        </Box>
      </Box>

      {/* Second Box */}
      <Box
        style={{
          
          width: '50%',
          
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          
        }}
      >
        <Box
          style={{
           display: 'flex',
           flexDirection: 'column',
           justifyContent: 'center',
           alignItems: 'center',
            flex: '1',
            
            
          }}
        >
          <Box >
            {/* time */}
            <Typography> <FlightInfoItem isLoading={isLoading}  valueStyle={{fontWeight: 'bold',fontSize:'2rem'}}
             
              value={
                segment.Destination
                  ? new Date(segment.Origin.DepTime).toLocaleTimeString(
                      'en-US',
                      {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      }
                    )
                  : 'N/A'
              }
              icon={<FaPlaneArrival />}
            /></Typography>
          </Box>

         
        </Box>
       <Box
  style={{
    
    flex: '1',
    
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <div >
    
    
      
   
  </div>
  <div  >
    <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <FlightIcon style={{ transform: 'rotate(90deg)', fontSize:'2rem' }} />
      <MoreHorizIcon />   
    <MoreHorizIcon style={{ marginLeft:'-5px', }} />   
   <CircleIcon/>
   </Box>
    
    <Box >
            {/* duration */}
           
            <FlightInfoItem isLoading={isLoading} 

                      value={calculateDuration()}
                      icon={<FaPlaneArrival />}
                    />
          </Box>
  </div>

</Box>

        <Box
          style={{
           display: 'flex',
           flexDirection: 'column',
           justifyContent: 'center',
           alignItems: 'center',
            flex: '1',
           
          }}
        >
          <Typography> <FlightInfoItem isLoading={isLoading}  valueStyle={{fontWeight: 'bold',fontSize:'2rem'}}
             
              value={
                segment.Destination
                  ? new Date(segment.Destination.ArrTime).toLocaleTimeString(
                      'en-US',
                      {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      }
                    )
                  : 'N/A'
              }
              icon={<FaPlaneArrival />}
            />
            </Typography>
        </Box>
        <Box
          style={{
            
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography>
            <FlightInfoItem isLoading={isLoading} valueStyle={{fontSize:'2rem',color:'green',fontWeight:'bold'}} value={segment.Destination ? segment.Destination.Airport.CityName : 'N/A'} />
            <FlightInfoItem value={segment.Destination ? segment.Destination.Airport.CityCode : 'N/A'} />
          </Typography>
        </Box>
      </Box>
    </div>

{/* flight card with showActions false */}
            {segmentReturn && segmentReturn.TripIndicator === "InBound" && (
    <div>
        <FlightCard
            flightData={{ ...flightData, segments: [segmentReturn] }} // Pass only the inbound segment
            availability={availability}
            isLoading={isLoading}
            showActions={false} // Hide actions for this specific FlightCard
            showDetails={false} // Ensuring details are not expandable for this card
        />
    </div>
)}

    {showActions && (
<Button
  variant='contained'
  color='primary'
  onClick={handleViewDetails}
  className={classes.button}
  style={{ justifyContent: "flex-end" }}
  endIcon={showDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
>
  View Details
</Button>
    )}
         
        </Box>
          {showActions && (
        <Box className={classes.secondBox}>
          {/* Content for the second box */}
          <Typography>
            <Typography fontSize='20px' fontWeight='bold'>BDT {calculateTotalAmount()} </Typography>
          </Typography>
          
<Button  variant="text" style={{ textTransform: 'capitalize', fontSize: '10px' }}
      onClick={handleMenuOpen}
      endIcon={anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    >
      Economy Flex
    </Button>

    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Economy Flex</MenuItem>
      <MenuItem onClick={handleMenuClose}>Demo 1</MenuItem>
      <MenuItem onClick={handleMenuClose}>Demo 2</MenuItem>
    </Menu>
          <Button
            onClick={handleSelect}
            
            variant='contained'
            color='primary'
            className={classes.button}
            style={{ justifyContent: "flex-end" }}
            endIcon={<ArrowForwardIcon />}>
            Select
          </Button>


    
         
        </Box>
        )}
      </div>


       {/* Additional content shown when View Details button is clicked */}
          {showDetails && (
            <TabComponent
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          segment={flightData.segments[0]}
        />
          )}
    </TabContext>
  );
};

export const FlightInfoItem = ({ label, value, valueStyle, isLoading }) => (
  <Box flex="1 1 50%" display="flex" alignItems="center">
    <Typography>{label}</Typography>
    {isLoading ? (
      
      <Skeleton width={90} height={30} style={{ marginLeft: 10 }} />
    ) : (
      <Typography style={valueStyle}>{value}</Typography>
    )}
  </Box>
);



export default FlightCard;

