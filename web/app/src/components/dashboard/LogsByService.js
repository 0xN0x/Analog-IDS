import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  colors,
  useTheme
} from '@material-ui/core';

const LogsByService = (props) => {
  const theme = useTheme();

  const {
    values,
    labels,
  } = props;

  const data = {
    datasets: [
      {
        data: values,
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
          colors.blue[600],
          colors.green[600]
        ],
        borderWidth: 2,
        borderColor: colors.grey[800],
        hoverBorderColor: colors.grey[800]
      }
    ],
    labels
  };

  const options = {
    animation: false,
    cutoutPercentage: 70,
    layout: {
      padding: {
        top: 100
      }
    },
    legend: {
      display: true,
      position: 'bottom'
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        title="Logs by services (today)"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

LogsByService.propTypes = {
  values: PropTypes.array,
  labels: PropTypes.array,
};

export default LogsByService;
