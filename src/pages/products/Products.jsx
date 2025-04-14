import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import {
  deleteproduct,
  fetchproducts,
  selectproducts,
} from "../../feature/product/productSlice";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectproducts);
  const loading = useSelector((state) => state.product.loading);
  const [page, setPage] = useState(1);
  const pageSize = 10; // Set the page size

  useEffect(() => {
    dispatch(fetchproducts({ page, limit: pageSize }));
  }, [dispatch, page]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await dispatch(deleteproduct(id));
      dispatch(fetchproducts({ page, limit: pageSize }));
    }
  };

  if (loading) {
    return <Loader />;
  }

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "newPrice", headerName: "New Price", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "images",
      headerName: "Image",
      flex: 2,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          {params.value.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              style={{ width: "50px", height: "50px", marginRight: "5px" }}
            />
          ))}
        </div>
      ),
    },
    { field: "stock", headerName: "Stock", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Grid container spacing={1}>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDelete(params.id)}
              sx={{
                padding: "6px",
                minWidth: "0",
              }}
            >
              <DeleteIcon fontSize="small" />
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to={`/product/update/${params.id}`}
              variant="outlined"
              color="primary"
              sx={{
                padding: "6px",
                minWidth: "0",
              }}
            >
              <EditIcon fontSize="small" />
            </Button>
          </Grid>
        </Grid>
      ),
    },
  ];

  const rows =
    products && Array.isArray(products)
      ? products.map((product) => ({
          id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          newPrice: product.newprice,
          category: product.category,
          images: product.images,
          stock: product.stock,
        }))
      : [];

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div
      style={{
        marginTop: "80px",
        height: 400,
        width: "100%",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        checkboxSelection
        pagination
        paginationMode="server"
      />
      <Pagination
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        count={8}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginTop: 2 }}
      />
    </div>
  );
};

export default Product;
