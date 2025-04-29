import { useLocation } from "react-router-dom";
import CategoryHeader from "../../components/categoryHeader/CategoryHeader";
import OrderItem from "../../components/orderItem/OrderItem";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder } from "../../feature/order/sliceOrder";
import { getOrderByStatus } from "../../feature/order/sliceOrder";
import { useEffect } from "react";
import BlockUI from "../../components/Loader/BlockUI";

const LIST_CATEGORY = [
    {
        type: 'All',
    },
    {
        type: 'Pending',
    },
    {
        type: 'Success',
    },
    {
        type: 'Reject',
    },
];

const Order = () => {
    const dispatch = useDispatch();
    const order = useSelector(selectOrder);
    const loading = useSelector((state) => state.order.loading);
    const query = new URLSearchParams(useLocation().search);
    const status = query.get('status') || 'All';
    
    useEffect(() => {
        dispatch(getOrderByStatus(status));
    }, [dispatch, status]);

    if (loading) {
        return <BlockUI blocking={loading}/>;
    }

    return (
        <div className="order__wrapper">
            <CategoryHeader list={LIST_CATEGORY} categoryType={status} pathName={"/order"} />
            <div className="order__content">
                <h1 className="order__content-title">Danh sách hóa đơn:</h1>
                {order.listOrders.data?.map((item, index) => (
                    <OrderItem key={index} data={item} />  
                ))}
            </div>
        </div>
    )
}

export default Order;