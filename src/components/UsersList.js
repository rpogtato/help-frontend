import { useGetUsersQuery } from "../store";
import UpdateForm from "./UpdateUser";
import RegisterForm from "./Register";

export default function UsersList() {
  const { data, error, isLoading } = useGetUsersQuery();

  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((user) => (
      <div key={user._id}>
        <div>{`${user.firstName} ${user.lastName}`}</div>
        {/* delete button */}
        <UpdateForm userId={user._id} />
      </div>
    ));
  }
  console.log(data);

  return (
    <div>
      <div className="mb-5">
        <RegisterForm />
      </div>
      {content}
    </div>
  );
}
