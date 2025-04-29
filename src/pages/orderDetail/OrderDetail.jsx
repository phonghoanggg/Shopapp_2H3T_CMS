import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import OrderItem from "../../components/orderItem/OrderItem";
import ProductItem from "../../components/product/ProductItem";
import {
  getOrderDetailById,
  selectOrder,
  updateStatus,
} from "../../feature/order/sliceOrder"; // Adjust import paths as needed
import BlockUI from "../../components/Loader/BlockUI";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  width: "300px",
  height: "50px",
  border: "2px solid rgba(0, 0, 0, 0.2)",
  boxShadow: 24,
  borderRadius: 5,
};

const OrderDetail = () => {
  const dispatch = useDispatch();
  const order = useSelector(selectOrder);
  const loading = useSelector((state) => state.order.loading);
  const { id } = useParams();
  const headerCategory = useRef();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleWindowOnscroll = () => {
    if (headerCategory.current) {
      const scrollY = window.scrollY;
      headerCategory.current.style.top = scrollY > 91 ? "-91px" : "0";
    }
  };

  const handleOnclickButton = (status) => {
    dispatch(updateStatus({ id, status }))
      .then(() => handleOpen())
      .catch((error) => console.error("Failed to update status:", error));
  };

  useEffect(() => {
    dispatch(getOrderDetailById(id));
  }, [dispatch, id]);

  useEffect(() => {
    window.addEventListener("scroll", handleWindowOnscroll);
    return () => window.removeEventListener("scroll", handleWindowOnscroll);
  }, []);

  if (loading) {
    return <BlockUI blocking={loading}/>;
  }

  if (!order.orderDetail) {
    return <p>No order details found.</p>;
  }

  return (
    <div className="orderdetail__wrapper">
      <div ref={headerCategory} className="orderdetail__updateStatus">
        <h1 className="orderdetail__updateStatus-title">
          Cập nhật trạng thái cho hóa đơn
        </h1>
        <div className="orderdetail__updateStatus-action">
          <button
            onClick={() => handleOnclickButton("Pending")}
            className="btn__orderdetail btn__pending"
          >
            Pending
          </button>
          <button
            onClick={() => handleOnclickButton("Success")}
            className="btn__orderdetail btn__success"
          >
            Success
          </button>
          <button
            onClick={() => handleOnclickButton("Reject")}
            className="btn__orderdetail btn__reject"
          >
            Reject
          </button>
        </div>
      </div>
      <div className="orderdetail__des">
        <OrderItem data={order.orderDetail} />
      </div>
      <div className="orderdetail__cart">
        <h1 className="orderdetail__cart-title">
          Danh sách sản phẩm trong giỏ hàng:
        </h1>
        {order.orderDetail.cartItems &&
        order.orderDetail.cartItems.length > 0 ? (
          order.orderDetail.cartItems.map((item, index) => (
            <ProductItem data={item} key={index} />
          ))
        ) : (
          <p>No items in cart</p>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>{order.dataUpdate?.status || "Pending"}</Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default OrderDetail;
