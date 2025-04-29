import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateproduct } from "../../../feature/product/productSlice";
import {
  fetchCategories,
  selectCategories,
} from "../../../feature/category/sliceCategory";
import { useNavigate, useParams } from "react-router-dom";
import { arrDiscount } from "../constant";
import { useSnackbarAlert } from "../../../components/Notification/useSnackbarAlert";
import ImageUploader from "../../../components/uploadImage/ImageUploader";
import { Button, IconButton } from "@mui/material";
import { selectLoading } from "../../../feature/image/imageSlice";
import BlockUI from "../../../components/Loader/BlockUI";
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from "../../../components/Modal/ModalConfirm";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { showSnackbar, SnackbarAlert } = useSnackbarAlert();
  const navigate = useNavigate();
  const product = useSelector((state) =>
    state.product.products.products?.find((prod) => prod._id === id)
  );
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectLoading);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);


  useEffect(() => {
    dispatch(fetchCategories());
  }, [product]);
  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    stock: 0,
    imagesOnline: [],
    imagesLocal: [],
    discount: 0,
    price: 0,
    newprice: 0,
    category: "",
  });

  useEffect(() => {
    if (product) {
      setProductInfo({
        name: product.name,
        description: product.description,
        stock: product.stock,
        imagesOnline: product.images.filter((item) => !item.publicId),
        imagesLocal: product.images.filter((item) => item.publicId),
        price: product.price,
        discount: product.discount,
        newprice: product.newprice,
        category: product.category,
      });
    }
  }, [product]);
  const handleUpdateImageArr = (value) => {
    setProductInfo((pre) => ({...pre, imagesLocal: value}))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { name, description, stock, price, discount, category } = productInfo;
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      stock <= 0 ||
      price <= 0
    ) {
      return;
    }
    const images = [
      ...productInfo.imagesOnline,
      ...productInfo.imagesLocal
    ]
    const newprice = price - (price*discount)
    const updatedProduct = {
      _id: id,
      name,
      description,
      stock,
      images,
      price,
      discount,
      newprice,
      category,
    };
    try {
      await dispatch(updateproduct(updatedProduct))
      showSnackbar('Cập nhật thành công!', 'success');
      setTimeout(() => {
        navigate('/product');
      }, 1000);
    } catch (error) {
      showSnackbar('Cập nhật thất bại!', 'error');
    }
  };

  if (!product) {
    return <div>Product not found.</div>;
  }
  const handleImageUrlChange = (index, newUrl) => {
    const updatedImages = productInfo.imagesOnline.map((img, i) =>
      i === index ? { ...img, url: newUrl } : img
    );
    setProductInfo({ ...productInfo, imagesOnline: updatedImages });
  };
  const handleAddImageUrl = () => {
    const newImage = {
      id: Date.now().toString(), // hoặc dùng uuid nếu thích
      url: ""
    };
    setProductInfo({
      ...productInfo,
      imagesOnline: [...productInfo.imagesOnline, newImage],
    });
  };
  const handleOpenConfirm = (index) => {
    setDeleteIndex(index);
    setOpenConfirm(true);
  };
  
  const handleConfirmDelete = () => {
    setProductInfo(prev => ({
      ...prev,
      imagesOnline: prev.imagesOnline.filter((_, i) => i !== deleteIndex)
    }));
    setOpenConfirm(false);
  };
  console.log("productInfo",productInfo)
  return (
    <BlockUI blocking={loading} >
      <div className="p-6 bg-white rounded shadow">
        <h2 className="mb-4 text-2xl font-semibold">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">
              Product Name
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              value={productInfo.name}
              onChange={(e) =>
                setProductInfo({ ...productInfo, name: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">
              Description
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              value={productInfo.description}
              onChange={(e) =>
                setProductInfo({ ...productInfo, description: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">
              Stock
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              value={productInfo.stock}
              onChange={(e) =>
                setProductInfo({ ...productInfo, stock: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">
              Image URL
            </label>
            {productInfo.imagesOnline.map((item, index) => (
              <div key={item._id} className="border p-3 rounded mt-2 mb-2">
                <div className="flex justify-between">
                <label className="block mb-2 font-semibold text-gray-700">
                  Image URL {index + 1}
                </label>
                  <IconButton
                    sx={{bgcolor: 'white' }}
                    onClick={() => handleOpenConfirm(index)}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="3"
                  defaultValue={item.url}
                  onBlur={(e) => handleImageUrlChange(index, e.target.value)}
                />
                {
                  item.url &&
                  <img
                    className="h-40 w-auto mt-3 border rounded"
                    src={item.url.trim()}
                    alt={`Image ${index + 1}`}
                  />
                }
              </div>
            ))}
            <div className="pt-5">
            <Button variant="contained" onClick={handleAddImageUrl} >
              Add url image
            </Button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">
              Price
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              value={productInfo.price}
              onChange={(e) =>
                setProductInfo({ ...productInfo, price: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">
              Discount
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={productInfo.discount ?? 0}
              onChange={(e) =>
                setProductInfo({ ...productInfo, discount: Number(e.target.value) })
              }
            >
              <option value={0}>0%</option>
              {arrDiscount.map((discount, index) => (
                <option key={index} value={discount.value}>
                  {discount.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">
              Category
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={productInfo.category}
              onChange={(e) =>
                setProductInfo({ ...productInfo, category: e.target.value })
              }
            >
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <ImageUploader imageUrlArr={productInfo.imagesLocal} handleUpdateImageArr={handleUpdateImageArr} />

          <div className="pt-5">
            <Button type="submit" variant="contained" className="pt-5">
              Update Product
            </Button>
          </div>
        </form>
        <SnackbarAlert />
        <ConfirmDialog
          open={openConfirm}
          title="Confirmation of product deletion"
          message="Are you sure you want to delete this product ?"
          onCancel={() => setOpenConfirm(false)}
          onConfirm={handleConfirmDelete}
          confirmText="YES"
          cancelText="NO"
        />
      </div>
    </BlockUI>
  );
};

export default UpdateProduct;
