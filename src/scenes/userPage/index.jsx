import { useParams } from "react-router-dom";
import {
  useGetUserQuery,
  useGetAlbumQuery,
  useDeleteUserMutation,
} from "../../store";
import { useNavigate } from "react-router-dom";

export function UserPage() {
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();
  const { userId } = useParams();
  const { data } = useGetUserQuery(userId);
  const { data: albumData, isLoading, error } = useGetAlbumQuery(userId);

  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>Error loading data...</div>;
  } else {
    content = albumData.map((album) => {
      return <div key={album._id}>{album.title}</div>;
    });
  }

  function handleDelete(userId) {
    deleteUser(userId);
    navigate("/users");
  }

  return (
    <div>
      {data && data.firstName ? (
        <>
          <div>{data.firstName}'s profile page</div>
          <button onClick={() => navigate("/users")}>return</button>
          <button onClick={() => handleDelete(data._id)}>delete user</button>
        </>
      ) : (
        <div>Loading data...</div>
      )}
      <hr></hr>

      <div>{content}</div>
    </div>
  );
}
