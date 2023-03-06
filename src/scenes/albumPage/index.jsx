import { useGetAlbumQuery } from "../../store";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

export function AlbumPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { data, error, isLoading } = useGetAlbumQuery(userId);

  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>Error loading data...</div>;
  } else {
    content = data.map((album) => {
      return (
        <div key={album._id}>
          <Typography>{album.title}</Typography>
        </div>
      );
    });
  }
  return (
    <>
      <div>
        <button onClick={() => navigate(`/profile/${userId}`)}>return</button>
      </div>
      <hr />
      <div>{content}</div>
    </>
  );
}
