import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid
} from '@material-ui/core';
import axios from 'axios';
import Budget from 'src/components/dashboard//Budget';
import LogsByDays from 'src/components/dashboard/LogsByDays';
import TasksProgress from 'src/components/dashboard//TasksProgress';
import TotalCustomers from 'src/components/dashboard//TotalCustomers';
import TotalProfit from 'src/components/dashboard//TotalProfit';
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
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Budget />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalCustomers />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalProfit sx={{ height: '100%' }} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TasksProgress />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <LogsByDays />
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
                servicesStats={servicesStats}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
