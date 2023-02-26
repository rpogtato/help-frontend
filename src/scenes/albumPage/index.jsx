import { useGetAlbumQuery } from "../../store";
import { useParams } from "react-router-dom";

export function AlbumPage() {
  const { userId } = useParams();
  const { data, error, isLoading } = useGetAlbumQuery(userId);
}
