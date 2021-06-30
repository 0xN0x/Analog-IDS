import { Helmet } from 'react-helmet';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
} from '@material-ui/core';

const SettingsView = () => (
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
      <Container maxWidth={false}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            axios.delete('/api/logs');
          }}
        >
          Clear logs
        </Button>
      </Container>
    </Box>
  </>
);

export default SettingsView;
