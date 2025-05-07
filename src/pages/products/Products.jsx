import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteproduct,
  fetchproducts,
  selectproducts,
  selectTotalProducts,
} from "../../feature/product/productSlice";
import BlockUI from "../../components/Loader/BlockUI";
import ConfirmDialog from "../../components/Modal/ModalConfirm";
import { IconButton, Typography } from "@mui/material";
import { selectCategories } from "../../feature/category/sliceCategory";
// import BlockUI from "../../components/Loader/BlockUI";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectproducts);
  const totalProducts = useSelector(selectTotalProducts);
  const categories = useSelector(selectCategories);
  
  const loading = useSelector((state) => state.product.loading);
  const [page, setPage] = useState(1);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const pageSize = 10;
  const handleOpenConfirm = (index) => {
    setDeleteIndex(index);
    setOpenConfirm(true);
  };
  
  useEffect(() => {
    dispatch(fetchproducts({ page, limit: pageSize }));
  }, [dispatch, page]);

  const handleConfirmDelete = async() => { 
    await dispatch(deleteproduct(deleteIndex));
    dispatch(fetchproducts({ page, limit: pageSize }));
  }

  if (loading) {
    return <BlockUI blocking={loading} />;
  }
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "discount", headerName: "Discount", flex: 1 },
    { field: "newprice", headerName: "Newprice", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "images",
      headerName: "Image",
      flex: 2,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          {params.value?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              style={{ width: "50px", height: "50px", minWidth:"50px", marginRight: "5px", objectFit:"cover", borderRadius:"4px"}}
            />
          ))}
        </div>
      ),
    },
    { field: "stock", headerName: "Stock", flex: 1 },
    {
      field: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Grid container spacing={1}>
          <Grid item>
            <IconButton
              onClick={() => handleOpenConfirm(params.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              component={Link}
              to={`/product/update/${params.id}`}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ),
    },
  ]; 
  console.log("categories11", categories);
  const rows =
    products && Array.isArray(products)
      ? products.map((product) => ({
          id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          discount: `${(product.discount ? product.discount : 0) * 100}%`,
          newprice: product.discount ? ((product.price - (product.price*product.discount))) : product.price,
          category: categories?.find((item) => item._id === product.category)?.name,
          images: product.images?.map((item) => item.url) ,
          stock: product.stock,
        }))
      : [];

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  console.log("products1111",products,categories)
  return (
     <div className="w-full flex justify-center">
       <div
        style={{
          marginTop: "80px",
          height: "100%",
          width: "98%",
        }}
      >
        <Typography className="pt-5" variant="h4" gutterBottom>
          List Product
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          pagination
          sx={{
            "& .MuiTablePagination-root": {
              display: "none",
            },
          }}
        />
        <Pagination
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          count={Math.ceil(totalProducts / pageSize)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ marginTop: 2 }}
        />
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
     </div>
      
  );
};

export default Product;
