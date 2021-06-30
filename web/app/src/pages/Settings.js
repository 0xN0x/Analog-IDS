import { Helmet } from 'react-helmet';

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

      </Container>
    </Box>
  </>
);

export default SettingsView;
