import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import HttpIcon from '@material-ui/icons/Http';
import { red } from '@material-ui/core/colors';

const Budget = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            HTTP Connections
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            35
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              color: '#e0e0e0',
              backgroundColor: red[600],
              height: 56,
              width: 56
            }}
          >
            <HttpIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowDownwardIcon sx={{ color: red[900] }} />
        <Typography
          sx={{
            color: red[900],
            mr: 1
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Compared to last week average
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default Budget;
