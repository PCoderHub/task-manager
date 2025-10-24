import React from "react";
import { logoutUser } from "../api/userServices";
import { useNavigate } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <header className="bg-teal-100 text-center p-4 flex justify-between">
      <h1 className="text-3xl font-bold">Task Manager</h1>
      {user && (
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-600"
        >
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;
