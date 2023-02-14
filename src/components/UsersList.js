import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../store";
import UpdateForm from "./UpdateUser";
import RegisterForm from "./Register";

export default function UsersList() {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleDelete(id) {
    dispatch(deleteUser(id));
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching data...</div>;
  }

  const renderedUsers = data.map((user) => (
    <div key={user._id}>
      <div>{`${user.firstName} ${user.lastName}`}</div>
      <button onClick={() => handleDelete(user._id)}>delete user</button>
      <UpdateForm userId={user._id} />
    </div>
  ));
  return (
    <div>
      <div className="mb-5">
        <RegisterForm />
      </div>
      {renderedUsers}
    </div>
  );
}
