import UsersList from "./scenes/homePage";
import { UserPage } from "./scenes/userPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AlbumPage } from "./scenes/albumPage";
import { CssBaseline } from "@mui/material";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/users" element={<UsersList />} />
          <Route path="/profile/:userId" element={<UserPage />} />
          <Route path="/:userId/albums/:albumTitle" element={<AlbumPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
