import React, { useState, useEffect } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import RampRightIcon from '@mui/icons-material/RampRight';
import AirlinesIcon from '@mui/icons-material/Airlines';
import { Box, Typography, Menu, MenuItem } from '@mui/material';

const FilterComponent = () => {
  const [takeOffAnchorEl, setTakeOffAnchorEl] = useState(null);
  const [selectedTakeOff, setSelectedTakeOff] = useState('Take Off');

  const handleTakeOffClick = (event) => {
    setTakeOffAnchorEl(event.currentTarget);
  };

  const handleTakeOffClose = (option) => {
    setTakeOffAnchorEl(null);
    setSelectedTakeOff(option);
  };

  const [priceRangeAnchorEl, setPriceRangeAnchorEl] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState('Price Range');

  const handlePriceRangeClick = (event) => {
    setPriceRangeAnchorEl(event.currentTarget);
  };

  const handlePriceRangeClose = (option) => {
    setPriceRangeAnchorEl(null);
    setSelectedPriceRange(option);
  };

  const [refundableAnchorEl, setRefundableAnchorEl] = useState(null);
  const [selectedRefundable, setSelectedRefundable] = useState('Refundable');

  const handleRefundableClick = (event) => {
    setRefundableAnchorEl(event.currentTarget);
  };

  const handleRefundableClose = (option) => {
    setRefundableAnchorEl(null);
    setSelectedRefundable(option);
  };

  const [layoverAnchorEl, setLayoverAnchorEl] = useState(null);
  const [selectedLayover, setSelectedLayover] = useState('Layover');

  const handleLayoverClick = (event) => {
    setLayoverAnchorEl(event.currentTarget);
  };

  const handleLayoverClose = (option) => {
    setLayoverAnchorEl(null);
    setSelectedLayover(option);
  };

  const [airlineAnchorEl, setAirlineAnchorEl] = useState(null);
  const [selectedAirline, setSelectedAirline] = useState('Airline');

  const handleAirlineClick = (event) => {
    setAirlineAnchorEl(event.currentTarget);
  };

  const handleAirlineClose = (option) => {
    setAirlineAnchorEl(null);
    setSelectedAirline(option);
  };

  useEffect(() => {
    const closeMenusOnOutsideClick = (event) => {
      if (
        takeOffAnchorEl ||
        priceRangeAnchorEl ||
        refundableAnchorEl ||
        layoverAnchorEl ||
        airlineAnchorEl
      ) {
        const isClickInsideTakeOff = takeOffAnchorEl?.contains(event.target);
        const isClickInsidePriceRange = priceRangeAnchorEl?.contains(event.target);
        const isClickInsideRefundable = refundableAnchorEl?.contains(event.target);
        const isClickInsideLayover = layoverAnchorEl?.contains(event.target);
        const isClickInsideAirline = airlineAnchorEl?.contains(event.target);

        if (
          !isClickInsideTakeOff &&
          !isClickInsidePriceRange &&
          !isClickInsideRefundable &&
          !isClickInsideLayover &&
          !isClickInsideAirline
        ) {
          setTakeOffAnchorEl(null);
          setPriceRangeAnchorEl(null);
          setRefundableAnchorEl(null);
          setLayoverAnchorEl(null);
          setAirlineAnchorEl(null);
        }
      }
    };

    window.addEventListener('click', closeMenusOnOutsideClick);

    return () => {
      window.removeEventListener('click', closeMenusOnOutsideClick);
    };
  }, [
    takeOffAnchorEl,
    priceRangeAnchorEl,
    refundableAnchorEl,
    layoverAnchorEl,
    airlineAnchorEl,
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {/* First Box */}
      <Box style={{ flex: 1, padding: 1, display: 'flex' }}>
        {/* Content for the first box */}
        <TuneIcon />
      </Box>

      {/* Centered 6 Boxes */}
      <div style={{ display: 'flex', justifyContent: 'center', flex: 6 }}>
        {/* Content for the first centered box */}
        <Box style={{ margin: '0 5px', padding: 1, display: 'flex' }} onClick={handleTakeOffClick}>
          <Typography>
            <AccessTimeIcon />
          </Typography>
          <Typography variant="body1">{selectedTakeOff}</Typography>
          <Typography>
            <ArrowDropDownIcon />
          </Typography>
          <Menu anchorEl={takeOffAnchorEl} open={Boolean(takeOffAnchorEl)} onClose={() => setTakeOffAnchorEl(null)}>
            <MenuItem onClick={() => handleTakeOffClose('Earlier Flight')}>Earlier Flight</MenuItem>
            <MenuItem onClick={() => handleTakeOffClose('Later Flight')}>Later Flight</MenuItem>
          </Menu>
        </Box>

        {/* Content for the second centered box */}
        <Box style={{ margin: '0 5px', padding: 1, display: 'flex' }} onClick={handlePriceRangeClick}>
          <Typography>
            <LocalOfferIcon />
          </Typography>
          <Typography>{selectedPriceRange}</Typography>
          <Typography>
            <ArrowDropDownIcon />
          </Typography>
          <Menu
            anchorEl={priceRangeAnchorEl}
            open={Boolean(priceRangeAnchorEl)}
            onClose={() => setPriceRangeAnchorEl(null)}
          >
            <MenuItem onClick={() => handlePriceRangeClose('Cheapest')}>Cheapest</MenuItem>
            <MenuItem onClick={() => handlePriceRangeClose('Highest')}>Highest</MenuItem>
          </Menu>
        </Box>

        {/* Content for the third centered box */}
        <Box style={{ margin: '0 5px', padding: 1 }}>
          <Typography>Stops</Typography>
        </Box>

        {/* Content for the fourth centered box */}
        <Box style={{ margin: '0 5px', padding: 1, display: 'flex' }} onClick={handleRefundableClick}>
          <Typography>
            <PriceCheckIcon />
          </Typography>
          <Typography>{selectedRefundable}</Typography>
          <Typography>
            <ArrowDropDownIcon />
          </Typography>
          <Menu
            anchorEl={refundableAnchorEl}
            open={Boolean(refundableAnchorEl)}
            onClose={() => setRefundableAnchorEl(null)}
          >
            <MenuItem onClick={() => handleRefundableClose('Refundable')}>Refundable</MenuItem>
            <MenuItem onClick={() => handleRefundableClose('Non Refundable')}>Non Refundable</MenuItem>
          </Menu>
        </Box>

        {/* Content for the fifth centered box */}
        <Box style={{ margin: '0 5px', padding: 1, display: 'flex' }} onClick={handleLayoverClick}>
          <Typography>
            <RampRightIcon />
          </Typography>
          <Typography>{selectedLayover}</Typography>
          <Typography>
            <ArrowDropDownIcon />
          </Typography>
          <Menu
            anchorEl={layoverAnchorEl}
            open={Boolean(layoverAnchorEl)}
            onClose={() => setLayoverAnchorEl(null)}
          >
            <MenuItem onClick={() => handleLayoverClose('Maximum')}>Maximum</MenuItem>
            <MenuItem onClick={() => handleLayoverClose('Minimum')}>Minimum</MenuItem>
          </Menu>
        </Box>

        {/* Content for the sixth centered box */}
        <Box style={{ margin: '0 5px', padding: 1, display: 'flex' }} onClick={handleAirlineClick}>
          <Typography>
            <AirlinesIcon />
          </Typography>
          <Typography>{selectedAirline}</Typography>
          <Typography>
            <ArrowDropDownIcon />
          </Typography>
          <Menu
            anchorEl={airlineAnchorEl}
            open={Boolean(airlineAnchorEl)}
            onClose={() => setAirlineAnchorEl(null)}
          >
            <MenuItem onClick={() => handleAirlineClose('Airline 1')}>Airline 1</MenuItem>
            <MenuItem onClick={() => handleAirlineClose('Airline 2')}>Airline 2</MenuItem>
            {/* Add more airline options as needed */}
          </Menu>
        </Box>
      </div>

      {/* Last Box */}
      <Box style={{ flex: 1, padding: 1, display: 'flex' }}>
        {/* Content for the last box */}
        <Typography>More Filter</Typography>
        <Typography>
          <ArrowDropDownIcon />
        </Typography>
      </Box>
    </div>
  );
};

export default FilterComponent;
