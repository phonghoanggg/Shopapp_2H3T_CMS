import { useState } from 'react';
import axios from 'axios';
import { Button, ImageList, ImageListItem, IconButton, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const formData = new FormData();
    for (let file of files) {
      formData.append('images', file);
    }

    try {
      const res = await axios.post('http://localhost:5000/image/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setImages((prev) => [...prev, ...res.data.data]);
      setSnackbar({ open: true, message: 'Upload thành công!', severity: 'success' });
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Upload thất bại!', severity: 'error' });
    }
  };

  const handleDelete = async (publicId) => {
    try {
      await axios.delete(`http://localhost:5000/image/delete?publicId=${publicId}`);
      setImages((prev) => prev.filter((img) => img.publicId !== publicId));
      setSnackbar({ open: true, message: 'Xoá ảnh thành công!', severity: 'success' });
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Xoá ảnh thất bại!', severity: 'error' });
    }
  };
  console.log("images111",images)
  return (
    <div className='pt-5'>
      <Button variant="contained" component="label">
        Chọn ảnh
        <input type="file" multiple hidden onChange={handleUpload} />
      </Button>

      <ImageList cols={3} rowHeight={160} sx={{ mt: 2 }}>
        {images.map((img) => (
          <ImageListItem key={img.publicId}>
            <img src={img.url} alt={img.publicId} loading="lazy" />
            <IconButton
              sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'white' }}
              onClick={() => handleDelete(img.publicId)}
              size="small"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ImageListItem>
        ))}
      </ImageList>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ImageUploader;
