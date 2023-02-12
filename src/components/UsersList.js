import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../store";
import RegisterForm from "./Register";

export default function UsersList() {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleDelete() {
    dispatch(deleteUser());
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
      <button onClick={handleDelete}>delete user</button>
    </div>
  ));
  return (
    <div>
      <RegisterForm />
      {renderedUsers}
    </div>
  );
}
