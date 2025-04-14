import { LocalShipping } from "@mui/icons-material";
import { Link } from "react-router-dom";

const OrderItem = ({data}) => {

    const className = "orderItem__status orderItem__status--" + data.status;

    return (
        <Link to={`/order/${data._id}`} className="orderItem">
            <div className={className}>
                <LocalShipping className="orderItem__status-icon"/>
                <span className="orderItem__status-des">{data.status}</span>
            </div>
            <div className="orderItem__des">
                <span className="orderitem__title">Tên người đặt: <b>{data.name}</b></span>
                <span className="orderitem__title">Địa chỉ: <b>{data.address}</b></span>
                <span className="orderitem__title">Số điện thoại: <b>0{data.phone}</b></span>
                <span className="orderitem__title">Ngày đặt hàng: <b>{data.createdAt}</b></span>
            </div>
            <div className="orderItem__prive">
                <span className="orderItem__price-des">{data.total}$</span>
            </div>
        </Link>
    )
}

export default OrderItem;