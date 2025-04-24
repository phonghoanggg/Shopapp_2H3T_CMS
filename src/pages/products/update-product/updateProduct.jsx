import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateproduct } from "../../../feature/product/productSlice";
import {
  fetchCategories,
  selectCategories,
} from "../../../feature/category/sliceCategory";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) =>
    state.product.products.products.find((prod) => prod._id === id)
  );
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [product]);
  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    stock: 0,
    images: "",
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
        images: product.images,
        price: product.price,
        newprice: product.newprice,
        category: product.category,
      });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, stock, images, price, newprice, category } =
      productInfo;

    if (
      name.trim() === "" ||
      description.trim() === "" ||
      stock <= 0 ||
      price <= 0
    ) {
      return;
    }

    const updatedProduct = {
      _id: id,
      name,
      description,
      stock,
      images,
      price,
      newprice,
      category,
    };

    console.log(updatedProduct);

    dispatch(updateproduct(updatedProduct)).then(() => {
      alert("Product updated successfully!");
    });
  };

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
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
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            value={productInfo.images}
            onChange={(e) =>
              setProductInfo({ ...productInfo, images: e.target.value })
            }
          />
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
            New Price
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="number"
            value={productInfo.newprice}
            onChange={(e) =>
              setProductInfo({ ...productInfo, newprice: e.target.value })
            }
          />
        </div>

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

        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          type="submit"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
