import { useGetAlbumQuery } from "../../store";

export function AlbumPage({ user }) {
  const { data, error, isLoading } = useGetAlbumQuery(user);
}
