import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { green, red } from '@material-ui/core/colors';

const StatBox = (props) => {
  const {
    label,
    value,
    comparisonLabel,
    comparisonValue,
  } = props;

  const comparisonValueFixed = (comparisonValue === 0 ? 1 : comparisonValue);

  const percentage = Math.trunc(((value / comparisonValueFixed) % 1) * 100);
  const positive = value / (comparisonValueFixed) > 1;

  console.log(`value : ${value}`);
  console.log(`comparisonValueFixed : ${comparisonValueFixed}`);
  console.log(`Percentage  : ${percentage}`);

  return (
    <Card
      sx={{ height: '100%' }}
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
              {label}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {value}
            </Typography>
          </Grid>
        </Grid>
        {
          comparisonLabel && comparisonValue ? (
            <Box
              sx={{
                pt: 2,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {positive ? (
                <ArrowUpwardIcon sx={{ color: green[900] }} />
              ) : (
                <ArrowDownwardIcon sx={{ color: red[900] }} />
              )}
              <Typography
                sx={{
                  color: positive ? green[900] : red[900],
                  mr: 1
                }}
                variant="body2"
              >
                {`${percentage}%`}
              </Typography>
              <Typography
                color="textSecondary"
                variant="caption"
              >
                {comparisonLabel}
              </Typography>
            </Box>
          ) : ''
        }
      </CardContent>
    </Card>
  );
};

StatBox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  comparisonLabel: PropTypes.string,
  comparisonValue: PropTypes.number,
};

export default StatBox;
