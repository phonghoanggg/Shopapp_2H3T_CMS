import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Container,
  // Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  selectCategories,
} from "../../../feature/category/sliceCategory";
import { addproduct } from "../../../feature/product/productSlice";
import { arrDiscount } from "../constant";
import ImageUploader from "../../../components/uploadImage/ImageUploader";
import { selectImages, selectLoading } from "../../../feature/image/imageSlice";
import BlockUI from "../../../components/Loader/BlockUI";
import { useSnackbarAlert } from "../../../components/Notification/useSnackbarAlert";
import { useNavigate } from "react-router-dom";
const CreateProduct = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const imagesLocal = useSelector(selectImages);
  const loading = useSelector(selectLoading);
  const { showSnackbar, SnackbarAlert } = useSnackbarAlert();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const imagesFromData = data.images.split(",").map((url) => ({
      url: url.trim(),
    }));
    const images = [
      ...imagesFromData,
      ...imagesLocal.map((image) => ({
        "url": image.url,
        "publicId": image.publicId || null,
      })),
    ]
    const formData = {
      ...data,
      images,
      size: ["S", "M", "L", "XL"],
    };
    dispatch(addproduct(formData));
    showSnackbar('Cập nhật thành công!', 'success');
    setTimeout(() => {
      navigate('/product');
    }, 1000);
  };
  return (
    <BlockUI blocking={loading} >
      <Container maxWidth="md">
        <Typography className="pt-5" variant="h4" gutterBottom>
          Create Product
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <TextField
                label="Product Name"
                fullWidth
                {...register("name", { required: "Product name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                label="Description"
                fullWidth
                {...register("description", {
                  required: "Description is required",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
              <TextField
                label="Price"
                fullWidth
                type="number"
                {...register("price", { required: "Price is required" })}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
              <TextField
                label="Category"
                fullWidth
                select
                {...register("category", { required: "Category is required" })}
                error={!!errors.category}
                helperText={errors.category?.message}
              >
                {categories?.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Image URLs (comma separated)"
                fullWidth
                multiline
                rows={4}
                {...register("images", {
                  required: "At least one Image URL is required",
                  validate: (value) => {
                    const urls = value.split(",").map((url) => url.trim());
                    return urls.every((url) => url.startsWith("http")) || "Invalid URL format";
                  },
                })}
                error={!!errors.images}
                helperText={errors.images?.message}
              />
              <TextField
                label="Stock"
                fullWidth
                type="number"
                {...register("stock", { required: "Stock quantity is required" })}
                error={!!errors.stock}
                helperText={errors.stock?.message}
              />
              <TextField
                label="Discount"
                fullWidth
                select
                {...register("discount", { required: "Discount is required" })}
                error={!!errors.discount}
                helperText={errors.discount?.message}
              >
                {arrDiscount?.map((discount, index) => (
                  <MenuItem key={index} value={discount.value}>
                    {discount.label}
                  </MenuItem>
                ))}
              </TextField>
          <ImageUploader />
          <div className="pt-5">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Create Product
            </Button>
          </div>
        </form>
        <SnackbarAlert/>
      </Container>
    </BlockUI>
  );
};

export default CreateProduct;
