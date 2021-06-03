import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SettingsNotifications from 'src/components/settings/SettingsNotifications';
import SettingsPassword from 'src/components/settings/SettingsPassword';
import socket from 'src/services/socket';
import { useState, useEffect } from 'react';

const SettingsView = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.emit('hello');
    setConnected(true);
    console.log(connected);
  }, []);

  return (
    <>
      <Helmet>
        <title>Settings | Analog</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <SettingsNotifications />
          <Box sx={{ pt: 3 }}>
            <SettingsPassword />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SettingsView;
