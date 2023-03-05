import { useGetUsersQuery } from "../../store";
import UpdateForm from "../../components/UpdateUser";
import RegisterForm from "../../components/Register";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

export default function UsersList() {
  const { data, error, isLoading } = useGetUsersQuery();

  const navigate = useNavigate();

  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((user) => (
      <div key={user._id}>
        <Box width="100%" onClick={() => navigate(`/profile/${user._id}`)}>
          <Typography variant="myVariant">{`${user.firstName} ${user.lastName}`}</Typography>
        </Box>

        <UpdateForm userId={user._id} />
      </div>
    ));
  }

  return (
    <div>
      <Box sx={{ mt: "20px", ml: "30px" }} className="mb-5">
        <RegisterForm />
      </Box>
      <Box sx={{ padding: 4 }}>{content}</Box>
    </div>
  );
}
