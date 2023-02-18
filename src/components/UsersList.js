import { useGetUsersQuery, useDeleteUserMutation } from "../store";
import UpdateForm from "./UpdateUser";
import RegisterForm from "./Register";

export default function UsersList() {
  const { data, error, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  function handleDelete(userId) {
    deleteUser(userId);
  }

  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((user) => (
      <div key={user._id}>
        <div>{`${user.firstName} ${user.lastName}`}</div>
        <button onClick={() => handleDelete(user._id)}>delete user</button>
        <UpdateForm userId={user._id} />
      </div>
    ));
  }

  return (
    <div>
      <div className="mb-5">
        <RegisterForm />
      </div>
      {content}
    </div>
  );
}
