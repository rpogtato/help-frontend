import { useDeleteAlbumMutation } from "../store";

export function DeleteAlbum({ albumId }) {
  const [deleteAlbum] = useDeleteAlbumMutation();

  function handleDelete() {
    deleteAlbum(albumId);
  }

  return (
    <div>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
}
