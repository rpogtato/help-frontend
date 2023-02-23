import { useParams } from "react-router-dom";
import { useGetUserQuery, useGetAlbumQuery } from "../../store";
import { useNavigate } from "react-router-dom";

export function UserPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { data } = useGetUserQuery(userId);
  const { data: albumData, isLoading, error } = useGetAlbumQuery(userId);
  console.log(albumData);

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

  return (
    <div>
      {data && data.firstName ? (
        <div>{data.firstName}'s profile page</div>
      ) : (
        <div>Loading data...</div>
      )}
      <div>{content}</div>
      <button onClick={() => navigate("/users")}>return</button>
    </div>
  );
}
