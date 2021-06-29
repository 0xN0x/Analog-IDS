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
  const [byService, setByService] = useState([]);
  const [sshLogs, setSshLogs] = useState({});

  useEffect(() => {
    axios.get('/api/logs/stats').then((res) => {
      setServicesStats(res.data.by_days);
      setByService(res.data.by_services);
      setSshLogs(res.data.ssh);
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
                value={servicesStats[0][0]}
                comparisonLabel="Compared to yesterday"
                comparisonValue={servicesStats[0][1]}
              />
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StatBox
                label="Logs flagged today"
                value={servicesStats[1][0]}
                comparisonLabel="Compared to yesterday"
                comparisonValue={servicesStats[1][1]}
              />
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StatBox
                label="Logs this week"
                value={servicesStats[0].reduce((acc, cur) => acc + cur)}
              />
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StatBox
                label="Logs flagged this week"
                value={servicesStats[1].reduce((acc, cur) => acc + cur)}
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
                labels={byService[0]}
                values={byService[1]}
              />
            </Grid>

            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <Typography style={{ color: '#FFFFFF' }}>
                SSH
              </Typography>
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StatBox
                label="Connection success"
                value={sshLogs['accepted password']}
              />
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StatBox
                label="Connection refused"
                value={sshLogs['Authentication failure']}
              />
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <StatBox
                label="Connection failed"
                value={sshLogs['failed password']}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
