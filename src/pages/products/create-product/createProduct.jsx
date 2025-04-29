import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Container,
  Grid,
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
const CreateProduct = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const imagesLocal = useSelector(selectImages);
  const loading = useSelector(selectLoading);

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
        "publicId": image.publicId || null, // Đảm bảo publicId là tùy chọn
      })),
    ]
    console.log("images3333",images)
    const formData = {
      ...data,
      images,
      size: ["S", "M", "L", "XL"],
    };
    console.log("formData111",formData)
    dispatch(addproduct(formData));
    console.log(formData);
  };
  return (
    <BlockUI blocking={loading} >
      <Container maxWidth="md">
        <Typography className="pt-5" variant="h4" gutterBottom>
          Create Product
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Product Name"
                fullWidth
                {...register("name", { required: "Product name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                {...register("description", {
                  required: "Description is required",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                fullWidth
                type="number"
                {...register("price", { required: "Price is required" })}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Image URLs (comma separated)"
                fullWidth
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Stock"
                fullWidth
                type="number"
                {...register("stock", { required: "Stock quantity is required" })}
                error={!!errors.stock}
                helperText={errors.stock?.message}
              />
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
          </Grid>
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
      </Container>
    </BlockUI>
  );
};

export default CreateProduct;
