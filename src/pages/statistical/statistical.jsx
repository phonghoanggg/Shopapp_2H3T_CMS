import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  revenueStatistics,
  selectStatistical,
  soldProductsByMonthAndYear,
  soldProductsStatistics,
  soldProductsStatisticsById,
} from "../../feature/statistical/sliceStatistical";

function Statistical() {
  const dispatch = useDispatch();
  const statistical = useSelector(selectStatistical);
  console.log("statistical", statistical);

  useEffect(() => {
    dispatch(revenueStatistics());
    dispatch(soldProductsStatistics());
    dispatch(soldProductsStatisticsById());
    dispatch(soldProductsByMonthAndYear());
  }, [dispatch]);

  return (
    <div className="statis__wrapper">
      <div className="statis__overview">
        <div className="statis__product">
          <span className="statis__title">Tổng số lượng sản phẩm đã bán</span>
          <span className="statis__content">
            {statistical?.soldProductsStatistic?.totalSoldProducts || 0}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Statistical;
