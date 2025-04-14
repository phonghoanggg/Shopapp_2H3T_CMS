import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../feature/category/sliceCategory";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (name.trim() === "" || image.trim() === "") {
      setError("Both fields are required");
      return;
    }

    try {
      await dispatch(addCategory({ name, image })).unwrap(); // Use unwrap to handle potential rejections
      setName("");
      setImage("");
      setError(""); // Clear errors on success
      alert("Category added successfully!");
    } catch (error) {
      setError("Failed to add category. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="mb-4 text-2xl font-semibold">Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Name</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            placeholder="Category Name"
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
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        {error && <p className="mb-4 text-red-500">{error}</p>}

        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          type="submit"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
