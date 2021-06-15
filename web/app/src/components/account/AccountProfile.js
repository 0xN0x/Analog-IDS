import moment from 'moment';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';

const user = JSON.parse(localStorage.getItem('user'));

const AccountProfile = (props) => (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={`https://ui-avatars.com/api/?name=${user.firstname}-${user.lastname}&size=100`}
          sx={{
            height: 100,
            width: 100
          }}
        />
        <br />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {`${user.firstname} ${user.lastname}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${moment().format('dd/mm/yyyy hh:mm A')}`}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default AccountProfile;
