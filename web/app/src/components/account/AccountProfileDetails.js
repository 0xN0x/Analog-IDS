import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Snackbar
} from '@material-ui/core';
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AccountProfileDetails = () => {
  const [successOpen, setSuccessOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') return;

    setSuccessOpen(false);
  };

  return (
    <Card>
      <Formik
        initialValues={{
          id: JSON.parse(localStorage.getItem('user')).id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          password: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255)
        })}
        onSubmit={(values) => {
          axios.post('/api/account', values).then(async (response) => {
            localStorage.setItem('user', JSON.stringify(response.data.data));

            setSuccessOpen(true);
          });

          return false;
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="First name"
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.firstname}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Last name"
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.lastname}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="New password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              <Button
                color="primary"
                disabled={isSubmitting}
                variant="contained"
                type="submit"
              >
                Save details
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success">
          Details saved
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default AccountProfileDetails;
