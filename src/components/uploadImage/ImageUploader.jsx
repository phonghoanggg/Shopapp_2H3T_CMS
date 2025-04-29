import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ImageList, ImageListItem, IconButton, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { addImages, deleteImage } from '../../feature/image/imageSlice';

const ImageUploader = (pros) => {
  const dispatch = useDispatch();
  console.log("pros", pros.imageUrlArr)
  // const imagesFromRedux = useSelector(selectImages);
  const [images, setImages] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Khi pros.imageUrlArr thay đổi thì cập nhật vào state images
  useEffect(() => {
    if (pros.imageUrlArr && pros.imageUrlArr.length) {
      setImages(pros.imageUrlArr);
    }
  }, [pros.imageUrlArr]);
  useEffect(() => {
    pros.handleUpdateImageArr && pros.handleUpdateImageArr(images)
  },[images])

  // Khi upload ảnh xong, thêm ảnh vào state images
  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const formData = new FormData();
    for (let file of files) {
      formData.append('images', file);
    }

    const resultAction = await dispatch(addImages(formData));
    if (addImages.fulfilled.match(resultAction)) {
      setSnackbar({ open: true, message: 'Upload thành công!', severity: 'success' });
      // Cập nhật state images với ảnh vừa upload
      setImages((prev) => [...prev, ...resultAction.payload]);
    } else {
      setSnackbar({ open: true, message: 'Upload thất bại!', severity: 'error' });
    }
  };

  const handleDelete = async (publicId) => {
    const resultAction = await dispatch(deleteImage(publicId));
    if (deleteImage.fulfilled.match(resultAction)) {
      setSnackbar({ open: true, message: 'Xoá ảnh thành công!', severity: 'success' });
      setImages((prev) => prev.filter((img) => img.publicId !== publicId));
    } else {
      setSnackbar({ open: true, message: 'Xoá ảnh thất bại!', severity: 'error' });
    }
  };

  return (
    <div className='pt-5'>
      <Button variant="contained" component="label">
        Upload
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
