import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import DescriptionIcon from '@material-ui/icons/Description';

const TotalProfit = (props) => (
  <Card {...props}>
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
            Logs today
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            243
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              color: '#e0e0e0',
              backgroundColor: indigo[600],
              height: 56,
              width: 56
            }}
          >
            <DescriptionIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default TotalProfit;
