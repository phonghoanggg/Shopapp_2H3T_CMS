import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../../feature/user/userSlice";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) =>
    state.user.users.find((usr) => usr._id === id)
  );

  const [userInfor, setUserInfor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setUserInfor({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, role } = userInfor;

    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      role.trim() === ""
    ) {
      return;
    }

    const updatedUser = {
      _id: id,
      firstName,
      lastName,
      email,
      role,
    };

    dispatch(updateUser(updatedUser)).then(() => {
      alert("User updated successfully!");
    });
  };

  if (!user) {
    return <div>User not found!</div>;
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="mb-4 text-2xl font-semibold">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            User Name
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            value={userInfor.firstName}
            onChange={(e) =>
              setUserInfor({ ...userInfor, firstName: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            Last Name
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            value={userInfor.lastName}
            onChange={(e) =>
              setUserInfor({ ...userInfor, lastName: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            Email
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            value={userInfor.email}
            onChange={(e) =>
              setUserInfor({ ...userInfor, email: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Role</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            value={userInfor.role}
            onChange={(e) =>
              setUserInfor({ ...userInfor, role: e.target.value })
            }
          />
        </div>

        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          type="submit"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
