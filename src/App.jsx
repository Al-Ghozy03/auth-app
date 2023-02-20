import { Navigate, Route, Routes } from "react-router-dom";
import ProtectRoute from "./component/protect_route";
import Edit from "./page/edit";
import Login from "./page/login";
import Profile from "./page/profile";
import Register from "./page/register";

export default function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={<ProtectRoute children={<Profile />} />}
      />
      <Route path="/edit/:id" element={<ProtectRoute children={<Edit />} />} />
      <Route path="/" element={<Navigate replace to={"/profile"} />} />
    </Routes>
  );
}
