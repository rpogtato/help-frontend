import { useParams } from "react-router-dom";
import { useGetUserQuery, useGetAlbumQuery } from "../../store";
import { useNavigate } from "react-router-dom";

export function UserPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { data } = useGetUserQuery(userId);
  const { data: albumData } = useGetAlbumQuery(userId);
  console.log(albumData);

  return (
    <div>
      {data && data.firstName ? (
        <div>{data.firstName}'s profile page</div>
      ) : (
        <div>Loading data...</div>
      )}
      {albumData && albumData.title ? (
        <div>{albumData.title} </div>
      ) : (
        <div>Loading data... </div>
      )}
      <button onClick={() => navigate("/users")}>return</button>
    </div>
  );
}
