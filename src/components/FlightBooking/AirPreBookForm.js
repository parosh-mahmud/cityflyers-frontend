import React from 'react';
import { useSelector } from 'react-redux';
import { selectAirPriceData } from '../../redux/slices/airPriceSlice';
import { Grid } from '@mui/material';
import FlightCard from '../FlightResults/FlightCard';
import PassengerDetailsForm from '../ReservationForm/PassengerDetailsForm';
import AirPriceShow from './AirPriceShow';
import LayoutPage from '../../pages/LayoutPage';

const AirPreBookForm = () => {
  const airPriceData = useSelector(selectAirPriceData);
  const segment = airPriceData?.Results[0]?.segments[0];
  const segmentReturn = airPriceData?.Results[0]?.segments[1];

  return (
    <LayoutPage>
      <Grid container justifyContent="center" alignItems="flex-start" style={{ marginTop: '100px', padding: '20px' }} spacing={4}> {/* Adjust spacing here */}
        {/* Main content area (first and second column stacked) */}
        <Grid item xs={12} md={8} container direction="column" spacing={2}>
          {/* First column */}
          <Grid item xs={12}>
            {segment && <FlightCard flightData={{ segments: [segment] }} showActions={false} />}
            {segmentReturn && <FlightCard flightData={{ segments: [segmentReturn] }} showActions={false} />}
          </Grid>
          {/* Second column */}
          <Grid item xs={12}>
            <PassengerDetailsForm />
          </Grid>
        </Grid>
        {/* Additional content to the right */}
        <Grid item xs={12} md={4}>
          <AirPriceShow />
        </Grid>
      </Grid>
    </LayoutPage>
  );
};

export default AirPreBookForm;
