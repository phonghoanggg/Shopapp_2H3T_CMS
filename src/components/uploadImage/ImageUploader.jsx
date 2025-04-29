import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ImageList, ImageListItem, IconButton, Snackbar, Alert, Dialog, DialogContent, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { addImages, deleteImage } from '../../feature/image/imageSlice';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ImageUploader = (pros) => {
  const dispatch = useDispatch();
  console.log("pros", pros.imageUrlArr)
  const [images, setImages] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  // preview image
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
   // Hàm mở dialog và hiển thị ảnh
   const handlePreview = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  // Hàm đóng dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Chuyển sang ảnh trước
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Chuyển sang ảnh tiếp theo
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  return (
    <div className='pt-5'>
      <Button variant="contained" component="label">
        Upload
        <input type="file" multiple hidden onChange={handleUpload} />
      </Button>

      <ImageList cols={3} rowHeight={160} sx={{ mt: 2 }}>
        {images.map((img, index) => (
          <ImageListItem key={img.publicId} onClick={() => handlePreview(index)}>
            <img
              src={img.url}
              alt={img.publicId}
              loading="lazy"
              style={{ cursor: "pointer" }}
            />
            <IconButton
              sx={{ position: "absolute", top: 5, right: 5, bgcolor: "white" }}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(img.publicId);
              }}
              size="small"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ImageListItem>
        ))}
      </ImageList>

      {/* Dialog hiển thị ảnh với hiệu ứng slide */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogContent sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Nút quay lại */}
          <Button onClick={handlePrev} sx={{ position: "absolute", left: 10 }}>
            <ArrowBackIosIcon />
          </Button>

          {/* Hình ảnh */}
          <Box>
            <img
              src={images[currentIndex]?.url}
              alt={images[currentIndex]?.publicId}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "600px",
                transition: "transform 0.3s ease-in-out", // Hiệu ứng chuyển đổi
              }}
            />
          </Box>

          {/* Nút tiếp theo */}
          <Button onClick={handleNext} sx={{ position: "absolute", right: 10 }}>
            <ArrowForwardIosIcon/>
          </Button>
        </DialogContent>
      </Dialog>
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
