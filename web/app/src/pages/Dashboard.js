import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import StatBox from 'src/components/dashboard/StatBox';
import LogsByDays from 'src/components/dashboard/LogsByDays';
import LogsByService from 'src/components/dashboard/LogsByService';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [servicesStats, setServicesStats] = useState([]);

  useEffect(() => {
    axios.get('/api/logs/stats').then((res) => {
      setServicesStats(res.data.by_days);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Dashboard | Analog</title>
        </Helmet>
        <Backdrop open style={{ zIndex: 1252 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard | Analog</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StatBox
                label="Logs today"
                value="15"
                comparisonLabel="Compared to yesterday"
                comparisonValue="12"
              />
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StatBox
                label="Logs flagged today"
                value="3"
                comparisonLabel="Compared to yesterday"
                comparisonValue="12"
              />
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StatBox
                label="Logs flagged this week"
                value="89"
                comparisonLabel="Compared to last week"
                comparisonValue="12"
              />
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StatBox
                label="Logs flagged this week"
                value="34"
                comparisonLabel="Compared to last week"
                comparisonValue="12"
              />
            </Grid>

            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <LogsByDays
                servicesStats={servicesStats}
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <LogsByService
                sx={{ height: '100%' }}
              />
            </Grid>

            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <Typography style={{ color: '#FFFFFF' }}>
                Web Services
              </Typography>
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StatBox
                label="Logs flagged this week"
                value="89"
                comparisonLabel="Compared to last week"
                comparisonValue="12"
              />
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StatBox
                label="Logs flagged this week"
                value="89"
                comparisonLabel="Compared to last week"
                comparisonValue="12"
              />
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StatBox
                label="Logs flagged this week"
                value="89"
                comparisonLabel="Compared to last week"
                comparisonValue="12"
              />
            </Grid>

            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <Typography style={{ color: '#FFFFFF' }}>
                SSH
              </Typography>
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StatBox
                label="Logs flagged this week"
                value="89"
                comparisonLabel="Compared to last week"
                comparisonValue="12"
              />
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StatBox
                label="Logs flagged this week"
                value="89"
                comparisonLabel="Compared to last week"
                comparisonValue="12"
              />
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StatBox
                label="Logs flagged this week"
                value="89"
                comparisonLabel="Compared to last week"
                comparisonValue="12"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
