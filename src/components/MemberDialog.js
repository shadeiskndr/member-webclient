import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

const MemberDialog = ({ dialogOpen, closeDialog, selectedMember, handleChange, handleSaveMember, validationErrors }) => {
  return (
    <Dialog open={dialogOpen} onClose={closeDialog}>
      <DialogTitle>{selectedMember?.id ? 'Update Membership Details ' : 'Create Member'}</DialogTitle>
      <DialogContent>
        {selectedMember && (
          <form>
          <TextField
            margin="dense"
            label="First Name"
            type="text"
            name="firstN"
            value={selectedMember.firstN}
            onChange={handleChange}
            fullWidth
            variant="filled"
            error={!!validationErrors.firstN}
            helperText={validationErrors.firstN}
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            name="lastN"
            value={selectedMember.lastN}
            onChange={handleChange}
            fullWidth
            variant="filled"
            error={!!validationErrors.lastN}
            helperText={validationErrors.lastN}
          />
          <TextField
            margin="dense"
            label="Username"
            type="text"
            name="username"
            value={selectedMember.username}
            onChange={handleChange}
            fullWidth
            variant="filled"
            error={!!validationErrors.username}
            helperText={validationErrors.username}
          />
          <TextField
            margin="dense"
            label="Email Address"
            type="text"
            name="email"
            value={selectedMember.email}
            onChange={handleChange}
            fullWidth
            variant="filled"
            error={!!validationErrors.email}
            helperText={validationErrors.email}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            name="phone"
            value={selectedMember.phone}
            onChange={handleChange}
            fullWidth
            variant="filled"
            error={!!validationErrors.phone}
            helperText={validationErrors.phone}
          />
          <TextField
            margin="dense"
            label="Location Address"
            type="text"
            name="address"
            value={selectedMember.address}
            onChange={handleChange}
            fullWidth
            variant="filled"
            error={!!validationErrors.address}
            helperText={validationErrors.address}
          />
          <TextField
            margin="dense"
            label="Date of Birth"
            type="date"
            name="dob"
            value={selectedMember.dob}
            onChange={handleChange}
            fullWidth
            variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
            error={!!validationErrors.dob}
            helperText={validationErrors.dob}
          />
          <FormControl fullWidth margin="dense" variant="filled" error={!!validationErrors.type}>
            <InputLabel>Membership Type</InputLabel>
            <Select
              name="type"
              value={selectedMember.type}
              onChange={handleChange}
            >
              <MenuItem value="Bronze">Bronze</MenuItem>
              <MenuItem value="Silver">Silver</MenuItem>
              <MenuItem value="Gold">Gold</MenuItem>
              <MenuItem value="Platinum">Platinum</MenuItem>
            </Select>
            {validationErrors.type && <FormHelperText>{validationErrors.type}</FormHelperText>}
          </FormControl>
          <TextField
            margin="dense"
            label="Membership Duration (months)"
            type="number"
            name="duration"
            value={selectedMember.duration}
            onChange={handleChange}
            fullWidth
            variant="filled"
            error={!!validationErrors.duration}
            helperText={validationErrors.duration}
          />
          <TextField
            margin="dense"
            label="Membership Join Date"
            type="date"
            name="joinDate"
            value={selectedMember.joinDate}
            onChange={handleChange}
            fullWidth
            variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
            error={!!validationErrors.joinDate}
            helperText={validationErrors.joinDate}
          />
          
          {/* Add more fields as needed */}
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveMember} color="primary">
          {selectedMember?.id ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemberDialog;
