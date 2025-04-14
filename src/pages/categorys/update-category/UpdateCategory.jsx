import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateCategory } from "../../../feature/category/sliceCategory";

const UpdateCategory = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const category = useSelector((state) =>
    state.category.categories.find((cat) => cat._id === id)
  );
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
      setImage(category.image);
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || image.trim() === "") {
      alert("Both fields are required");
      return;
    }
    dispatch(updateCategory({ _id: id, name, image })).then(() => {
      alert("Category updated successfully!");
    });
  };

  console.log(image);

  if (!category) {
    return <div>Category not found.</div>;
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="mb-4 text-2xl font-semibold">Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Name</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            Image
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          type="submit"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default UpdateCategory;
