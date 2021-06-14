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

const CustomerList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on('log', (message) => {
      setData((prevData) => {
        if (prevData.length < 10) {
          return [message, ...prevData];
        }

        return [...prevData];
      });
    });
  }, []);

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
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>App</TableCell>
                  <TableCell align="right">Host</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <LogsResults key={row.id} row={row} />
                )) }
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </>
  );
};

export default CustomerList;
