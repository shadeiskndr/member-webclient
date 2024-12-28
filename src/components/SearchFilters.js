import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Box
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DateRangeField from './DateRangeField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';


const SearchFilters = ({ searchField, setSearchField, searchParams, setSearchParams, handleSearch, resetAll }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>Search Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {/* Main Search Field */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Search by</InputLabel>
                  <Select
                    value={searchField}
                    label="Search by"
                    onChange={(e) => setSearchField(e.target.value)}
                  >
                    <MenuItem value="id">ID</MenuItem>
                    <MenuItem value="firstN">First Name</MenuItem>
                    <MenuItem value="lastN">Last Name</MenuItem>
                    <MenuItem value="username">Username</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="phone">Phone</MenuItem>
                    <MenuItem value="address">Address</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Search"
                  value={searchParams[searchField]}
                  onChange={(e) => setSearchParams({ ...searchParams, [searchField]: e.target.value })}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Membership Details */}
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Membership Type</InputLabel>
              <Select
                value={searchParams.type}
                label="Membership Type"
                onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Bronze">Bronze</MenuItem>
                <MenuItem value="Silver">Silver</MenuItem>
                <MenuItem value="Gold">Gold</MenuItem>
                <MenuItem value="Platinum">Platinum</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Membership Status</InputLabel>
              <Select
                value={searchParams.status}
                label="Membership Status"
                onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="number"
              label="Age"
              value={searchParams.age}
              onChange={(e) => setSearchParams({ ...searchParams, age: e.target.value })}
              InputProps={{ inputProps: { min: 18, max: 70 } }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="number"
              label="Duration (Months)"
              value={searchParams.duration}
              onChange={(e) => setSearchParams({ ...searchParams, duration: e.target.value })}
              InputProps={{ inputProps: { min: 6, max: 36 } }}
            />
          </Grid>

          {/* Date Ranges */}
        <Grid item xs={12} md={4}>
          <DateRangeField
            title="Date of Birth Range"
            startDate={searchParams.dobStart}
            endDate={searchParams.dobEnd}
            onStartChange={(date) => setSearchParams({ ...searchParams, dobStart: date })}
            onEndChange={(date) => setSearchParams({ ...searchParams, dobEnd: date })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <DateRangeField
            title="Join Date Range"
            startDate={searchParams.joinDateStart}
            endDate={searchParams.joinDateEnd}
            onStartChange={(date) => setSearchParams({ ...searchParams, joinDateStart: date })}
            onEndChange={(date) => setSearchParams({ ...searchParams, joinDateEnd: date })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <DateRangeField
            title="Expiration Date Range"
            startDate={searchParams.expirationDateStart}
            endDate={searchParams.expirationDateEnd}
            onStartChange={(date) => setSearchParams({ ...searchParams, expirationDateStart: date })}
            onEndChange={(date) => setSearchParams({ ...searchParams, expirationDateEnd: date })}
          />
        </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                sx={{ mr: 1 }}
              >
                Search
              </Button>
              <Button
                variant="contained"
                color="warning"
                startIcon={<ClearIcon />}
                onClick={resetAll}
              >
                Clear Fields
              </Button>
            </Box>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
    </LocalizationProvider>
  );
};

export default SearchFilters;
