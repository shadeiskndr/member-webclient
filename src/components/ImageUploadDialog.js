import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageUploadDialog = ({ imageDialogOpen, imageCloseDialog, selectedMember, handleImageUploadSave }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [imgSrc, setImgSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 50,
    aspect: 1 / 1,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'image/jpeg') {
        setError('Only JPEG images are allowed.');
        setSelectedFile(null);
        setImgSrc(null);
      } else if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB.');
        setSelectedFile(null);
        setImgSrc(null);
      } else {
        setError('');
        setSelectedFile(file);
        const reader = new FileReader();
        reader.addEventListener('load', () => setImgSrc(reader.result));
        reader.readAsDataURL(file);
      }
    }
  };

  const getCroppedImg = async (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 1);
    });
  };

  const handleUpload = async () => {
    if (imgSrc && completedCrop) {
      const image = document.querySelector('.crop-image');
      const croppedImage = await getCroppedImg(image, completedCrop);
      const croppedFile = new File([croppedImage], selectedFile.name, { type: 'image/jpeg' });
      handleImageUploadSave(selectedMember.id, croppedFile);
    }
  };

  const resetState = () => {
    setSelectedFile(null);
    setError('');
    setImgSrc(null);
    setCrop({
      unit: '%',
      width: 50,
      aspect: 1 / 1,
    });
    setCompletedCrop(null);
  };

  const handleClose = () => {
    resetState();
    imageCloseDialog();
  };

  return (
    <Dialog open={imageDialogOpen} onClose={imageCloseDialog} maxWidth="md" fullWidth>
      <DialogTitle>Upload Profile Image</DialogTitle>
      <DialogContent>
        <TextField
          type="file"
          inputProps={{ accept: 'image/jpeg' }}
          onChange={handleFileChange}
          fullWidth
          variant="filled"
          helperText={error || 'Select a JPEG image under 10MB.'}
          error={!!error}
        />
        {imgSrc && (
          <div style={{ marginTop: '20px' }}>
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              circularCrop
            >
              <img src={imgSrc} className="crop-image" alt="Crop" style={{ maxWidth: '100%' }} />
            </ReactCrop>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button 
          onClick={handleUpload} 
          color="primary" 
          disabled={!imgSrc || !completedCrop || !!error}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageUploadDialog;
