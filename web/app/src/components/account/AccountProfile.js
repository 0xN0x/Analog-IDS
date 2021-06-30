import moment from 'moment';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';

const AccountProfile = (props) => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
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
            src={user.avatar}
            sx={{
              cursor: 'pointer',
              width: 100,
              height: 100
            }}
            mb={2}
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
};

export default AccountProfile;
