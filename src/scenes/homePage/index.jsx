import { useGetUsersQuery, useDeleteUserMutation } from "../../store";
import UpdateForm from "../../components/UpdateUser";
import RegisterForm from "../../components/Register";
import { useNavigate } from "react-router-dom";

export default function UsersList() {
  const { data, error, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

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
        <div
          onClick={() => navigate(`/profile/${user._id}`)}
        >{`${user.firstName} ${user.lastName}`}</div>
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
