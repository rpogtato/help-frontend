import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";

export default function UsersList() {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleAddUser() {
    dispatch(addUser({ firstName: "hi", lastName: "bye" }));
    console.log(addUser);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching data...</div>;
  }
  console.log(data);
  const renderedUsers = data.map((user) => (
    <div key={user._id}>
      <div>{`${user.firstName} ${user.lastName}`}</div>
    </div>
  ));
  return (
    <div>
      <div>
        <button onClick={handleAddUser}>+ Add User</button>
      </div>
      {renderedUsers}
    </div>
  );
}
