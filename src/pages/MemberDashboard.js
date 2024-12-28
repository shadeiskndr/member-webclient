import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import MemberTable from './../components/MemberTable';
import MemberDialog from './../components/MemberDialog';
import SearchFilters from './../components/SearchFilters';
import { useSelector } from 'react-redux';
import ImageUploadDialog from '../components/ImageUploadDialog';

function MemberDashboard() {
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const [members, setMembers] = useState([]);
  const [searchField, setSearchField] = useState('id');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchParams, setSearchParams] = useState({
    id: '',
    firstN: '',
    lastN: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    type: '',
    status: '',
    age: '',
    duration: '',
    dobStart: '',
    dobEnd: '',
    joinDateStart: '',
    joinDateEnd: '',
    expirationDateStart: '',
    expirationDateEnd: ''
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const openDialog = async (id = null) => {
    if (id) {
      try {
        const response = await axios.get(`http://localhost:8080/api/members/${id}`);
        setSelectedMember(response.data);
      } catch (error) {
        console.error('Error fetching member:', error);
      }
    } else {
      setSelectedMember({
        firstN: '',
        lastN: '',
        username: '',
        email: '',
        phone: '',
        address: '',
        dob: '',
        type: '',
        duration: '',
        joinDate: ''
      });
    }
    setDialogOpen(true);
  };

  const openImageUploadDialog = async (id = null) => {
    if (id) {
        try {
            const response = await axios.get(`http://localhost:8080/api/members/${id}`);
            setSelectedMember(response.data);
          } catch (error) {
            console.error('Error fetching member:', error);
          }
    } else {
        console.error('Member ID is required to upload an image.');
        return;
      }
    setImageDialogOpen(true);
  };

  const imageCloseDialog = () => {
    setImageDialogOpen(false);
    setSelectedMember(null);
  };
  

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedMember(null);
  };

  const handleImageUploadSave = async (memberId, file) => {
    if (!memberId) {
      console.error('Member ID is required to upload an image.');
      return;
    }
  
    if (!file) {
      console.error('No file selected.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const responseImage = await axios.post(`http://localhost:8080/api/members/${memberId}/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully:', responseImage.data);
      setImageDialogOpen(false);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };


  const validateForm = () => {
    const errors = {};
    if (!selectedMember.firstN) {
      errors.firstN = "First Name is required";
    }
    if (!selectedMember.lastN) {
      errors.lastN = "Last Name is required";
    }
    if (!selectedMember.username) {
      errors.username = "Username is required";
    }
    if (!selectedMember.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(selectedMember.email)) {
      errors.email = "Email is invalid";
    }
    if (!selectedMember.phone) {
      errors.phone = "Phone Number is required";
    }
    if (!selectedMember.address) {
      errors.address = "Address is required";
    }
    if (!selectedMember.dob) {
      errors.dob = "Date of Birth is required";
    } else {
      const dobDate = new Date(selectedMember.dob);
      if (dobDate > new Date()) {
        errors.dob = "Date of Birth cannot be in the future";
      }
    }
    const validTypes = ["Bronze", "Silver", "Gold", "Platinum"];
    if (!selectedMember.type) {
      errors.type = "Membership Type is required";
    } else if (!validTypes.includes(selectedMember.type)) {
      errors.type = "Invalid Membership Type selected";
    }
    if (!selectedMember.duration) {
      errors.duration = "Membership Duration is required";
    }
    if (!selectedMember.joinDate) {
      errors.joinDate = "Join Date is required";
    } else {
      const joinDate = new Date(selectedMember.joinDate);
      if (joinDate > new Date()) {
        errors.joinDate = "Join Date cannot be in the future";
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveMember = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      if (selectedMember.id) {
        await axios.put(`http://localhost:8080/api/members/${selectedMember.id}`, selectedMember);
      } else {
        await axios.post('http://localhost:8080/api/members', selectedMember);
      }
      fetchMembers();
      closeDialog();
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedMember({ ...selectedMember, [name]: value });
  };

  const resetSearchParams = () => {
    setSearchParams({
      id: '',
      firstN: '',
      lastN: '',
      username: '',
      email: '',
      phone: '',
      address: '',
      type: '',
      status: '',
      age: '',
      duration: '',
      dobStart: '',
      dobEnd: '',
      joinDateStart: '',
      joinDateEnd: '',
      expirationDateStart: '',
      expirationDateEnd: ''
    });
  };

  const handleSearch = async () => {
    try {
      const filteredParams = Object.fromEntries(
        Object.entries(searchParams).filter(([key, value]) => value !== '')
      );
      const response = await axios.get('http://localhost:8080/api/members/search', { params: filteredParams });
      setMembers(response.data);
    } catch (error) {
      console.error('Error searching members:', error);
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/members/${id}`);
      setMembers(members.filter(member => member.id !== id));
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  return (
    <Box 
      sx={{ 
        mt: 8, 
        p: 3,
        marginLeft: isSidebarOpen ? '56px' : '56px', // Adjusts based on sidebar width
        transition: theme => theme.transitions.create(['margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        width: 'auto',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ overflowX: 'auto' }}>  {/* Allows horizontal scrolling only within the content if needed */}
        <SearchFilters
          searchField={searchField}
          setSearchField={setSearchField}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          handleSearch={handleSearch}
          resetAll={resetSearchParams}
        />
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchMembers}
          >
            Search All
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => openDialog()}
          >
            Create Member
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <MemberTable
            members={members}
            openDialog={openDialog}
            openImageUploadDialog={openImageUploadDialog}
            handleDeleteMember={handleDeleteMember}
          />
        </Box>
      </Box>
      <MemberDialog
        dialogOpen={dialogOpen}
        closeDialog={closeDialog}
        selectedMember={selectedMember}
        handleChange={handleChange}
        handleSaveMember={handleSaveMember}
        validationErrors={validationErrors}
      />

      <ImageUploadDialog
        imageDialogOpen={imageDialogOpen}
        imageCloseDialog={imageCloseDialog}
        selectedMember={selectedMember}
        handleImageUploadSave={handleImageUploadSave}
      />
    </Box>
  );
}

export default MemberDashboard;
