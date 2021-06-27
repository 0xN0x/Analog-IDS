import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import LogsResults from 'src/components/logs/LogsResults';
import React, { useState, useEffect } from 'react';
import socket from 'src/services/socket';
import LogsToolbar from 'src/components/logs/LogsToolbar';
import axios from 'axios';

const CustomerList = () => {
  const [data, setData] = useState([]);
  const [AfterValue, setAfterValue] = useState(null);
  const [BeforeValue, setBeforeValue] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    socket.on('log', (message) => {
      setData((prevData) => [message, ...prevData]);
    });
  }, []);

  useEffect(() => {
    axios.get('/api/logs', {
      params: {
        after: AfterValue ? Math.floor(AfterValue / 1000) : undefined,
        before: BeforeValue ? Math.floor(BeforeValue / 1000) : undefined,
        services: services.join(',')
      }
    }).then((res) => {
      setData(res.data);
    });
  }, [AfterValue, BeforeValue, services]);

  return (
    <>
      <Helmet>
        <title>Logs | Analog</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <LogsToolbar
            AfterValue={AfterValue}
            setAfterValue={setAfterValue}
            BeforeValue={BeforeValue}
            setBeforeValue={setBeforeValue}
            services={services}
            setServices={setServices}
          />
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>App</TableCell>
                  <TableCell align="right">Host</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Flags</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <LogsResults key={row.id} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </>
  );
};

export default CustomerList;
