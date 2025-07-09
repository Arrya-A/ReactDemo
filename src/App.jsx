import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/home"} element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
