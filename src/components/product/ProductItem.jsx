const ProductItem = ({ data }) => {
  console.log("data", data);

  return (
    <div className="productItem__wrapper">
      <div className="productItem__des">
        <h1 className="productItem__des-name">{data.name}</h1>
        <h1 className="productItem__des-quantity">
          Số lượng: x{data.quantity}
        </h1>
        <h1 className="productItem__des-size">Size: {data.size}</h1>
      </div>
    </div>
  );
};

export default ProductItem;
