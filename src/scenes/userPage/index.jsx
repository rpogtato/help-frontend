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
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>Error loading data...</div>;
  } else {
    content = albumData.map((album) => {
      return (
        <div key={album._id}>
          <div onClick={() => navigate(`/${userId}/albums/${album.title}`)}>
            {album.title}
          </div>
          <DeleteAlbum albumId={album._id} />
        </div>
      );
    });
  }

  return (
    <div>
      {data && data.firstName ? (
        <>
          <div>{data.firstName}'s profile page</div>
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate("/users")}
          >
            return
          </Button>
          <Button
            sx={{ ml: 1 }}
            variant="outlined"
            color="error"
            size="small"
            endIcon={<DeleteIcon />}
            onClick={() => handleDelete(data._id)}
          >
            delete
          </Button>
          <hr></hr>
          <AlbumForm userId={data._id} />
        </>
      ) : (
        <div>Loading data...</div>
      )}
      <div>{content}</div>
    </div>
  );
}
