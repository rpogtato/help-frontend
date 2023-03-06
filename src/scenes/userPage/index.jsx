import { useParams } from "react-router-dom";
import {
  useGetUserQuery,
  useGetAlbumQuery,
  useDeleteUserMutation,
} from "../../store";
import { useNavigate } from "react-router-dom";
import AlbumForm from "../../components/CreateAlbum";
import { DeleteAlbum } from "../../components/DeleteAlbum";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";

export function UserPage() {
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();
  const { userId } = useParams();
  const { data } = useGetUserQuery(userId);
  const { data: albumData, isLoading, error } = useGetAlbumQuery(userId);

  function handleDelete(userId) {
    deleteUser(userId);
    navigate("/users");
  }

  let content;
  if (isLoading) {
    content = <Typography>Loading...</Typography>;
  } else if (error) {
    content = <Typography>Error loading data...</Typography>;
  } else {
    content = albumData.map((album) => {
      return (
        <div key={album._id}>
          <Typography
            onClick={() => navigate(`/${userId}/albums/${album.title}`)}
          >
            {album.title}
          </Typography>
          <DeleteAlbum albumId={album._id} />
        </div>
      );
    });
  }

  return (
    <div>
      {data && data.firstName ? (
        <>
          <Typography>{data.firstName}'s profile page</Typography>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => navigate("/users")}
          >
            <Typography variant="myVariant">return</Typography>
          </Button>
          <Button
            sx={{ ml: 1 }}
            variant="outlined"
            color="secondary"
            size="small"
            endIcon={<DeleteIcon />}
            onClick={() => handleDelete(data._id)}
          >
            <Typography variant="myVariant">delete</Typography>
          </Button>
          <hr></hr>
          <AlbumForm userId={data._id} />
        </>
      ) : (
        <Typography>Loading data...</Typography>
      )}
      <div>{content}</div>
    </div>
  );
}
