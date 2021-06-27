import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Chip,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const LogsResults = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton color="inherit" aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{row.app}</TableCell>
        <TableCell align="right">{row.host}</TableCell>
        <TableCell align="right">{new Date(row.date * 1000).toLocaleString('fr-FR')}</TableCell>
        <TableCell align="right">
          {row.tag.map((tag) => (
            <Chip label={tag} />
          ))}
        </TableCell>
      </TableRow>
      <TableRow style={{ backgroundColor: '#35373C' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableBody>
                  {Object.entries(row.data[0]).map((value) => (
                    <TableRow>
                      <TableCell>{value[0]}</TableCell>
                      <TableCell>{value[1]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

LogsResults.propTypes = {
  row: PropTypes.shape({
    app: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    tag: PropTypes.array.isRequired
  }).isRequired,
};

export default LogsResults;
