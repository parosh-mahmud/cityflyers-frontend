import React from 'react';
import {
  Box,
  Typography,
  Link,
  Grid,
  Divider,
  Container,
} from '@mui/material';

const Footer = () => {
  return (
    <Box bgcolor="gray.200" py={4} mt={50}>
      <Container>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Discover</Typography>
            <Link href="#" color="inherit">Home</Link>
            <Link href="#" color="inherit">Terms</Link>
            <Link href="#" color="inherit">Talent & Culture</Link>
            <Link href="#" color="inherit">Refund Policy</Link>
            <Link href="#" color="inherit">EMI Policy</Link>
            <Link href="#" color="inherit">Privacy Policy</Link>
            <Link href="#" color="inherit">Payment Methods</Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Need Help ?</Typography>
            <Link href="#" color="inherit">We are Always here for you!</Link>
            <Typography variant="body2">Knock us on Messenger anytime</Typography>
            <Typography variant="body2">or Call our Hotline (10AM - 10PM).</Typography>
          </Grid>
        </Grid>
        <Divider my={4} />
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="body2">&copy; {new Date().getFullYear()} Cityflyers</Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item><Link href="#">Contact</Link></Grid>
              <Grid item><Link href="mailto:info@Cityflyers.com">info@Cityflyers.com</Link></Grid>
              <Grid item><Link href="tel:+88096******">+88 ********</Link></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
