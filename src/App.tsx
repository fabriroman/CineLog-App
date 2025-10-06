import { Route, Routes } from "react-router-dom";
import { HomePage } from "./features/movies/pages/HomePage";
import LoginPage from "./features/auth/pages/LoginPage";
import { RequireGuest } from "./features/auth/guards/RequireGuest";
import { ProfilePage } from "./components/ProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/login"
          element={
            <RequireGuest>
              <LoginPage />
            </RequireGuest>
          }
        />
      </Routes>
    </>
  );
}

export default App;
