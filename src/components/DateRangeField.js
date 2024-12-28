import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

const DateRangeField = ({ title, startDate, endDate, onStartChange, onEndChange }) => {
  const startDateValue = startDate ? dayjs(startDate) : null;
  const endDateValue = endDate ? dayjs(endDate) : null;

  return (
    <>
      <Typography variant="subtitle2" gutterBottom>{title}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <DatePicker
            label="From"
            value={startDateValue}
            onChange={(newValue) => onStartChange(newValue?.format('YYYY-MM-DD'))}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label="To"
            value={endDateValue}
            onChange={(newValue) => onEndChange(newValue?.format('YYYY-MM-DD'))}
            slotProps={{ textField: { fullWidth: true } }}
            minDate={startDateValue}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DateRangeField;
