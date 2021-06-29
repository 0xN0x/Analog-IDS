import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  TextField,
  Select,
  OutlinedInput,
  MenuItem,
  Switch,
  ListItemText,
  FormControl,
  FormControlLabel,
  InputLabel
} from '@material-ui/core';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import axios from 'axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const LogsToolbar = (props) => {
  const {
    AfterValue,
    setAfterValue,
    BeforeValue,
    setBeforeValue,
    services,
    setServices,
    flagedOnly,
    setFlagedOnly
  } = props;

  const [serviceListIsUpdated, setserviceListIsUpdated] = useState(false);
  const [servicesList, setServicesList] = useState([]);

  const afterChanged = async (event) => {
    setAfterValue(event);
  };

  const beforeChanged = async (event) => {
    setBeforeValue(event);
  };

  const servicesChanged = async (event) => {
    setServices(event.target.value);
  };

  const flaggedChanged = async (event) => {
    setFlagedOnly(event.target.checked);
  };

  if (!serviceListIsUpdated) {
    axios.get('/api/logs/services').then((res) => {
      setserviceListIsUpdated(true);
      setServicesList(res.data);
    });
  }

  return (
    <Box {...props}>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <FormControl sx={{ m: 1, width: 300 }}>
              <DateTimePicker
                clearable
                label="From"
                value={AfterValue}
                onChange={afterChanged}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: 300 }}>
              <DateTimePicker
                clearable
                label="To"
                value={BeforeValue}
                onChange={beforeChanged}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="service-select-label">Service(s)</InputLabel>
              <Select
                labelId="service-select-label"
                id="service-select"
                multiple
                value={services}
                onChange={servicesChanged}
                input={<OutlinedInput label="Service(s)" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {servicesList.map((service) => (
                  <MenuItem key={service} value={service}>
                    <Checkbox checked={services.indexOf(service) > -1} />
                    <ListItemText primary={service} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              style={{
                paddingTop: '15px',
                paddingLeft: '20px',
              }}
            >
              <FormControlLabel
                control={
                  <Switch checked={flagedOnly} onChange={flaggedChanged} name="Flagged Only" />
                }
                label="Flagged Only"
              />
            </FormControl>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

LogsToolbar.propTypes = {
  AfterValue: PropTypes.number,
  setAfterValue: PropTypes.func,
  BeforeValue: PropTypes.number,
  setBeforeValue: PropTypes.func,
  services: PropTypes.number,
  setServices: PropTypes.func,
  flagedOnly: PropTypes.bool,
  setFlagedOnly: PropTypes.func,
};

export default LogsToolbar;
