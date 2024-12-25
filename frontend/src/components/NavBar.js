import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../components/UserContext";

function Navbar() {
  const { currUser, setCurrUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrUser(null);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <a href="/">NextSet</a>
        </div>
        <div>
          {currUser ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 text-white bg-indigo-800 hover:bg-indigo-900 rounded-md transition duration-300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="px-6 py-2 text-white bg-indigo-800 hover:bg-indigo-900 rounded-md transition duration-300"
            >
              Login
            </button>
          )}
          {!currUser && (
            <Link to="/register">
              <button className="ml-4 px-6 py-2 text-white bg-indigo-800 hover:bg-indigo-900 rounded-md transition duration-300">
                Signup
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
